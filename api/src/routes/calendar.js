const { Router } = require('express');
const { postTurno, updateTurno, getTurnosPorFecha } = require('../controllers');

const router = Router();

router.get('/calendar', getTurnosPorFecha);
router.post('/calendar', postTurno);
router.put('/calendar', updateTurno);

module.exports = router;