const { DB_UNAVAILABLE_MESSAGE } = require('./requireDb');

function isMysqlConnectivityError(err) {
  const code = err && err.code;
  const msg = (err && err.message) || '';
  return (
    code === 'ECONNREFUSED' ||
    code === 'ETIMEDOUT' ||
    code === 'PROTOCOL_CONNECTION_LOST' ||
    code === 'ENOTFOUND' ||
    msg.includes('Pool is closed') ||
    msg.includes('connect')
  );
}

const errorHandler = (err, req, res, next) => {
  if (isMysqlConnectivityError(err)) {
    res.status(503);
    return res.json({
      message: DB_UNAVAILABLE_MESSAGE,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };
