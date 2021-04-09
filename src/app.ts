import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import groupsRouter from './routes/groups';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import config from './config';
import passport from './passport';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', passport.authenticate('jwt', {session: false}), usersRouter);
app.use('/groups', passport.authenticate('jwt', {session: false}), groupsRouter);
app.use('/auth', authRouter)


mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const portNumber: number = parseInt(val, 10);

  if (isNaN(portNumber)) {
    return val;
  }

  if (portNumber >= 0) {
    return portNumber;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: Error) {
    // tslint:disable-next-line:no-console
    console.log(error.message)
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}



module.exports = app;
