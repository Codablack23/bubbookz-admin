import { message, Spin } from "antd"
import Link from "next/link"
import React, { useContext, useState }  from "react"
import { AuthContext } from "~/contexts/authContext/AuthContext"
import Auth from "~/utils/Auth"
import { validateFields } from "~/utils/validator"

interface Errors{
  email?:string,
  password?:string,
  phone?:string,
  confirm_password?:string,
  firstname?:string,
  lastname?:string,
  [key:string]:any
}

export default function Register():JSX.Element{
  const {dispatch} = useContext(AuthContext)

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastName] = useState("")
  const [confirm_password,setConfirm] = useState("")

  const [errors,setErrors] = useState<Errors>({})
  const [isLoading,setIsLoading] = useState(false)
   const handleSubmit = async(e:any)=>{
     e.preventDefault()
     const fieldErrors = validateFields([
      {inputField:email,inputType:"email"},
      {inputField:password,inputType:"password"},
      {inputField:phone,inputType:"phone",inputName:"phone_number"},
      {inputField:firstname,inputType:"word",inputName:"firstname"},
      {inputField:lastname,inputType:"word",inputName:"lastname"},
      {inputField:confirm_password,inputType:"password",inputName:"confirm_password"}
     ])
     const errObj:Errors = {}
     fieldErrors.forEach(err=>{
      const errField:string = err.field as string
      errObj[errField] = err.error 
     })
     setErrors(errObj)
     if(fieldErrors.length == 0){
      if(password === confirm_password){
        setIsLoading(true)
        const response = await Auth.registerAdmin({
          email,
          password,
          phone,
          firstname,
          lastname
        })
        setIsLoading(false)
        console.log(response)
        if(response.status == "success"){
          dispatch({action:"LOGIN",user:{...response.admin}})
          message.success("You have successfully registered")
          setTimeout(()=>{
            window.location.assign("/dashboard")
          },3000)
        }else{
          message.error(response.error)
        }
      }else{
        message.error("Passwords Do not match")
      }

     }
   }
    return(
        <div className="w-full bub-container md:w-3/5 md:mx-auto lg:mr-0 lg:w-1/3 ml-auto">
        <header className="text-center">
          <h1 className="bub-font-a font-normal bub-txt-accent text-3xl">Welcome To Bubbookz</h1>
          <p className="bub-txt-choco-light my-3">Create an Account</p>
        </header>
        
        <form className="bg-white rounded mt-3 p-2 px-6 pb-8">
         <div>
           <label htmlFor="" className="block my-2 font-semibold">First Name</label>
           <input 
            type="text"
            className={`border ${errors.firstname?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
            value={firstname}
            onChange = {(e)=>setFirstname(e.target.value)}
            />
         </div>
         <p className="text-red-300">{errors.firstname}</p>
         <div>
           <label htmlFor="" className="block my-2 font-semibold">Last Name</label>
           <input 
           type="text" 
           className={`border ${errors.lastname?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
           value={lastname}
           onChange = {(e)=>setLastName(e.target.value)}
           />
         </div>
         <p className="text-red-300">{errors.lastname}</p>
         <div>
           <label htmlFor="" className="block my-2 font-semibold">Email</label>
           <input
            type="email"
            className={`border ${errors.email?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
           />
         </div>
         <p className="text-red-300">{errors.email}</p>
         <div>
           <label htmlFor="" className="block my-2 font-semibold">Phone Number</label>
           <input
            type="number"
            className={`border ${errors.phone_number?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`} 
            value={phone}
            onChange = {(e)=>setPhone(e.target.value)}
            />
         </div>
         <p className="text-red-300">{errors.phone_number}</p>
         <div>
           <label htmlFor="" className="block my-2 font-semibold">Password</label>
           <input
           type="password" 
           className={`border ${errors.password?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
           value={password}
           onChange = {(e)=>setPassword(e.target.value)}
           />
         </div>
         <p className="text-red-300">{errors.password}</p>
         <label htmlFor="" className="block my-2 font-semibold">Confirm Password</label>
         <input
          type="password"
          className={`border ${errors.confirm_password?"border-red-300 outline-none":"border-grey"} rounded p-2 w-full`}
          value={confirm_password}
          onChange = {(e)=>setConfirm(e.target.value)}
          />
             <p className="text-red-300">{errors.confirm_password}</p>
         <div className="flex justify-center my-5">
           {isLoading?
            <button className="bub-btn-primary px-6 py-2 bub-w-50 rounded" type="button"><Spin/></button>
           :<button className="bub-btn-primary px-6 py-2 bub-w-50 rounded" onClick={handleSubmit}>Create Account</button>}
         </div>
        </form>
        <div className="text-center mt-3">
        <p className="bub-txt-grey">
        <span className="text-sm">Already have an account </span>
        <Link href={"/"}>
            <a className="bub-txt-primary text-sm font-semibold">Login</a>
        </Link>
        </p>
        </div>
    </div>
    )
}