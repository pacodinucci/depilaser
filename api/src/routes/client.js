const { Router } = require('express');
const { postCliente, getClientes, getClienteId } = require('../controllers');

const router = Router();

router.get('/client', getClientes);
router.post('/client', postCliente);
router.get('/client/email/:email', getClienteId);

module.exports = router;