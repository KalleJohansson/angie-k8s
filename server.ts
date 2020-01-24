import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

import { readFileSync } from 'fs';

// access logging
/* const morgan = require('morgan');
const rfs = require('rotating-file-stream'); */

// client logging
/* const winston = require('winston');
require('winston-daily-rotate-file'); */

const domino = require('domino');

const proxy = require('express-http-proxy');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

//const LOG_FOLDER = process.env.LOGFOLDER || './logs';
const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();
const win = domino.createWindow(template);

/* tslint:disable:no-string-literal */
global['window'] = win;
global['KeyboardEvent'] = win.KeyboardEvent;
global['HTMLInputElement'] = win.HTMLInputElement;
global['MouseEvent'] = win.MouseEvent;
global['Event'] = win.Event;
global['FocusEvent'] = win.FocusEvent;
global['HTMLElement'] = win.HTMLElement;
/* tslint:enable:no-string-literal */

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  })
);

// create a rotating write stream
/* const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: `${LOG_FOLDER}`,
}); */

// creates an accesslogger with apache format
// app.use(morgan('combined', { stream: accessLogStream }));
/* app.use(morgan('combined')); */

// set up the client logger
/*const clientLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'clientlog-%DATE%.json',
      dirname: LOG_FOLDER,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});*/
/* const clientLogger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [new winston.transports.Console()],
}); */

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.use(express.json());

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
app.get('/echo', (req, res) => {
  res.send({ echo: 'echo från express-server' });
});

app.post('/clientlog', (req, res) => {
  const { level, message } = req.body;
  //clientLogger.log(level.toLowerCase(), message);
  res.send();
});

// Server static files from /browser
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  })
);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, '0.0.0.0', () => {
  //console.log(`[${new Date().toISOString()}] Runor server started @ 0.0.0.0:${PORT}`);
  //console.log(`[${new Date().toISOString()}] Access log available @ ${LOG_FOLDER}/access.log`);
});
