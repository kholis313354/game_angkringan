const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment to GitHub Pages...\n');

// Step 1: Build
console.log('📦 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!\n');
} catch (error) {
  console.error('❌ Build failed!');
  process.exit(1);
}

// Step 2: Check if dist exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ folder not found!');
  process.exit(1);
}

// Step 3: Create or checkout gh-pages branch
console.log('🌿 Preparing gh-pages branch...');
try {
  // Try to checkout gh-pages, create if doesn't exist
  try {
    execSync('git checkout gh-pages', { stdio: 'pipe' });
  } catch (e) {
    execSync('git checkout --orphan gh-pages', { stdio: 'pipe' });
  }
  
  // Remove all files except .git
  execSync('git rm -rf .', { stdio: 'pipe' });
  
  // Copy files from dist to root
  console.log('📋 Copying files from dist/...');
  const distFiles = fs.readdirSync(distPath);
  distFiles.forEach(file => {
    const src = path.join(distPath, file);
    const dest = path.join(__dirname, file);
    if (fs.statSync(src).isDirectory()) {
      execSync(`xcopy /E /I /Y "${src}" "${dest}"`, { stdio: 'pipe' });
    } else {
      fs.copyFileSync(src, dest);
    }
  });
  
  // Ensure .nojekyll exists
  if (!fs.existsSync('.nojekyll')) {
    fs.writeFileSync('.nojekyll', '');
  }
  
  console.log('✅ Files copied!\n');
  
  // Step 4: Commit and push
  console.log('💾 Committing changes...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Deploy to GitHub Pages"', { stdio: 'inherit' });
  
  console.log('🚀 Pushing to GitHub...');
  execSync('git push origin gh-pages --force', { stdio: 'inherit' });
  
  console.log('\n✅ Deployment successful!');
  console.log('🌐 Your site will be available at: https://kholis313354.github.io/game_angkringan/');
  console.log('⏳ Please wait 2-3 minutes for GitHub Pages to update.\n');
  
  // Step 5: Return to main branch
  console.log('🔄 Returning to main branch...');
  execSync('git checkout main', { stdio: 'pipe' });
  console.log('✅ Back to main branch!\n');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  // Try to return to main branch
  try {
    execSync('git checkout main', { stdio: 'pipe' });
  } catch (e) {
    // Ignore
  }
  process.exit(1);
}

