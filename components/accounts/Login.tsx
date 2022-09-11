import { message, Spin } from "antd"
import Link from "next/link"
import React, { useContext, useState }  from "react"
import { AuthContext } from "~/contexts/authContext/AuthContext"
import Auth from "~/utils/Auth"
import { validateFields } from "~/utils/validator"

interface Errors{
  email?:string,
  password?:string,
  [key:string]:any
}

export default function Login():JSX.Element{
  const {dispatch} = useContext(AuthContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errors,setErrors] = useState<Errors>({})
  const [isLoading,setIsLoading] = useState(false)
   const handleSubmit = async(e:any)=>{
     e.preventDefault()
     const fieldErrors = validateFields([
      {inputField:email,inputType:"email"},
      {inputField:password,inputType:"password"}
     ])
     const errObj:Errors = {}
     fieldErrors.forEach(err=>{
      const errField:string = err.field as string
      errObj[errField] = err.error 
     })
     setErrors(errObj)
     if(fieldErrors.length == 0){
      setIsLoading(true)
      const response = await Auth.loginAdmin({email,password})
      setIsLoading(false)
      if(response.status == "success"){
        dispatch({type:"LOGIN",data:{admin:{...response.admin}}})
        window.location.assign("/dashboard")
      }else{
        message.error(response.error)
      }
     }
   }
    return(
        <div className="w-full bub-container md:w-3/5 md:mx-auto lg:mr-0 lg:w-1/3 ml-auto">
            <header className="text-center">
              <h1 className="bub-font-a font-normal bub-txt-accent text-3xl">Welcome Back!</h1>
              <p className="bub-txt-choco-light my-3">LOGIN HERE</p>
            </header>
            
            <form className="bg-white rounded mt-5 p-2 px-6 pb-8">
             <div>
               <label htmlFor="" className="block my-4 font-semibold">Email</label>
               <input 
                type="email"
                className={`border ${errors.email?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
                name="" 
                id="" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
             </div>
             <p className="text-red-300">{errors.email}</p>
             <label htmlFor="" className="block my-4 font-semibold">Password</label>
             <input 
             type="password"
              name="" 
              id=""
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               className={`border ${errors.password?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}/>

              <p className="text-red-300">{errors.password}</p>
             <div className="flex justify-between my-3">
                <div className="flex">
                    <input type="checkbox" name="" className="border border-grey" id="" />
                    <p className="text-sm ml-2">Remember Me</p>
                </div>
               <Link href={"/"}>
                <a className="bub-txt-primary text-sm">Forgot Password?</a>
               </Link>
             </div>
             <div className="flex justify-center my-5">
               {isLoading?
                <button type="button" className="bub-btn-primary px-6 py-2 bub-w-50 rounded"><Spin/></button>
               :<button onClick={handleSubmit} className="bub-btn-primary px-6 py-2 bub-w-50 rounded outline-none">Login</button>}
             </div>
            </form>
            <div className="text-center mt-3">
            <Link href={"/register"}>
                <a className="bub-txt-primary text-sm font-semibold">Create Account</a>
            </Link>
            </div>
        </div>
    
    )
}