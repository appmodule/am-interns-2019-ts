'use strict';

require('dotenv').config()

let SwaggerConnect = require('swagger-connect');
let app = require('connect')();
let serveStatic = require('serve-static');

module.exports = app; // for testing

let config = {
  appRoot: __dirname // required config
};

app.use(function(req, res, next){
	console.log(req.url)
	next()
});

function setHeaders (res, path) {
	console.log('hi')
  res.setHeader('Access-Control-Allow-Origin','*')
}

app.use(serveStatic(process.env.TS_FILES, {'setHeaders':setHeaders}))

SwaggerConnect.create(config, function(err, swaggerConnect) {
  if (err) { throw err; }

  // install middleware
  swaggerConnect.register(app);

  let port = process.env.SERVER_PORT || 10010;
  app.listen(port);

  if (swaggerConnect.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});

