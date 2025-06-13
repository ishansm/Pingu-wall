import dbConnect from '../../lib/mongodb';
import { Code } from '../../models/Haiku';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      let codeDoc = await Code.findOne();
      if (!codeDoc) {
        // Create default if none exists
        codeDoc = await Code.create({ code: '' });
      }
      res.status(200).json({ code: codeDoc.code });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch code' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { code } = req.body;
      
      let codeDoc = await Code.findOne();
      if (codeDoc) {
        codeDoc.code = code;
        codeDoc.updatedAt = new Date();
        await codeDoc.save();
      } else {
        codeDoc = await Code.create({ code });
      }
      
      res.status(200).json({ code: codeDoc.code });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save code' });
    }
  }
}