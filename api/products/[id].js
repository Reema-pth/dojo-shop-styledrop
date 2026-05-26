import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const db = require('../../src/data/db.json');

export default function handler(req, res) {
  const { id } = req.query;
  const product = db.products.find(p => String(p.id) === String(id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(product);
}
