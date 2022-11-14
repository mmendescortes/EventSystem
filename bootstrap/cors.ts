module.exports = ((app) => {
  const cors = require('cors');
  app.use(cors());
  app.options('/api/*', cors());
});