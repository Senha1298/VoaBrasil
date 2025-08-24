import fs from 'fs';
import path from 'path';

const sourceDir = path.resolve(process.cwd(), 'attached_assets');
const targetDir = path.resolve(process.cwd(), 'dist/public/attached_assets');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from attached_assets to dist/public/attached_assets
function copyFiles(src, dest) {
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyFiles(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
}

if (fs.existsSync(sourceDir)) {
  copyFiles(sourceDir, targetDir);
  console.log('✅ Assets copied successfully!');
} else {
  console.log('⚠️ No attached_assets directory found');
}