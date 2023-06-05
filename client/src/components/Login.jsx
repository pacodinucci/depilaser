import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "./Alert";
import logofondo from '../assets/logofondo.png';
import axios from "axios";


export function Login(){

    const [user, setUser] = useState({
        email: '',
        password: '',
        name:''
    })

    const {login, loginWithGoogle, resetPassword} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});

    }
 
    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await login(user.email, user.password);
            navigate('/');
        } catch (error) {
            // if(error.code === "auth/invalid-email")
            setError(error.message);
            
        }
    }

    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle()
                .then(userCredential => {
                    const usuario = {
                        name: userCredential.user.displayName,
                        email: userCredential.user.email
                    };
                    axios.post('http://localhost:3001/client', usuario);
                    })
                    navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }
   

    const handleResetPassword = async () => {
        if(!user.email) return setError('Please, enter your e-mail');
        
        try {
            await resetPassword(user.email);
            setError('We sent you an email with a link to reset your password');
        } catch (error) {
            setError(error.message);
        }
    }

    return(
        <div className="bg-image h-screen text-black flex">
            <div className="w-full max-w-xs m-auto">
            <div className="mb-4 text-center flex justify-center">
                <img className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" src={logofondo} alt=""/>
            </div>
                {error &&<Alert message={error} />}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="e-mail" name="email" id="email" placeholder="youremail@company.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="*******" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={handleResetPassword}>Forgot password?</a>
                    </div>
                </form>
                    <p className="my-4 text-sm flex justify-between px-3">Don't have an Account? <Link to='/register'>Register</Link></p>
                    <button className="bg-slate-50 hover:bg-slate-200 text-black text-sm font-bold shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full" onClick={handleGoogleSignin}>Login with Google</button>
            </div>
        </div>
    )
}
        
