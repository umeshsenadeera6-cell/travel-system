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

function mapRow(row) {
  if (!row) return null;
  const featured = parseJsonCol(row.featured_tour_ids, []);
  return {
    _id: String(row.id),
    siteId: row.site_id,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    heroImages: parseJsonCol(row.hero_images, []),
    aboutTitle: row.about_title,
    aboutText: row.about_text,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    contactWhatsApp: row.contact_whatsapp,
    contactAddress: row.contact_address,
    socialFacebook: row.social_facebook || '',
    socialInstagram: row.social_instagram || '',
    socialTwitter: row.social_twitter || '',
    socialYoutube: row.social_youtube || '',
    socialTripAdvisor: row.social_tripadvisor || '',
    partnerLogos: parseJsonCol(row.partner_logos, []),
    featuredTourIds: featured.map((x) => String(x)),
    announcementEnabled: Boolean(row.announcement_enabled),
    announcementText: row.announcement_text || '',
    announcementLink: row.announcement_link || '',
    companyName: row.company_name,
    companyTagline: row.company_tagline,
    companyLogo: row.company_logo || '',
    footerText: row.footer_text,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : undefined,
  };
}

function defaultInsertRow() {
  return {
    site_id: 'main',
    hero_title: "Discover Sri Lanka's Hidden Paradise",
    hero_subtitle:
      "Your journey to the gem of the Indian Ocean starts here. Explore breathtaking landscapes, ancient culture, and unforgettable adventures.",
    hero_images: JSON.stringify([]),
    about_title: 'About Serendib Travel & Tours',
    about_text:
      'We are a premier travel agency specializing in both inbound and outbound tours, crafting unforgettable journeys tailored to your dreams.',
    contact_email: 'info@serendibtravel.lk',
    contact_phone: '+94 77 123 4567',
    contact_whatsapp: '+94771234567',
    contact_address: 'No. 123, Galle Road, Colombo 03, Sri Lanka',
    social_facebook: '',
    social_instagram: '',
    social_twitter: '',
    social_youtube: '',
    social_tripadvisor: '',
    partner_logos: JSON.stringify([]),
    featured_tour_ids: JSON.stringify([]),
    announcement_enabled: 0,
    announcement_text: '',
    announcement_link: '',
    company_name: 'Serendib Travel & Tours',
    company_tagline: 'Your Gateway to Sri Lanka',
    company_logo: '',
    footer_text: '© 2024 Serendib Travel & Tours. All rights reserved.',
    seo_title: 'Serendib Travel & Tours — Sri Lanka Tour Packages',
    seo_description:
      "Book premium inbound and outbound tours with Serendib Travel & Tours. Discover Sri Lanka's beauty with our tailored holiday packages.",
  };
}

async function ensureMainRow() {
  const pool = getPool();
  const [rows] = await pool.execute(
    'SELECT * FROM site_settings WHERE site_id = ? LIMIT 1',
    ['main']
  );
  if (rows[0]) {
    return mapRow(rows[0]);
  }
  const d = defaultInsertRow();
  // pool.query (not execute) avoids a MariaDB 10.4 + mysql2 prepared-statement failure on first default row.
  const insertVals = [
    d.site_id,
    d.hero_title,
    d.hero_subtitle,
    d.hero_images,
    d.about_title,
    d.about_text,
    d.contact_email,
    d.contact_phone,
    d.contact_whatsapp,
    d.contact_address,
    d.social_facebook,
    d.social_instagram,
    d.social_twitter,
    d.social_youtube,
    d.social_tripadvisor,
    d.partner_logos,
    d.featured_tour_ids,
    d.announcement_enabled,
    d.announcement_text,
    d.announcement_link,
    d.company_name,
    d.company_tagline,
    d.company_logo,
    d.footer_text,
    d.seo_title,
    d.seo_description,
  ];
  await pool.query(
    `INSERT INTO site_settings (
      site_id, hero_title, hero_subtitle, hero_images, about_title, about_text,
      contact_email, contact_phone, contact_whatsapp, contact_address,
      social_facebook, social_instagram, social_twitter, social_youtube, social_tripadvisor,
      partner_logos, featured_tour_ids, announcement_enabled, announcement_text, announcement_link,
      company_name, company_tagline, company_logo, footer_text, seo_title, seo_description
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    insertVals
  );
  const [again] = await pool.execute(
    'SELECT * FROM site_settings WHERE site_id = ? LIMIT 1',
    ['main']
  );
  return mapRow(again[0]);
}

async function updateMain(partial) {
  const current = await ensureMainRow();
  const next = { ...current, ...partial, siteId: 'main' };
  const featuredIds = (next.featuredTourIds || []).map((x) => Number(x)).filter((n) => !Number.isNaN(n));
  const pool = getPool();
  await pool.execute(
    `UPDATE site_settings SET
      hero_title=?, hero_subtitle=?, hero_images=?, about_title=?, about_text=?,
      contact_email=?, contact_phone=?, contact_whatsapp=?, contact_address=?,
      social_facebook=?, social_instagram=?, social_twitter=?, social_youtube=?, social_tripadvisor=?,
      partner_logos=?, featured_tour_ids=?, announcement_enabled=?, announcement_text=?, announcement_link=?,
      company_name=?, company_tagline=?, company_logo=?, footer_text=?, seo_title=?, seo_description=?
    WHERE site_id='main'`,
    [
      next.heroTitle,
      next.heroSubtitle,
      JSON.stringify(next.heroImages || []),
      next.aboutTitle,
      next.aboutText,
      next.contactEmail,
      next.contactPhone,
      next.contactWhatsApp,
      next.contactAddress,
      next.socialFacebook || '',
      next.socialInstagram || '',
      next.socialTwitter || '',
      next.socialYoutube || '',
      next.socialTripAdvisor || '',
      JSON.stringify(next.partnerLogos || []),
      JSON.stringify(featuredIds),
      next.announcementEnabled ? 1 : 0,
      next.announcementText || '',
      next.announcementLink || '',
      next.companyName,
      next.companyTagline,
      next.companyLogo || '',
      next.footerText,
      next.seoTitle,
      next.seoDescription,
    ]
  );
  const [rows] = await pool.execute(
    'SELECT * FROM site_settings WHERE site_id = ? LIMIT 1',
    ['main']
  );
  return mapRow(rows[0]);
}

module.exports = {
  ensureMainRow,
  updateMain,
};
