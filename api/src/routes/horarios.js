const { Router } = require('express');
const { getHorarios } = require('../controllers');

const router = Router();

router.get('/horarios', getHorarios);


module.exports = router;