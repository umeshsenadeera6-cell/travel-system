const { getPool } = require('../../db');

const DB_UNAVAILABLE_MESSAGE =
  'Database is offline or unreachable. Confirm MySQL is running and MYSQL_URI (or MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE) in backend/.env is correct, apply sql/schema.sql if tables are missing, then restart the backend.';

/**
 * Blocks data routes until a MySQL pool is available.
 */
function requireDb(req, res, next) {
  if (getPool()) {
    return next();
  }
  res.status(503).json({ message: DB_UNAVAILABLE_MESSAGE });
}

module.exports = { requireDb, DB_UNAVAILABLE_MESSAGE };
