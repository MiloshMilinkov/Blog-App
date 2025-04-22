import dotenv from 'dotenv';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import router from './server/routes/index.js';
import connectDb from './server/config/db.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(router);
connectDb();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
