const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');

function getConfig() {
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
  };
}

async function main() {
  const cfg = getConfig();
  if (!cfg) {
    console.error('Missing MySQL config in backend/.env (MYSQL_HOST + MYSQL_DATABASE or MYSQL_URI).');
    process.exit(1);
  }
  const conn = await mysql.createConnection(cfg);
  try {
    const [[row]] = await conn.query(
      `SELECT DATABASE() AS db, @@hostname AS host, (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()) AS tables`
    );
    console.log('Connected to MySQL.');
    console.log('  Database:', row.db);
    console.log('  Server host:', row.host);
    console.log('  Tables in this database:', row.tables);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('Connection failed:', err.message);
  process.exit(1);
});
