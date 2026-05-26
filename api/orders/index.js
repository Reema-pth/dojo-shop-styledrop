import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const db = require('../../src/data/db.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(db.orders);
  } else if (req.method === 'POST') {
    const newOrder = {
      ...req.body,
      id: Date.now(),
      orderStatus: 'Processing',
      orderDate: new Date().toISOString(),
    };
    res.status(201).json(newOrder);
  } else {
    res.status(405).end();
  }
}
