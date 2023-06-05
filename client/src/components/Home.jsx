import React from 'react';
import NavBar from './NavBar';
import styles from './Home.module.css';
import imagen1 from '../assets/piernas-femeninas-perfectas-aisladas-sobre-fondo-blanco.jpg';
import icono1 from '../assets/bx-cheese.svg';
import icono2 from '../assets/bx-cycling.svg';
import icono3 from '../assets/bxs-plane-alt.svg';
import imagen2 from '../assets/mujer-atractiva-recibiendo-procedimientos-belleza-facial-salon-spa.jpg';
import imagen3 from '../assets/cosmetologa-aplicando-mascara-cara-cliente-salon-belleza.jpg';
import imagen4 from '../assets/depilacion-laser-terapia-depilacion (1).jpg';
import imagen5 from '../assets/depilacion-laser-terapia-depilacion (2).jpg';
import icono4 from '../assets/bxl-facebook.svg';
import icono5 from '../assets/bxl-instagram-alt.svg';
import icono6 from '../assets/bxl-twitter.svg';
import { Link } from 'react-router-dom';


export default function Home(){


    return(
        <>
        <NavBar />
        <section className={styles.landing}>
            <div className={styles.landing_container}>
                <div className={styles.reserva}>
                    <p>Ahora podes reservar tu turno online!</p>
                    
                        <Link to='/calendar'>RESERVÁ UN TURNO</Link>
                    
                </div>
                <div className={styles.mas_info}>
                    <p>Consultanos acerca de todos los tratamientos que tenemos disponibles.</p>
                    <a href="#contacto">MAS INFORMACIÓN</a>
                </div>
            </div>
        </section>
        <section className={styles.first_info}>
            <div className={styles.first_container}>
                <div className={styles.textos_first}>
                    <h1>TITULO</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla cupiditate voluptatibus dolorum voluptates natus culpa, accusantium quis molestiae quos aut repellat, laboriosam tempore voluptas error. Nihil ipsam cupiditate aspernatur facilis, blanditiis laboriosam autem hic vitae praesentium. Sapiente eveniet doloribus reiciendis nisi hic beatae, culpa odit?
                    </p>
                </div>
            <img src={imagen1} alt=""/>
        </div>
    </section>
    <section className={styles.icon_section}>
        <div className={styles.icon_container}>
            <div className={styles.iconcard}><img src={icono1} alt=""/><h3>TITULO</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
            <div className={styles.iconcard}><img src={icono2} alt=""/><h3>TITULO</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
            <div className={styles.iconcard}><img src={icono3} alt=""/><h3>TITULO</h3><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
        </div>
    </section>
    <section className={styles.slide_section}>
        <div className={styles.slide}>
            <ul>
                <li><img src={imagen2} alt=""/></li>
                <li><img src={imagen3} alt=""/></li>
                <li><img src={imagen4} alt=""/></li>
                <li><img src={imagen5} alt=""/></li>
            </ul>
        </div>
    </section>
    <section id="contacto" className={styles.contacto}>
        <div className={styles.contacto_container}>
            <h2 className={styles.titulo_formulario}>CONTACTO</h2>
            <form action="" className={styles.form}>
                <input className={styles.input} type="text" name="" id="" placeholder="Nombre"/>
                <input className={styles.input} type="email" name="" id="" placeholder="Email"/>
                <textarea className={styles.input} name="" id="" cols="30" rows="10" placeholder="Mensaje"></textarea>
                <input className={styles.input} type="submit" value="Enviar"/>
            </form>
        </div>
    </section>
    <footer className={styles.footer}>
        <div className={styles.footer_container}>
            <div className={styles.social}>
                <a href=""><img src={icono4} alt=""/></a>
                <a href=""><img src={icono5} alt=""/></a>
                <a href=""><img src={icono6} alt=""/></a>
            </div>
            <div className={styles.textos_footer}>
                <h3>Depilaser</h3>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    </footer>
        </>
    )
}