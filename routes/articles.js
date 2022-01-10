import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
	res.render('blog');
});

export default router;
