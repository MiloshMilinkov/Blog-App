import dotenv from 'dotenv';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import router from './server/routes/index.js';
import connectDb from './server/config/db.js';

dotenv.config();

connectDb()
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
