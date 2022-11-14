module.exports = (()=>{
  const library = require("./bootstrap/init");
  require("./bootstrap/serve")(library);
})();