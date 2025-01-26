import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Backup paths
const BACKUP_DIR = path.join(ROOT_DIR, '.release-backup');
const PACKAGE_BACKUP = path.join(BACKUP_DIR, 'package.json');
const CHANGELOG_BACKUP = path.join(BACKUP_DIR, 'CHANGELOG.md');
const GIT_HEAD_BACKUP = path.join(BACKUP_DIR, 'git-head');

function execute(command, args = []) {
    try {
        const result = spawnSync(command, args, {
            stdio: 'inherit',
            cwd: ROOT_DIR,
            shell: true
        });

        if (result.error) {
            throw result.error;
        }

        if (result.status !== 0) {
            throw new Error(`Command failed with exit code ${result.status}`);
        }

        return true;
    } catch (error) {
        throw new Error(`Command failed: ${command} ${args.join(' ')}\n${error.message}`);
    }
}

function executeWithOutput(command, args = []) {
    try {
        const result = spawnSync(command, args, {
            stdio: 'pipe',
            cwd: ROOT_DIR,
            shell: true,
            encoding: 'utf-8'
        });

        if (result.error) {
            throw result.error;
        }

        if (result.status !== 0) {
            throw new Error(`Command failed with exit code ${result.status}`);
        }

        return result.stdout.trim();
    } catch (error) {
        throw new Error(`Command failed: ${command} ${args.join(' ')}\n${error.message}`);
    }
}

class ReleaseTransaction {
    constructor() {
        this.steps = [];
        this.currentStep = -1;
    }

    addStep(name, execute, rollback) {
        this.steps.push({ name, execute, rollback });
    }

    async executeStep(step, index) {
        console.log(`🔄 Executing step ${index + 1}/${this.steps.length}: ${step.name}`);
        try {
            await step.execute();
            this.currentStep = index;
            console.log(`✓ ${step.name} completed successfully`);
            return true;
        } catch (error) {
            console.error(`❌ ${step.name} failed:`, error.message);
            return false;
        }
    }

    async rollback() {
        console.log('\n🔄 Rolling back changes...');
        for (let i = this.currentStep; i >= 0; i--) {
            const step = this.steps[i];
            try {
                await step.rollback();
                console.log(`✓ Rolled back: ${step.name}`);
            } catch (error) {
                console.error(`❌ Failed to rollback ${step.name}:`, error.message);
            }
        }
    }

    async execute() {
        // Create backup directory
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }

        // Execute all steps
        for (let i = 0; i < this.steps.length; i++) {
            if (!await this.executeStep(this.steps[i], i)) {
                await this.rollback();
                return false;
            }
        }

        // Clean up backup directory
        fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
        return true;
    }
}

function backupFile(filePath, backupPath) {
    if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, backupPath);
    }
}

function restoreFile(backupPath, filePath) {
    if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
    }
}

