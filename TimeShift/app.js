'use strict';

require('dotenv').config()

let SwaggerConnect = require('swagger-connect');
let app = require('connect')();
let serveStatic = require('serve-static');

module.exports = app; // for testing

let config = {
  appRoot: __dirname // required config
};

app.use(serveStatic("../StreamDownloader"))

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);

  let port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerConnect.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

