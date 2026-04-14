import express from 'express';
const router = express.Router();

/* GET home page. */
import path from 'path';
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default router;
