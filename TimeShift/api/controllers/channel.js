//'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
//var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  getChannel: getChannel,
  addChannel: addChannel,
  deleteChannel: deleteChannel
  
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
/*function addChannel(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
}*/

function getChannel(req, res1)
{
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var id = req.swagger.params.id.value || 'stranger';
    //var hello = util.format('Hello, %s!', id);
  
    const db = require('../database')

        db.query('SELECT * FROM channels WHERE id = $1', [id], (err, res) => {
            if (err) {
            return err
            }
            res1.json(res.rows[0])
        })
    //res.json(hello);
  }

  function addChannel(req,res1)
  {
    var uri = req.swagger.params.uri.value;
    var number_failed = req.swagger.params.number_failed.value;
    var number_succeded = req.swagger.params.number_succeded.value;
    var hours_to_record = req.swagger.params.hours_to_record.value;
    var name = req.swagger.params.name.value;
    
    const db = require('../database');

    db.query('INSERT INTO channels(uri,number_failed,number_succeded,hours_to_record,name) VALUES ($1,$2,$3,$4,$5) RETURNING *', [uri,number_failed,number_succeded,hours_to_record,name],(err, res) => {
      if (err) {
        return err
      }
      res1.json(res.rows[0])
  })
  }

  function deleteChannel(req,res1)
  {
    var id = req.swagger.params.id.value;
    const db = require('../database');

    db.query('DELETE FROM channels WHERE id = $1 RETURNING *', [id],(err, res) => {
      if (err) {
        return err
      }
      res1.json(res.rows[0])
  })
}