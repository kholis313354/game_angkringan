const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '.nojekyll');
const dest = path.join(__dirname, 'dist', '.nojekyll');

try {
  fs.copyFileSync(source, dest);
  console.log('✅ .nojekyll copied to dist/');
} catch (error) {
  console.error('❌ Error copying .nojekyll:', error.message);
  process.exit(1);
}

