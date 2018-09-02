//var program = require('commander');
//var http = require('http');
var express = require('express');
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var config = require('./config.json');
var request = require('request');

for (var serverName in config) {
  var app = express();
  app.use(cookieParser());

  nunjucks.configure('views', {
      autoescape: true,
      express: app
  });

  if (config[serverName].mode === 'publisher') {
    app.get('/', (req, res) => {
      res.cookie('s1', 'serverside_cookie_created_by_publisher');
      res.cookie('s2', 'serverside_cookie_httpOnly_created_by_publisher', { httpOnly: true });
      res.render('page.html', {
        externalHost: config.external.host,
        externalPort: config.external.port,
        publisherHost: config.publisher.host,
        publisherPort: config.publisher.port,
        adserverHost: config.adserver.host,
        adserverPort: config.adserver.port
      });
    });

    app.get('/resource', (req, res) => {
      res.send('<p>Some content</p>');
    });
  }

  if (config[serverName].mode === 'external') {
    app.get('/beacon.js', (req, res) => {
      res.cookie('s3', 'serverside_cookie_created_by_external');
      res.render('beacon.js');
    });

    app.get('/endpoint', (req, res) => {
      res.cookie('s4', 'serverside_cookie_created_by_external');
      res.send('OK on external endpoint');
    });
  }

  if (config[serverName].mode === 'adserver') {
    app.get('/proxy', (req, res) => {
      request.get(`http://${config.external.host}:${config.external.port}/endpoint`, (err, response, body) => {
        res.cookie('s5', 'serverside_cookie_created_by_adserver');
        res.send(body);
      });
    });

    app.get('/', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.json({success: true});
    });

    app.get('/create-cookie', (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.cookie('adserver-cookie', 'serverside_cookie_created_by_adserver');
      res.send({success: true});
    });
  }

//  app.get('/create-cookie', (req, res) => {
//    res.cookie('s2', 'value2');
//    res.send('Cookie creation here');
//  });

  (function() {
    var port = config[serverName].port;
    var host = config[serverName].host;

    app.listen(port, host, () => {
      console.log(`Listening on ${host}:${port}`)
    });
  }());
}


//program
//  .option('-p, --port [port]', 'Port')
//  .option('-h, --host [host]', 'Host')
//  .parse(process.argv);

//app.listen(program.port, program.host, () => {
//  console.log(`Listening on ${program.host}:${program.port}`)
//});