import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
console.log('process.env.port', process.env.PORT);
app.listen(port, () => console.log(`App listening on port ​${port}​!`));
