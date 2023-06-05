const { Router } = require('express');
const { postTratamiento, getTratamientos } = require('../controllers');

const router = Router();

router.get('/treat', getTratamientos);
router.post('/treat', postTratamiento);

module.exports = router;