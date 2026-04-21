const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

function getConnectionConfig() {
  const uri = process.env.MYSQL_URI || process.env.DATABASE_URL;
  if (uri && (uri.startsWith('mysql://') || uri.startsWith('mysql2://'))) {
    let u = uri;
    if (u.startsWith('mysql2://')) {
      u = `mysql://${u.slice('mysql2://'.length)}`;
    }
    const join = u.includes('?') ? '&' : '?';
    return `${u}${join}multipleStatements=true`;
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
    multipleStatements: true,
  };
}

async function main() {
  const cfg = getConnectionConfig();
  if (!cfg) {
    console.error('Set MYSQL_URI (or DATABASE_URL), or MYSQL_HOST + MYSQL_DATABASE in backend/.env');
    process.exit(1);
  }
  const sqlPath = path.join(__dirname, '..', 'sql', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  const conn = await mysql.createConnection(cfg);
  try {
    await conn.query(sql);
  } finally {
    await conn.end();
  }
  console.log('Applied sql/schema.sql successfully.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
