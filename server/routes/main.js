import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simpleblog created with code...."
  }
  res.render('index', {locals});
});

router.get('/api/about', (req, res) => {
  res.render('about');
});

export default router;
