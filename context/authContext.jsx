import { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "../FirebaseConfig";
import {setDoc, getDoc, doc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext()


export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
                
            }else{
                setIsAuthenticated(false)
                setUser(null)
            }
        })

        return unsub
    },[onAuthStateChanged])

    const updateUserData = async(userId)=>{
        const docRef = doc(db, 'users',userId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            let data = docSnap.data()
            setUser({...user, username:data.username, profileUrl: data.profileUrl, userId:data.userId})
        }
    }

    const login = async(email, password)=>{
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            return {success:true}
        } catch (error) {
           let data = error.message
            if(data.includes('(auth/invalid-email)')) data= 'invalid credential'
            if(data.includes('(auth/invalid-credential)')) data= 'invalid credential'
            return {sucess:false, data} 
        }
    }

    const logout = async()=>{
        try {
            await signOut(auth)
            return {sucess:true}
            
        } catch (error) {
            return {success:false, data:error.message, error:error}
        }
    }

    const register = async(email,password,username, profileUrl)=>{
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, 'users', res?.user?.uid),{
                username,
                profileUrl,
                userId: res?.user?.uid
            })
            return {sucess:true, data: res?.user?.uid}
        } catch (error) {
            let data = error.message
            if(data.includes('(auth/invalid-email)')) data= 'invalid email'
            if(data.includes('(auth/email-already-in-use)')) data= 'email already registered'
            return {sucess:false, data}
            
        }
    }

    return(<AuthContext.Provider value={{login,logout,register,user, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const value = useContext(AuthContext)

    if(!value){
        throw new Error('useAuth not wrapped')
    }

    return value
}