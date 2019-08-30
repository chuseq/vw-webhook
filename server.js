var express = require('express')
var bodyParser = require('body-parser')
var childProcess = require('child_process');
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/visibilidad', function (req, res) {
  console.log(req.body.ref)
  console.log(req.body.sender.login)
  deploy(res,'./deploy.sh')
});

app.post('/api', function (req, res) {
  console.log(req.body.ref)
  console.log(req.body.sender.login)
  deploy(res,'./deploy-api.sh')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function deploy(res, script){
  childProcess.exec(script, function(err, stdout, stderr){
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log("se completo el deploy")
      res.sendStatus(200);
    });
}
