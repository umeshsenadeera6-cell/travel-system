const { getPool } = require('../../db');

function parseJsonCol(val, fallback) {
  if (val == null) return fallback;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function mapPackage(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    title: row.title,
    price: Number(row.price),
    image: row.image,
    gallery: parseJsonCol(row.gallery, []),
    duration: row.duration,
    description: row.description,
    highlights: parseJsonCol(row.highlights, []),
    itinerary: parseJsonCol(row.itinerary, []),
    inclusions: parseJsonCol(row.inclusions, []),
    exclusions: parseJsonCol(row.exclusions, []),
    category: row.category,
    type: row.type,
    featured: Boolean(row.featured),
    localizations: parseJsonCol(row.localizations, {}),
    route: row.route == null ? undefined : parseJsonCol(row.route, undefined),
    isLimitedTime: Boolean(row.is_limited_time),
    discountPercentage: Number(row.discount_percentage),
    expiryDate: row.expiry_date ? new Date(row.expiry_date).toISOString() : undefined,
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
  };
}

async function find(filter = {}) {
  const pool = getPool();
  let sql = `SELECT * FROM packages`;
  const params = [];
  if (filter.category === 'Inbound' || filter.category === 'Outbound') {
    sql += ' WHERE category = ?';
    params.push(filter.category);
  }
  sql += ' ORDER BY featured DESC, created_at DESC';
  const [rows] = await pool.execute(sql, params);
  return rows.map(mapPackage);
}

async function findById(id) {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM packages WHERE id = ?', [Number(id)]);
  return mapPackage(rows[0]);
}

function normalizeBody(body) {
  return {
    title: body.title,
    price: body.price,
    image: body.image,
    gallery: body.gallery ?? body.images ?? [],
    duration: body.duration,
    description: body.description,
    highlights: body.highlights ?? [],
    itinerary: body.itinerary ?? [],
    inclusions: body.inclusions ?? [],
    exclusions: body.exclusions ?? [],
    category: body.category,
    type: body.type || 'Day',
    featured: Boolean(body.featured),
    localizations: body.localizations ?? {},
    route: body.route ?? null,
    isLimitedTime: Boolean(body.isLimitedTime),
    discountPercentage: body.discountPercentage ?? 0,
    expiryDate: body.expiryDate ?? null,
    seoTitle: body.seoTitle ?? '',
    seoDescription: body.seoDescription ?? '',
  };
}

async function create(body) {
  const d = normalizeBody(body);
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO packages (
      title, price, image, gallery, duration, description, highlights, itinerary,
      inclusions, exclusions, category, type, featured, localizations, route,
      is_limited_time, discount_percentage, expiry_date, seo_title, seo_description
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      d.title,
      d.price,
      d.image,
      JSON.stringify(d.gallery),
      d.duration,
      d.description,
      JSON.stringify(d.highlights),
      JSON.stringify(d.itinerary),
      JSON.stringify(d.inclusions),
      JSON.stringify(d.exclusions),
      d.category,
      d.type,
      d.featured ? 1 : 0,
      JSON.stringify(d.localizations),
      d.route == null ? null : JSON.stringify(d.route),
      d.isLimitedTime ? 1 : 0,
      d.discountPercentage,
      d.expiryDate ? new Date(d.expiryDate) : null,
      d.seoTitle,
      d.seoDescription,
    ]
  );
  return findById(result.insertId);
}

async function updateById(id, body) {
  const existing = await findById(id);
  if (!existing) return null;
  const merged = {
    ...existing,
    ...body,
    gallery: body.gallery ?? body.images ?? existing.gallery,
    highlights: body.highlights ?? existing.highlights,
    itinerary: body.itinerary ?? existing.itinerary,
    inclusions: body.inclusions ?? existing.inclusions,
    exclusions: body.exclusions ?? existing.exclusions,
    localizations: body.localizations ?? existing.localizations,
    route: body.route !== undefined ? body.route : existing.route,
  };
  const d = normalizeBody(merged);
  const pool = getPool();
  await pool.execute(
    `UPDATE packages SET
      title=?, price=?, image=?, gallery=?, duration=?, description=?, highlights=?, itinerary=?,
      inclusions=?, exclusions=?, category=?, type=?, featured=?, localizations=?, route=?,
      is_limited_time=?, discount_percentage=?, expiry_date=?, seo_title=?, seo_description=?
    WHERE id=?`,
    [
      d.title,
      d.price,
      d.image,
      JSON.stringify(d.gallery),
      d.duration,
      d.description,
      JSON.stringify(d.highlights),
      JSON.stringify(d.itinerary),
      JSON.stringify(d.inclusions),
      JSON.stringify(d.exclusions),
      d.category,
      d.type,
      d.featured ? 1 : 0,
      JSON.stringify(d.localizations),
      d.route == null ? null : JSON.stringify(d.route),
      d.isLimitedTime ? 1 : 0,
      d.discountPercentage,
      d.expiryDate ? new Date(d.expiryDate) : null,
      d.seoTitle,
      d.seoDescription,
      Number(id),
    ]
  );
  return findById(id);
}

async function deleteById(id) {
  const pool = getPool();
  const [result] = await pool.execute('DELETE FROM packages WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

module.exports = {
  find,
  findById,
  create,
  updateById,
  deleteById,
};
