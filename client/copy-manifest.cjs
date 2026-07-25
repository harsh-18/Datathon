const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'client-package.json');
const dest = path.join(__dirname, 'dist', 'client-package.json');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('Copied client-package.json to dist/client-package.json');
}
