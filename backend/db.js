const mysql = require('mysql2/promise');

let pool = null;
let retryTimer = null;
const RETRY_MS = 20000;

function buildPoolConfig() {
  const uri = process.env.MYSQL_URI || process.env.DATABASE_URL;
  if (uri && (uri.startsWith('mysql://') || uri.startsWith('mysql2://'))) {
    return uri;
  }
  if (!process.env.MYSQL_HOST || !process.env.MYSQL_DATABASE) {
    return null;
  }
  return {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD ?? '',
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };
}

async function tryCreatePool() {
  const config = buildPoolConfig();
  if (!config) {
    return;
  }
  try {
    const next = mysql.createPool(config);
    const conn = await next.getConnection();
    conn.release();
    if (pool) {
      await pool.end().catch(() => {});
    }
    pool = next;
    console.log('MySQL pool ready');
    if (retryTimer) {
      clearInterval(retryTimer);
      retryTimer = null;
    }
  } catch (error) {
    console.error(`MySQL: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    console.warn(
      `MySQL unavailable — data routes return 503 until connected. Retrying every ${RETRY_MS / 1000}s (development).`
    );
  }
}

async function connectDB() {
  if (!buildPoolConfig()) {
    console.error('Error: set MYSQL_URI (or DATABASE_URL), or MYSQL_HOST + MYSQL_DATABASE in .env');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return;
  }
  await tryCreatePool();
  if (process.env.NODE_ENV !== 'production' && !pool) {
    if (!retryTimer) {
      retryTimer = setInterval(tryCreatePool, RETRY_MS);
    }
  }
}

function getPool() {
  return pool;
}

module.exports = connectDB;
module.exports.getPool = getPool;