async function release(versionType) {
    if (!['major', 'minor', 'patch'].includes(versionType)) {
        console.error('Invalid version type. Use: major, minor, or patch');
        return false;
    }

    const transaction = new ReleaseTransaction();
    const packageJsonPath = path.join(ROOT_DIR, 'package.json');
    const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');

    // Step 1: Backup current state
    transaction.addStep(
        'Backup current state',
        async () => {
            backupFile(packageJsonPath, PACKAGE_BACKUP);
            backupFile(changelogPath, CHANGELOG_BACKUP);
            const gitHead = executeWithOutput('git', ['rev-parse', 'HEAD']);
            fs.writeFileSync(GIT_HEAD_BACKUP, gitHead);
        },
        async () => {
            // No rollback needed for backup
        }
    );

    // Step 2: Update version
    transaction.addStep(
        'Update version',
        async () => {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            const currentVersion = packageJson.version;
            const [major, minor, patch] = currentVersion.split('.').map(Number);
            
            let newVersion;
            switch(versionType) {
                case 'major': newVersion = `${major + 1}.0.0`; break;
                case 'minor': newVersion = `${major}.${minor + 1}.0`; break;
                case 'patch': newVersion = `${major}.${minor}.${patch + 1}`; break;
            }
            
            packageJson.version = newVersion;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
            
            // Update CHANGELOG.md
            const date = new Date().toISOString().split('T')[0];
            const newEntry = `\n## [${newVersion}] - ${date}\n\n### Added\n- [Add your new features here]\n\n### Changed\n- Version bump from ${currentVersion} to ${newVersion}\n- [Add your changes here]\n\n### Fixed\n- [Add your fixes here]\n\n`;
            
            const changelog = fs.readFileSync(changelogPath, 'utf8');
            const lines = changelog.split('\n');
            const versionHeaderIndex = lines.findIndex(line => line.match(/^## \[\d+\.\d+\.\d+\]/));
            lines.splice(versionHeaderIndex, 0, newEntry);
            fs.writeFileSync(changelogPath, lines.join('\n'));
        },
        async () => {
            restoreFile(PACKAGE_BACKUP, packageJsonPath);
            restoreFile(CHANGELOG_BACKUP, changelogPath);
        }
    );

    // Step 3: Build and test
    transaction.addStep(
        'Build and test',
        async () => {
            // Clean build directory
            const distPath = path.join(ROOT_DIR, 'dist');
            if (fs.existsSync(distPath)) {
                fs.rmSync(distPath, { recursive: true, force: true });
            }
            
            execute('bun', ['install']);
            if (fs.existsSync(path.join(ROOT_DIR, 'test'))) {
                execute('bun', ['test']);
            }
            execute('C:\\Users\\amrmu\\.bun\\bin\\vite.exe', ['build']);
        },
        async () => {
            const distPath = path.join(ROOT_DIR, 'dist');
            if (fs.existsSync(distPath)) {
                fs.rmSync(distPath, { recursive: true, force: true });
            }
            execute('git', ['clean', '-fd', 'dist']);
        }
    );

    // // Step 4: Git operations
    // transaction.addStep(
    //     'Git operations',
    //     async () => {
    //         const version = JSON.parse(fs.readFileSync(packageJsonPath)).version;
            
    //         // Remove .release-backup from git if it was accidentally staged
    //         try {
    //             execute('git', ['reset', '--', BACKUP_DIR]);
    //             if (fs.existsSync(BACKUP_DIR)) {
    //                 execute('git', ['clean', '-fd', BACKUP_DIR]);
    //             }
    //         } catch (e) {
    //             // Ignore if backup dir doesn't exist
    //         }
            
    //         // Force add the files we want to commit
    //         execute('git', ['add', '-f', 'package.json', 'CHANGELOG.md']);
            
    //         // Check if there are any changes to commit
    //         const status = executeWithOutput('git', ['status', '--porcelain']);
    //         if (!status) {
    //             console.log('No changes to commit');
    //             return;
    //         }
            
    //         // Commit changes and create tag
    //         execute('git', ['commit', '-m', `Release v${version}`]);
    //         execute('git', ['tag', '-a', `v${version}`, '-m', `Release v${version}`]);
    //     },
    //     async () => {
    //         const version = JSON.parse(fs.readFileSync(packageJsonPath)).version;
    //         try {
    //             execute('git', ['tag', '-d', `v${version}`]);
    //         } catch (e) {
    //             // Ignore if tag doesn't exist
    //         }
    //         const originalHead = fs.readFileSync(GIT_HEAD_BACKUP, 'utf8').trim();
    //         execute('git', ['reset', '--hard', originalHead]);
    //         // Clean up any untracked files
    //         execute('git', ['clean', '-fd']);
    //     }
    // );

    // Step 5: Deploy
    transaction.addStep(
        'Deploy to production',
        async () => {
            execute('vercel', ['--prod']);
        },
        async () => {
            // Vercel keeps deployment history, no rollback needed
            console.log('Note: Previous Vercel deployment is still available');
        }
    );

    // Step 6: Push to remote
    transaction.addStep(
        'Push to remote',
        async () => {
            execute('git', ['push']);
            execute('git', ['push', '--tags']);
        },
        async () => {
            const version = JSON.parse(fs.readFileSync(PACKAGE_BACKUP)).version;
            try {
                execute('git', ['push', 'origin', `:refs/tags/v${version}`]);
            } catch (e) {
                // Ignore if remote tag doesn't exist
            }
            execute('git', ['push', '-f']);
        }
    );

    console.log('🚀 Starting release process...');
    const success = await transaction.execute();
    
    if (success) {
        console.log('\n✨ Release completed successfully!');
        return true;
    } else {
        console.log('\n❌ Release failed and was rolled back');
        return false;
    }
}

// Get version type from command line argument
const versionType = process.argv[2];
if (!versionType) {
    console.error('Please specify version type: major, minor, or patch');
    process.exit(1);
}

release(versionType).then(success => {
    process.exit(success ? 0 : 1);
});
