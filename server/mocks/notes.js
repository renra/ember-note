/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var notesRouter = express.Router();

  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  var nedb = require('nedb');
  var db = new nedb({filename: 'notes', autoload: true});

  notesRouter.get('/', function(req, res) {
    db.find(req.query).exec(function(err, records){
      res.send({ notes: records });
    });
  });

  notesRouter.post('/', function(req, res) {
    db.find({}).sort({id: -1}).limit(1).exec((err, records) => {
      if(records.length != 0){
        req.body.note.id = notes[0].id + 1;
      } else {
        req.body.note.id = 1;
      }

      db.insert(req.body.note, (err, newRecord) => {
        res.status(201);
        res.send(
          JSON.stringify({note: newRecord})
        );
      });
    });
  });

  notesRouter.get('/:id', function(req, res) {
    res.send({
      'notes': {
        id: req.params.id
      }
    });
  });

  notesRouter.put('/:id', function(req, res) {
    var id = parseInt(req.params.id);

    db.update({id: id}, {$set: req.body.note}, function(err, numReplaced, newRecords){
      res.send({notes: {id: id}});
    });
  });

  notesRouter.delete('/:id', function(req, res) {
    var id = parseInt(req.params.id);

    db.remove({id: id}, function(err, numRemoved) {
      res.status(204).end();
    });
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/notes', require('body-parser'));
  app.use('/api/notes', notesRouter);
};
