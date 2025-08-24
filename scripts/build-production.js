import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building for production...');

try {
  // Step 1: Build frontend
  console.log('📦 Building frontend...');
  execSync('vite build', { stdio: 'inherit' });

  // Step 2: Build backend with production version
  console.log('⚙️ Building backend...');
  execSync('esbuild server/index.prod.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js', { stdio: 'inherit' });

  // Step 3: Copy static assets
  console.log('📂 Copying assets...');
  const sourceDir = path.resolve(process.cwd(), 'attached_assets');
  const targetDir = path.resolve(process.cwd(), 'dist/public/attached_assets');

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

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
      }
    });
  }

  if (fs.existsSync(sourceDir)) {
    copyFiles(sourceDir, targetDir);
  }

  console.log('✅ Production build completed successfully!');
  console.log('📁 Build files are in: dist/');
  console.log('🌐 Frontend: dist/public/');
  console.log('🚀 Backend: dist/index.js');
  console.log('📷 Assets: dist/public/attached_assets/');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}