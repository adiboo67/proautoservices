const fs = require('fs-extra');
const path = require('path');

async function prepareDist() {
  const rootDir = path.resolve(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');

  // Nettoyer le dossier dist s'il existe
  await fs.remove(distDir);
  
  // Créer le dossier dist
  await fs.mkdir(distDir);

  // Copier les fichiers et dossiers nécessaires
  const filesToCopy = [
    '.next',
    'public',
    'package.json',
    'package-lock.json',
    '.env.local',
    'ecosystem.config.js',
    'next.config.js'
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(distDir, file);
    
    if (fs.existsSync(srcPath)) {
      await fs.copy(srcPath, destPath);
      console.log(`Copied ${file} to dist folder`);
    } else {
      console.warn(`Warning: ${file} not found`);
    }
  }

  console.log('Dist folder prepared successfully!');
}

prepareDist().catch(console.error);
