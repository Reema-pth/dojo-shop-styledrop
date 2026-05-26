import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const db = require('../../src/data/db.json');

export default function handler(req, res) {
  const { id } = req.query;
  const user = db.users.find(u => String(u.id) === String(id));
  if (req.method === 'GET') {
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    res.status(200).json({ ...user, ...req.body, id: parseInt(id) });
  } else {
    res.status(405).end();
  }
}
