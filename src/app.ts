import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { createIoServer } from './common/socket-io';

const app = express();

app.use(cors());

app.use('/ping', (req, res) => {
  res.send('pong');
});

export const server = http.createServer(app);

createIoServer(server);
