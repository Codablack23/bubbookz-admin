import React, {createContext, ReactNode, useEffect, useReducer} from 'react'
import { authReducer } from './reducer';
const initialState = {
    isLoggedIn:false,
    user:null
}
export const AuthContext =  createContext<any>(initialState)
interface Props{
    children:JSX.Element | ReactNode
}

export default function AuthContextProvider(props:Props){
    const [authUser,dispatch] = useReducer(authReducer,initialState,()=>{
       if(typeof window !== "undefined"){
         const auth:any = window.localStorage.getItem("auth")
         if(typeof auth !== 'undefined'){
            return JSON.parse(auth)
         }
         else{
            return initialState
         }
       }
    });
    useEffect(()=>{
        if(authUser && authUser !== null){
            localStorage.setItem("auth",JSON.stringify(authUser))
        }
        else{
            localStorage.setItem("auth",JSON.stringify(initialState))
        }
        console.log(authUser)
    },[authUser])
    return(
     <AuthContext.Provider value={{state:authUser,dispatch}}>
        {props.children}
     </AuthContext.Provider>
    )
}