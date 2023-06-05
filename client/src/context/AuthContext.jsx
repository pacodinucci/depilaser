import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

    const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);


    useEffect(() => {
       const unsuscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsuscribe();
    }, [])
    
    
    return (
        <AuthContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}