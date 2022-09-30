'use strict';


const Joi = require('joi');
Joi . objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

//////////////////////////////////////////////////////////////

const log4js = require('log4js');
const logger = log4js.getLogger('circlenft-app');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./public/swagger/data.json');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const util = require('util');
const app = express();
const cors = require('cors');
const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const helper = require('./app/helpers/fabric-helper');
const eventHelper = require('./app/helpers/event-helper');
const expressOasGenerator = require('express-oas-generator');
const {errorResponse} = require('./app/object-builders/client-response-builder');
const {clientErrorHandler,errorHandler} = require('./app/helpers/errorhandlers');
const auth = require('./app/middlewares/auth');

const WebSocket = require('ws');
let webSocketClients = [];

logger.level = config.logLevel;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'local'
}

//define the project routes ...

const nft = require("./app/routes/nft");
const users = require("./app/routes/users");
const authn = require("./app/routes/auth");
const update = require("./app/routes/update");
const empsData = require("./app/routes/empsData");
const skillbadge = require("./app/routes/skillbadge");


//mongodb connection
mongoose.connect("mongodb+srv://vineethkalimili:ugbzBVNps6fi4scA@cluster0.klr51lu.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('connected to database'));


const host = process.env.HOST || config.host;
const port = process.env.PORT || config.port;

app.options('*', cors());
app.use(cors());
app.use(express.static('public'))
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('client/build'));

// set up swagger
fs.readFile('public/swagger/data.json', 'utf8', function (err, data) {
  expressOasGenerator.init(app, JSON.parse(data));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// route middleware to verify a token ... all routes below will be require to authenticate ...
//app.use(auth.authenticate);


app.use("/nft", nft);
app.use('/api/signup', users);
app.use('/api/signin', authn);
app.use('/api/update', update);
app.use('/api/empsData', empsData);
app.use('/api/skillbadge', skillbadge);

// error handling
app.use((req, res) => res.status(404).send(errorResponse.format("Router not found")));

app.use(clientErrorHandler);
app.use(errorHandler);

const server = http.createServer(app).listen(port, async function () {
  await Promise.all([helper.enrollAdmin("org1")]).then((result) => {
    logger.info('Successfully enrolled admin users');
  }, (err) => {
    logger.error('Failed to enroll admin users', err);
  });

  let wss = new WebSocket.Server({ server: server });

  wss.on('connection', function (ws) {
    webSocketClients.push(ws);
    ws.on('close', function (code, reason) {
      logger.info('client closed', 'path', code, reason);
    });
    ws.on('message', function (data) {
      logger.info('message from client', data);
    });
  });

  eventHelper.registerEvent(sendAll);
  logger.info('****************** SERVER STARTED ************************');
  logger.info('**************  http://' + host + ':' + port + ' ******************');
});

function sendAll(message) {
  webSocketClients.forEach(function (item, index, object) {
    if (webSocketClients[index].readyState != webSocketClients[index].OPEN) {
      object.splice(index, 1);
    }
  });
  for (let i = 0; i < webSocketClients.length; i++) {
    if (webSocketClients[i].readyState == webSocketClients[i].OPEN) {
      webSocketClients[i].send(JSON.stringify(message));
    }
  }
}

server.timeout = 240000;
