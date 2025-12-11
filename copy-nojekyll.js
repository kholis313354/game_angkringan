const fs = require('fs');
const path = require('path');

// Copy .nojekyll
const nojekyllSource = path.join(__dirname, '.nojekyll');
const nojekyllDest = path.join(__dirname, 'dist', '.nojekyll');

try {
  fs.copyFileSync(nojekyllSource, nojekyllDest);
  console.log('✅ .nojekyll copied to dist/');
} catch (error) {
  console.error('❌ Error copying .nojekyll:', error.message);
  process.exit(1);
}

// Copy 404.html if exists and update asset paths from index.html
const html404Source = path.join(__dirname, 'public', '404.html');
const html404Dest = path.join(__dirname, 'dist', '404.html');
const indexHtmlPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(html404Source) && fs.existsSync(indexHtmlPath)) {
  try {
    // Read index.html to get correct asset paths
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    const scriptMatch = indexHtml.match(/<script[^>]+src="([^"]+)"[^>]*>/);
    const linkMatch = indexHtml.match(/<link[^>]+href="([^"]+)"[^>]*>/);
    
    // Read 404.html template
    let html404 = fs.readFileSync(html404Source, 'utf8');
    
    // Replace asset paths if found
    if (scriptMatch && linkMatch) {
      html404 = html404.replace(
        /<script[^>]+src="[^"]+"[^>]*>/,
        scriptMatch[0]
      );
      html404 = html404.replace(
        /<link[^>]+href="[^"]+"[^>]*>/,
        linkMatch[0]
      );
    }
    
    fs.writeFileSync(html404Dest, html404);
    console.log('✅ 404.html copied to dist/ with updated asset paths');
  } catch (error) {
    console.error('❌ Error copying 404.html:', error.message);
    // Fallback: just copy the file
    try {
      fs.copyFileSync(html404Source, html404Dest);
      console.log('✅ 404.html copied to dist/ (fallback)');
    } catch (fallbackError) {
      console.error('❌ Fallback copy also failed:', fallbackError.message);
    }
  }
}
