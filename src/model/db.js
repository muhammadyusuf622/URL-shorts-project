const pool = require("../config/db.config");

async function createTables() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS urls (
                id SERIAL PRIMARY KEY,
                original_url TEXT NOT NULL,
                code VARCHAR(10) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                viewers_count INTEGER DEFAULT 0,
                user_id INTEGER NOT NULL 
                REFERENCES users(id)
                ON DELETE CASCADE 
                ON UPDATE NO ACTION
            );
            `);

    return "Database'da jadvallar yaratildi ✅";
  } catch (err) {
    throw new Error("Jadval yaratishda xatolik⚠️");
  }
}

module.exports = createTables;
