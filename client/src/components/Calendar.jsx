import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { getTurnos } from '../actions';
import NavBar from './NavBar';
import moment from 'moment';
import 'moment/locale/es';
import styles from './Calendar.module.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import iconoIzq from '../assets/chevron-left-svgrepo-com.svg';
import iconoDer from '../assets/chevron-right-svgrepo-com.svg';
import iconoConfirmar from '../assets/confirmar.svg';
import iconoCancelar from '../assets/cancelar.svg';
import iconoAlert from '../assets/alert.svg';

export default function Calendar() {
   const dispatch = useDispatch();
   const turnos = useSelector((state) => state.turnos || []); 
   const [selectedDate, setSelectedDate ] = useState(moment()); 
   const [currentMonth, setCurrentMonth] = useState(moment());
   const [turnosDia, setTurnosDia] = useState([]);
   const [reserva, setReserva] = useState({turnoId:null, clienteId:null, fecha:null, hora:null});
   const [selectedTurnoIndex, setSelectedTurnoIndex] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [showConfirmation, setShowConfirmation] = useState(false);
   const { user } = useContext(AuthContext);

   moment.locale('es');
    
   const cells = generateDates(currentMonth);
   const navigate = useNavigate(); 
   const modalRef = useRef();

   useEffect(() => {
    const hoy = moment().format('YYYY-MM-DD');
    console.log(hoy);
    dispatch(getTurnos(hoy));
    handleCellClick(getTodayCellIndex());   
    console.log(reserva);
    console.log(turnosDia)

    function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
           setShowModal(false);
           navigate('/'); 
          }
     }

     document.addEventListener('mousedown', handleClickOutside);

     return () => {
        document.removeEventListener('mousedown', handleClickOutside);
     };
   }, []);

   function getTodayCellIndex(){
    const today = moment().startOf('day');
    return cells.findIndex((cell) => cell.date.isSame(today, 'day'));
   }

   function changeMonth(next = true) {
    if(next) {
        setCurrentMonth(currentMonth.clone().add(1, 'months'));
    } else {
        setCurrentMonth(currentMonth.clone().subtract(1, 'months'));
    }
   }

   function generateDates(monthToShow) {
    if(!moment.isMoment(monthToShow)) {
        return null;
    }
    let dateStart = moment(monthToShow).startOf('month');
    let dateEnd = moment(monthToShow).endOf('month');
    let cells = [];

    while(dateStart.day() !== 1) {
        dateStart.subtract(1, 'days');
    }

    while(dateEnd.day() !== 0) {
        dateEnd.add(1, 'days');
    }

    do{
        cells.push({
            date: moment(dateStart),
            inInCurrentMonth: dateStart.month() === monthToShow.month(),
            dayDate: dateStart.format('dddd D [de] MMMM')
        })
        dateStart.add(1, 'days');
    } while (dateStart.isSameOrBefore(dateEnd));

    return cells;
    }
    
    function handleCellClick(index) {
        const cell = cells[index];
        if (!cell || !cell.inInCurrentMonth) {
            return;
        }
        setSelectedDate(cell.date);
        const fechaSeleccionada = cell.date.format('YYYY-MM-DD');
        axios.get(`http://localhost:3001/calendar?fecha=${fechaSeleccionada}`)
            .then(response => {
                // Aquí maneja los datos recibidos de la API y los almacena en el estado o realiza alguna otra acción en consecuencia
                console.log(response.data);
                setTurnosDia(response.data);
            })
            .catch(error => {
                // Maneje cualquier error de la solicitud aquí
                console.log(error);
            });
    }

    function isTurnoDisponible(horario) {
    // Verificar si existe un turno con el horario especificado en turnosDia
    return turnosDia.some((turno) => turno.hour.slice(0, 5) === horario);
    }

    function selectTurno(horario, index) {
        const turnoIndex = turnosDia.findIndex((turno) => turno.hour === horario);
        if (turnoIndex !== -1) {
        setSelectedTurnoIndex(turnoIndex);
        setReserva({ turnoId: turnosDia[turnoIndex].id, clienteId: null, fecha: turnosDia[turnoIndex].date, hora: turnosDia[turnoIndex].hour });
        setShowModal(true);
        
        }
    }

    
    function handleReservarClick() {
        const userEmail = user.email;
        axios.get(`http://localhost:3001/client/email/${userEmail}`)
            .then(response => {
                const clienteId = response.data;
                setReserva(prevReserva => {
                    const updatedReserva = { ...prevReserva, clienteId };
                    axios.put('http://localhost:3001/calendar', updatedReserva)
                        .then(response => {
                            // Maneja la respuesta de la petición PUT aquí
                            console.log(response.data);
                            setShowConfirmation(true);
                        })
                        .catch(error => {
                            // Maneja cualquier error de la petición aquí
                            console.log('Error al reservar el turno, intentelo nuevamente.');
                        });
                        
                        return updatedReserva;
                        });
            })
            .catch(error => {
                console.log(error)
            })
        
    }


    function capitalize(string) {
        const words = string.split(' ');
        const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
            } else {
        const lowercaseWords = ['de', 'del', 'y']; // Agrega aquí otras palabras que deben permanecer en minúsculas
        if (lowercaseWords.includes(word.toLowerCase())) {
        return word.toLowerCase();
            } else {
        return word.charAt(0).toUpperCase() + word.slice(1);
            }
            }
        });
        return capitalizedWords.join(' ');
    }

    function closeConfirmation(){
        setShowConfirmation(false);
        navigate('/');
    }

    return(
        <>
            <NavBar />
            <section className={styles.turnero}>
                <div className={styles.fechas}>
                    <h2>1. Elegí una fecha</h2>
                    <div className={styles.calendar}>
                        <div className={styles['calendar-header']}>
                            <button type="button" className={`${styles.control}  ${styles['control--prev']}`} onClick={() => changeMonth(false)}><img src={iconoIzq} alt="" /></button>
                            <span>{currentMonth.format('MMMM YYYY')}</span>
                            <button type="button" className={`${styles.control} $styles'[control--next']`} onClick={() => changeMonth(true)}><img src={iconoDer} alt="" /></button>
                        </div>
                        <div className={styles['calendar-body']}>
                            <div className={styles.grid}>
                                <div className={styles['grid-header']}>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Lun</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Mar</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Mie</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Jue</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Vie</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Sáb</span>
                                    <span className={`styles.grid-cell styles.grid-cell-gh`}>Dom</span>
                                </div>
                                <div className={styles['grid-body']}>
                                    {
                                        cells.map((cell, index) => (
                                            <span 
                                                key={index} 
                                                // className={`styles.grid-cell styles.grid-cell--gd ${!cell.inInCurrentMonth ? 'styles.grid-cell--disabled' : ''} ${selectedDate&&selectedDate.isSame(cell.date, 'day') ? 'styles.grid-cell--selected' : '' }`}
                                                className={`${styles['grid-cell']} ${styles['grid-cell--gd']} ${!cell.inInCurrentMonth ? styles['grid-cell--disabled'] : ''} ${selectedDate&&selectedDate.isSame(cell.date, 'day') ? styles['grid-cell--selected'] : '' }`}
                                                onClick={() => handleCellClick(index)}     
                                            >
                                                {cell.date.date()}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.turnos}>
                    <h2>2. Selecciona un turno</h2>
                    <div className={`${styles['turnos-dia']}`}>
                        <span>{capitalize(selectedDate.format('dddd D [de] MMMM'))}</span>
                        <ul className={styles['lista-turnos']}>
                        {turnosDia.length === 0 ? (
                            <p><img src={iconoAlert} alt="" />No hay turnos disponibles en esta fecha</p>
                        ) : (turnosDia.map((turno, index) => (
                            <li
                            key={index}
                            onClick={() => selectTurno(turno.hour)}
                            className={`${styles['horario-turno']} ${
                            isTurnoDisponible(turno.hour) ? styles.disponible : ''
                            } ${selectedTurnoIndex === index ? styles.selected : ''}`}>
                                <div className={`${styles['turno-datos']}`}>
                                    {/* {selectedDate && (
                                    <>
                                    <span>{capitalize(selectedDate.format('dddd D [de] MMMM'))}</span>
                                    <span>&nbsp;</span>
                                    </>
                                    )} */}
                                    {turno.hour.slice(0, 5)}
                                </div>
                                {/* <div className={`${styles['btn-reserva']}`}>
                                    <a className={styles.reservar} onClick={handleReservarClick}>Reservar</a>
                                </div>     */}
                            </li>
                        )
                        ))} 
                        </ul>
                    </div>
               
               
                </div>

        </section>
        {showModal && (
            <div className={styles.modalContainer}>
                <div ref={modalRef} className={styles.modalContent}>
                    {/* Contenido del modal */}
                    {reserva && showConfirmation ? (
                        <>
                        <div className={styles.modalTitle}> 
                            <h3 >Turno Confirmado</h3>
                        </div>
                        <div className={styles.fechayhora}>
                            <p>{capitalize(moment(reserva.fecha).locale('es').format('dddd D [de] MMMM [de] YYYY'))}</p>
                            <p>{reserva.hora.slice(0, 5)}</p>
                        </div> 
                        <div className={styles.modalButtons}>
                            <button className={styles.aceptarbtn} onClick={closeConfirmation}><img src={iconoConfirmar} alt="" /><p>&nbsp;</p>Aceptar</button>
                        </div>
                        </>   
                    ) : (
                        <>
                        <div className={styles.modalTitle}>
                            <h3>¿Reservar turno?</h3>
                        </div>
                        <div className={styles.fechayhora}>
                            <p>{capitalize(moment(reserva.fecha).locale('es').format('dddd D [de] MMMM [de] YYYY'))}</p>
                            <p>{reserva.hora.slice(0, 5)}</p>
                        </div>
                        <div className={styles.modalButtons}>
                            <button className={styles.aceptarbtn} onClick={handleReservarClick}><img src={iconoConfirmar} alt="" /><p>&nbsp;</p>Confirmar Turno</button>
                            <button className={styles.cancelarbtn} onClick={() => setShowModal(false)}><img src={iconoCancelar} alt="" /><p>&nbsp;</p>Cancelar</button>
                        </div>
                        </>)}
                </div>
            </div>
        )}
                   
    </>
    )
}
                           
                                


