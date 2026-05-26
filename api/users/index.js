import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const db = require('../../src/data/db.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(db.users);
  } else if (req.method === 'POST') {
    const newUser = { ...req.body, id: Date.now() };
    res.status(201).json(newUser);
  } else {
    res.status(405).end();
  }
}
