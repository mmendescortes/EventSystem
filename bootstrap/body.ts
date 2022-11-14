module.exports = ((app) => {
  const body = require('body-parser');
  app.use(body.json());
  app.use(body.urlencoded({extended: true}));
});
