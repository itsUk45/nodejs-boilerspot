import express from 'express';
import mocha from 'mocha';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './routes/user';
// console.log(userRouter);
dotenv.config(); // load .env Variables

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/auth', userRouter.router);
const port = 3000 || process.env.PORT;


// generic error middleware functions
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => { // get the error from above middleware
  // res.status(error.status || 500);
  res.status(500).json({
    status: 'error',
    error: error.message,
  });
});

// make a static folder for public images
app.use('/uploads', express.static('uploads'));
if (!module.parent) { // check to see if there no test happening otherwise without this,
  // we get the error of address already in use when we run mocha test.
  app.listen(port, (req, res) => console.log(`listenting on port ${port} `));
}

export default app;
