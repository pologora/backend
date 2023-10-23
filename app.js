const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const employeeRouter = require('./routes/employeeRoutes');
const agencyRouter = require('./routes/agencyRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/agencies', agencyRouter);

// app.use('/api/v1/users', vacationRouter);  vacations
// app.use('/api/v1/users', worktimeRouter);  worktime

app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
