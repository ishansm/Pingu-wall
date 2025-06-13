import dbConnect from '../../lib/mongodb';
import Haiku from '../../models/Haiku';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const haikus = await Haiku.find({}).sort({ createdAt: -1 });
      res.status(200).json(haikus);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch haikus' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { text, timestamp } = req.body;
      
      if (!text || !Array.isArray(text) || text.length !== 3) {
        return res.status(400).json({ error: 'Haiku must have exactly 3 lines' });
      }

      const haiku = await Haiku.create({ text, timestamp });
      res.status(201).json(haiku);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create haiku' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await Haiku.findByIdAndDelete(id);
      res.status(200).json({ message: 'Haiku deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete haiku' });
    }
  }
}