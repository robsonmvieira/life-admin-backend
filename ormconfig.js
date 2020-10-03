module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/modules/**/models/*.ts"
  ],
  "migrations": [
    "./dist/infra/data/migrations/*.ts"
  ],
  "cli": { "migrationsDir": "./src/infra/data/migrations" }
}

