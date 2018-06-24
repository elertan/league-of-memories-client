const port = 13370;

import * as express from 'express';
import clientRouter from './client/clientRouter';
const app = express();

app.use('/client', clientRouter);

let serverRunning = false;

export default () => {
  return new Promise((resolve, reject) => {
    if (serverRunning) {
      return resolve();
    }
    app.listen(port, () => {
    // tslint:disable-next-line:no-console
      console.log(`Server listening on port ${port}`);
      serverRunning = true;
      resolve();
    }).on('error', (err) => {
      reject(err);
    });
  });
};
