import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "./Alert";
import logofondo from '../assets/logofondo.png';
import { postClientFromRegister } from "../actions";

export function Register(){

    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: ''
    })

    const {signup} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();
    

    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value});

    }

 
    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await signup(user.email, user.password);
            dispatch(postClientFromRegister(user));
            navigate('/');
        } catch (error) {
            // if(error.code === "auth/invalid-email")
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
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input type="name" name="name" placeholder="Your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="e-mail" name="email" placeholder="youremail@company.com" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="*******" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
                    </div>
                    
                    <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>

                </form>
                <p className="my-4 text-sm flex justify-between px-3">Already have an Account? <Link to='/login'>Login</Link></p>
            </div>
       </div>
    )
}
