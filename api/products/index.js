import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const db = require('../../src/data/db.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(db.products);
  } else {
    res.status(405).end();
  }
}
