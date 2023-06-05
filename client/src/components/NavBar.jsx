import React, {useState, useContext, useEffect} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logofondo from '../assets/logofondo.png';
import styles from './NavBar.module.css';
import { useAuth } from '../context/AuthContext';

export default function NavBar(){

    const {user, logout, loading} = useAuth();

    console.log(user)

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <nav>
            <div className={styles.head_container}>
                <NavLink to='/'><img src={logofondo} alt=""/></NavLink>
                <div className={styles.login_container}>
                    {user ? (
                        <>
                            <div className={styles.user_data}>
                                <span className={styles.username}>{user.displayName || user.email }</span>
                                <button className={styles.logout_button} onClick={handleLogout}>Cerrar Sesión</button>
                            </div>
                        </>
                    ) : ( 
                        <>
                            <a><NavLink to={'/login'}>INGRESAR</NavLink></a>
                            <a><NavLink to={'/login'}>REGISTRARSE</NavLink></a>
                        </>
                    )
                    }

                </div>
            </div>
        </nav>
    );
}