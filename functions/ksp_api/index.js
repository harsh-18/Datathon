const app = require('./src/app');

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[KSP API] Running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;
