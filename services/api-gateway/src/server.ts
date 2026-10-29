import app from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, async () => {
  console.log('SERVER IS ONLINE..........');
});
