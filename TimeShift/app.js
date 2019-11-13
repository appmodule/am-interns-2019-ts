'use strict';

// require('dotenv').config()

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
  res.setHeader('Access-Control-Allow-Origin','*')
}
app.use(serveStatic(process.env.TS_FILES, {'setHeaders':setHeaders}))

const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath()
const fs = require('fs')
const indexContent = fs.readFileSync(`${swaggerUiAssetPath }/index.html`)
  .toString()
  .replace("https://petstore.swagger.io/v2/swagger.json", "swagger.yaml")
app.use("/swagger", (req, res, next) => {
  if (req.url === '/')
    res.end(indexContent)
  else
    next()
})
app.use("/swagger/index.html", (req, res) => res.end(indexContent))
app.use('/swagger/', serveStatic(swaggerUiAssetPath))
app.use('/swagger/swagger.yaml', serveStatic('api/swagger/swagger.yaml'))

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

