const { getPool } = require('../../db');

function mapBooking(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    tourId: String(row.tour_id),
    tourTitle: row.tour_title,
    clientName: row.client_name,
    email: row.email,
    phone: row.phone,
    bookingDate: row.booking_date
      ? new Date(row.booking_date).toISOString().slice(0, 10)
      : undefined,
    guests: Number(row.guests),
    specialRequests: row.special_requests || '',
    totalPrice: Number(row.total_price),
    submittedAt: row.submitted_at ? new Date(row.submitted_at).toISOString() : undefined,
    status: row.status,
  };
}

async function findAll() {
  const pool = getPool();
  const [rows] = await pool.execute(
    'SELECT * FROM bookings ORDER BY submitted_at DESC'
  );
  return rows.map(mapBooking);
}

async function create(body) {
  const pool = getPool();
  const tourId = Number(body.tourId);
  const [result] = await pool.execute(
    `INSERT INTO bookings (
      tour_id, tour_title, client_name, email, phone, booking_date, guests,
      special_requests, total_price, status
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      tourId,
      body.tourTitle,
      body.clientName,
      body.email,
      body.phone,
      new Date(body.bookingDate),
      Number(body.guests),
      body.specialRequests || '',
      body.totalPrice,
      body.status || 'pending',
    ]
  );
  const [rows] = await pool.execute('SELECT * FROM bookings WHERE id = ?', [result.insertId]);
  return mapBooking(rows[0]);
}

async function updateStatus(id, status) {
  const pool = getPool();
  const [result] = await pool.execute(
    'UPDATE bookings SET status = ? WHERE id = ?',
    [status, Number(id)]
  );
  if (!result.affectedRows) return null;
  const [rows] = await pool.execute('SELECT * FROM bookings WHERE id = ?', [Number(id)]);
  return mapBooking(rows[0]);
}

async function deleteById(id) {
  const pool = getPool();
  const [result] = await pool.execute('DELETE FROM bookings WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

module.exports = {
  findAll,
  create,
  updateStatus,
  deleteById,
};
