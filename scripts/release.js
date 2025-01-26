import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

function execute(command) {
    try {
        execSync(command, { stdio: 'inherit', cwd: ROOT_DIR });
        return true;
    } catch (error) {
        console.error(`Failed to execute command: ${command}`);
        console.error(error);
        return false;
    }
}

function updateChangelog(currentVersion, newVersion) {
    try {
        const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');
        const date = new Date().toISOString().split('T')[0];
        
        // Read existing changelog
        const changelog = fs.readFileSync(changelogPath, 'utf8');
        
        // Create new entry following Keep a Changelog format
        const newEntry = `\n## [${newVersion}] - ${date}

### Added
- [Add your new features here]

### Changed
- Version bump from ${currentVersion} to ${newVersion}
- [Add your changes here]

### Fixed
- [Add your fixes here]

`;
        
        // Find the position after the header section
        const lines = changelog.split('\n');
        const versionHeaderIndex = lines.findIndex(line => line.match(/^## \[\d+\.\d+\.\d+\]/));
        
        if (versionHeaderIndex === -1) {
            console.error('Could not find version header in CHANGELOG.md');
            return false;
        }
        
        // Insert new entry after the header section
        lines.splice(versionHeaderIndex, 0, newEntry);
        
        // Write updated changelog
        fs.writeFileSync(changelogPath, lines.join('\n'));
        
        return true;
    } catch (error) {
        console.error('Failed to update CHANGELOG.md:', error);
        return false;
    }
}

function updateVersion(type) {
    if (!['major', 'minor', 'patch'].includes(type)) {
        console.error('Invalid version type. Use: major, minor, or patch');
        return false;
    }
    
    try {
        // Read current version
        const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
        const currentVersion = packageJson.version;
        
        // Parse version numbers
        const [major, minor, patch] = currentVersion.split('.').map(Number);
        let newVersion;
        
        // Calculate new version
        switch(type) {
            case 'major':
                newVersion = `${major + 1}.0.0`;
                break;
            case 'minor':
                newVersion = `${major}.${minor + 1}.0`;
                break;
            case 'patch':
                newVersion = `${major}.${minor}.${patch + 1}`;
                break;
        }
        
        // Update package.json
        packageJson.version = newVersion;
        fs.writeFileSync(
            path.join(ROOT_DIR, 'package.json'),
            JSON.stringify(packageJson, null, 2) + '\n'
        );
        
        // Update CHANGELOG.md
        if (!updateChangelog(currentVersion, newVersion)) {
            throw new Error('Failed to update changelog');
        }
        
        return true;
    } catch (error) {
        console.error('Failed to update version:', error);
        return false;
    }
}

function build() {
    try {
        // Clean build directory
        if (!execute('bun run clean')) throw new Error('Failed to clean build directory');
        
        // Install dependencies
        if (!execute('bun install')) throw new Error('Failed to install dependencies');
        
        // Run tests if they exist
        if (fs.existsSync(path.join(ROOT_DIR, 'test'))) {
            if (!execute('bun test')) throw new Error('Failed to run tests');
        }
        
        // Build the project
        if (!execute('bun run build')) throw new Error('Failed to build project');
        
        return true;
    } catch (error) {
        console.error('Build failed:', error);
        return false;
    }
}

function deploy() {
    try {
        // Deploy to Vercel
        if (!execute('vercel --prod')) throw new Error('Failed to deploy to Vercel');
        
        return true;
    } catch (error) {
        console.error('Deployment failed:', error);
        return false;
    }
}

async function release(versionType) {
    console.log('🚀 Starting release process...');
    
    // Create a backup of package.json
    const packageJsonPath = path.join(ROOT_DIR, 'package.json');
    const packageJsonBackup = fs.readFileSync(packageJsonPath);
    
    try {
        // Update version
        if (!updateVersion(versionType)) {
            throw new Error('Version update failed');
        }
        console.log('✓ Version updated successfully');
        
        // Build the project
        if (!build()) {
            throw new Error('Build failed');
        }
        console.log('✓ Build completed successfully');
        
        // Deploy
        if (!deploy()) {
            throw new Error('Deployment failed');
        }
        console.log('✓ Deployment completed successfully');
        
        // Create git tag and push
        const version = JSON.parse(fs.readFileSync(packageJsonPath)).version;
        if (!execute(`git add . && git commit -m "Release v${version}" && git tag v${version} && git push && git push --tags`)) {
            throw new Error('Git operations failed');
        }
        console.log('✓ Git operations completed successfully');
        
        console.log(`\n✨ Release v${version} completed successfully!`);
        return true;
    } catch (error) {
        console.error('\n❌ Release process failed:', error.message);
        
        // Rollback package.json
        fs.writeFileSync(packageJsonPath, packageJsonBackup);
        console.log('Rolled back package.json to previous state');
        
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
