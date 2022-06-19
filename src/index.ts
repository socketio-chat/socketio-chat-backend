import { server } from './app';
import { config } from './config';

server.listen(config.port, () => {
  console.log(`Running at port ${config.port}`);
});
