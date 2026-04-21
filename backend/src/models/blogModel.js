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

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function mapBlog(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image || '',
    tags: parseJsonCol(row.tags, []),
    category: row.category,
    author: row.author,
    status: row.status,
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : undefined,
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    readTime: row.read_time || '',
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
  };
}

async function find(filter = {}) {
  const pool = getPool();
  const params = [];
  let sql = 'SELECT * FROM blogs';
  if (filter.status) {
    sql += ' WHERE status = ?';
    params.push(filter.status);
  }
  sql += ' ORDER BY published_at IS NULL, published_at DESC, created_at DESC';
  const [rows] = await pool.execute(sql, params);
  return rows.map(mapBlog);
}

async function findBySlug(slug) {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM blogs WHERE slug = ?', [slug]);
  return mapBlog(rows[0]);
}

async function findById(id) {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM blogs WHERE id = ?', [Number(id)]);
  return mapBlog(rows[0]);
}

async function create(body) {
  let slug = body.slug || slugify(body.title);
  let publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
  if (body.status === 'published' && !publishedAt) {
    publishedAt = new Date();
  }
  const pool = getPool();
  const [result] = await pool.execute(
    `INSERT INTO blogs (
      title, slug, excerpt, content, cover_image, tags, category, author, status,
      published_at, seo_title, seo_description, read_time
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      body.title,
      slug,
      body.excerpt,
      body.content,
      body.coverImage || '',
      JSON.stringify(body.tags || []),
      body.category || 'Travel Tips',
      body.author || 'Serendib Travel',
      body.status || 'draft',
      publishedAt,
      body.seoTitle || '',
      body.seoDescription || '',
      body.readTime || '',
    ]
  );
  return findById(result.insertId);
}

async function updateById(id, body) {
  const existing = await findById(id);
  if (!existing) return null;
  let publishedAt = body.publishedAt !== undefined
    ? (body.publishedAt ? new Date(body.publishedAt) : null)
    : (existing.publishedAt ? new Date(existing.publishedAt) : null);
  if (body.status === 'published' && !publishedAt) {
    publishedAt = new Date();
  }
  const pool = getPool();
  await pool.execute(
    `UPDATE blogs SET
      title=?, slug=?, excerpt=?, content=?, cover_image=?, tags=?, category=?, author=?,
      status=?, published_at=?, seo_title=?, seo_description=?, read_time=?
    WHERE id=?`,
    [
      body.title ?? existing.title,
      body.slug ?? existing.slug,
      body.excerpt ?? existing.excerpt,
      body.content ?? existing.content,
      body.coverImage ?? existing.coverImage,
      JSON.stringify(body.tags ?? existing.tags),
      body.category ?? existing.category,
      body.author ?? existing.author,
      body.status ?? existing.status,
      publishedAt,
      body.seoTitle ?? existing.seoTitle,
      body.seoDescription ?? existing.seoDescription,
      body.readTime ?? existing.readTime,
      Number(id),
    ]
  );
  return findById(id);
}

async function deleteById(id) {
  const pool = getPool();
  const [result] = await pool.execute('DELETE FROM blogs WHERE id = ?', [Number(id)]);
  return result.affectedRows > 0;
}

module.exports = {
  find,
  findBySlug,
  findById,
  create,
  updateById,
  deleteById,
  slugify,
};
