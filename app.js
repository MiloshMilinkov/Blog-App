import dotenv from 'dotenv';
import express from 'express';
import router from './server/routes/index.js';
import connectDb from './server/config/db.js';
import cookieParser from 'cookie-parser';
import tokenBucketMiddleware from './server/middleware/rateLimiter.js';
import cors from './server/middleware/cors.js';


dotenv.config();

await connectDb();

const app = express();

//Allow only my future fontend origin to make request to this api
//Will need to check this more, but without cors only the same origin url can make the request
//Front will def be on a diffrenet origin, check when deploying to real env.
app.use(cors);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/api', tokenBucketMiddleware, router);

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
