const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const calendar = require('./calendar');
const client = require('./client');
const treats = require('./treats');
// const staff = require('./staff');
const horarios = require('./horarios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', calendar);
router.use('/', client);
router.use('/', treats);
// router.use('/', staff);
router.use('/', horarios);



module.exports = router;