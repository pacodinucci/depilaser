const { Clientes, Turnos, Tratamientos, Staff, Horarios } = require('../db');
const moment = require('moment');
const { horaTurno } = require('../mock');


const postCliente = async (req, res) => {
    try{
        const { name, email, status } = req.body;
        const clienteExistente = await Clientes.findOne({ where: {email: email}});
        if(!clienteExistente){
            // return res.status(404).json({ msg: 'El email ingresado ya existe'});
            let nuevoCliente = await Clientes.create({
                name: name,
                email: email,
                status: status
        })
        }
        
        res.json({msg : 'Cliente creado.'});
    } catch (error){
        res.status(400).send({ error: error.message })
    }
    
};

const getClientes = async (req, res) => {
    try{
        const listaClientes = await Clientes.findAll();
        res.json(listaClientes);
    } catch(error){
        res.status(404).send({ error: error.message });
    }
}

const getClienteId = async (req, res) => {
    try {
        const { email } = req.params;
    
        // Lógica para buscar el cliente en base a su correo electrónico
        const cliente = await Clientes.findOne({ where: { email } });
    
        if (cliente) {
          // Cliente encontrado
          res.json(cliente.id);
        } else {
          // Cliente no encontrado
          res.status(404).json({ error: 'Cliente no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


// const postTratamiento = async (req, res) => {
//     try {
//         const { name, disponibility, status } = req.body;
//         const nuevosTurnos = [];
//         moment.locale('es'); // Configurar moment.js para interpretar días en español
//         const fechaInicio = moment().startOf('day'); // Establecer la fecha de inicio al miércoles de la semana actual

//         // Buscar los registros correspondientes en la tabla Horarios
//         const horarios = await Horarios.findAll({
//             where: {
//                 id: disponibility
//             }
//         });
        
//         for (let i = 0; i < 28; i++) { // Generar turnos para las próximas 4 semanas
//             const dia = fechaInicio.clone().add(i, 'days').format('dddd');
//             for (const horario of horarios) {
//                 if (horario.dia === dia) { // Verificar si el día del horario coincide con el día actual
//                     const fecha = fechaInicio.clone().add(i, 'days').format('YYYY-MM-DD');
//                     const nuevoTurno = {
//                         fecha: fecha,
//                         hora: horario.hora,
//                         dia: dia // Agregar el nombre del día al objeto turno
//                     };
//                     nuevosTurnos.push(nuevoTurno);
//                 }
//             }
//         }

//         let nuevoTratamiento = await Tratamientos.create({
//             name: name,
//             disponibility: nuevosTurnos,
//             status: status
//         })
//         res.json({ msg: 'Tratamiento creado.'})
//     } catch(error) {
//         res.status(400).send({ message: error.message });
//     }
// }

const postTratamiento = async (req, res) => {
    try {
        const { name, disponibility } = req.body;
        const nuevosTurnos = [];
        moment.locale('es'); // Configurar moment.js para interpretar días en español
        const fechaInicio = moment().startOf('day'); // Establecer la fecha de inicio al miércoles de la semana actual

        // Buscar los registros correspondientes en la tabla Horarios
        const horarios = await Horarios.findAll({
            where: {
                id: disponibility
            }
        });
        
        for (let i = 0; i < 28; i++) { // Generar turnos para las próximas 4 semanas
            const dia = fechaInicio.clone().add(i, 'days').format('dddd');
            for (const horario of horarios) {
                if (horario.dia === dia) { // Verificar si el día del horario coincide con el día actual
                    const fecha = fechaInicio.clone().add(i, 'days');
                    const nuevoTurno = {
                        fecha: fecha,
                        hora: horario.hora,
                        dia: dia // Agregar el nombre del día al objeto turno
                    };
                    nuevosTurnos.push(nuevoTurno);
                }
            }
        }

        let nuevoTratamiento = await Tratamientos.create({
            name: name,
            disponibility: nuevosTurnos
        });
        
        // Crear los turnos para el tratamiento creado
        for(const turno of nuevoTratamiento.dataValues.disponibility){
            const { fecha, hora, dia } = turno;
            const turnoCreado = await Turnos.create({
                treat: nuevoTratamiento.dataValues.name,
                date: fecha,
                hour: hora,
                day: dia
            })
        }

        res.json({ msg: 'Tratamiento creado.'})
    } catch(error) {
        res.status(400).send({ message: error.message });
    }
};


const getTratamientos = async (req, res) => {
    try{
        const listaTratamientos = await Tratamientos.findAll();
        res.json(listaTratamientos);
    } catch(error){
        res.status(404).send({ error: error.message });
    }
}


const postTurno = async (req, res) => {
    try {
      // Buscar todos los tratamientos activos
      const tratamientos = await Tratamientos.findAll({ 
        where: { status: 1 },
        attributes: [ 'id', 'name', 'disponibility' ],
        raw: true
       });
        console.log(tratamientos)
        for (const tratamiento of tratamientos) {
        const { id, name, disponibility } = tratamiento; 

        for(const turno of disponibility) {
            const { fecha, hora, dia } = turno;
            await Turnos.findOrCreate({
                treat: name,
                date: fecha,
                hour: hora,
                day: dia
            },)
        }
      }
        res.json('Turnos cargados exitosamente.');
  
    } catch (error) {
        res.status(404).send({ error: error.message })
    }
};

const getHorarios = async (req, res) => {
    try{
        for (const h of horaTurno) {
            await Horarios.create({
                id: h.id,
                dia: h.dia,
                hora: h.hora
            });
        }
        const horariosCargados = await Horarios.findAll();
        res.json(horariosCargados);
    } catch(error){
        res.status(404).send({ error: error.message });
    }
}

const updateTurno = async (req, res) => {
    const { turnoId, clienteId } = req.body;
    try {
        const turno = await Turnos.findByPk(turnoId);
        const cliente = await Clientes.findOne({where: {id: clienteId}});
        if(turno.dataValues.status === 'Ocupado') return res.status(404).json({ msg: 'Turno no disponible' });
        await turno.setCliente(cliente);
        await Turnos.update({ status: 'Ocupado'},{where: {id: turnoId}});
        await turno.save();
        res.json('Turno reservado!');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  };

const getTurnosPorFecha = async (req, res) => {
    const { fecha } = req.query;
    try{
        const turnosDia = await Turnos.findAll(
            { where: { date: fecha, status: 'Disponible' }}
        )
        res.status(200).json(turnosDia);
    } catch(error){
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    postCliente,
    postTratamiento,
    postTurno,
    getHorarios,
    updateTurno, 
    getClientes,
    getTratamientos,
    getTurnosPorFecha,
    getClienteId
};