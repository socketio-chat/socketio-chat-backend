import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { createIoServer } from './common/socket-io';

const app = express();

app.use(cors());

app.use((req, res, err, next) => {
  console.log('Middleware ', req.headers.Origin);
  if (req.headers.Origin === 'http://localhost:3000') {
    res.header('Access-Control-Allow-Origin', '*');
  }

  next();
});

app.use('/ping', (req, res) => {
  res.send('pong');
});

export const server = http.createServer(app);

createIoServer(server);
