import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeReactImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Case 1: import React from 'react';
  if (content.includes("import React from 'react'") || content.includes('import React from "react"')) {
    content = content.replace(/^import React from ['"]react['"];?\n?/gm, '');
    modified = true;
  }
  
  // Case 2: import React, { Something } from 'react';
  if (content.match(/import React,\s*{([^}]*)} from ['"]react['"];?/)) {
    content = content.replace(/import React,\s*{([^}]*)} from ['"]react['"];?/g, 'import { $1 } from "react";');
    modified = true;
  }
  
  // Case 3: import { Something, React } from 'react';
  if (content.match(/import\s*{[^}]*React[^}]*} from ['"]react['"];?/)) {
    content = content.replace(/import\s*{([^}]*),\s*React\s*([^}]*)} from ['"]react['"];?/g, 'import { $1$2 } from "react";');
    modified = true;
  }

  // Case 4: import { React } from 'react';
  if (content.match(/import\s*{\s*React\s*} from ['"]react['"];?/)) {
    content = content.replace(/import\s*{\s*React\s*} from ['"]react['"];?\n?/g, '');
    modified = true;
  }

  // Case 5: import React, { Component } from 'react';
  if (content.match(/import React,\s*{\s*Component\s*} from ['"]react['"];?/)) {
    content = content.replace(/import React,\s*{\s*Component\s*} from ['"]react['"];?/g, 'import { Component } from "react";');
    modified = true;
  }
  
  // Remove empty lines that might be left after removing imports
  content = content.replace(/^\s*[\r\n]/gm, '');
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Removed React import from ${filePath}`);
    return true;
  }
  return false;
}

function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  let modifiedFiles = 0;
  
  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      modifiedFiles += processDirectory(fullPath);
    } else if (stat.isFile() && /\.(jsx?|tsx?)$/.test(item)) {
      if (removeReactImports(fullPath)) {
        modifiedFiles++;
      }
    }
  }
  
  return modifiedFiles;
}

// Start processing from src directory
const srcDir = path.join(__dirname, '..', 'src');
const totalModified = processDirectory(srcDir);
console.log(`✨ Finished removing duplicate React imports from ${totalModified} files`);
