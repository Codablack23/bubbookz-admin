import { message, Spin, Switch } from "antd"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "~/contexts/authContext/AuthContext"
import Auth from "~/utils/Auth"
import { validateFields } from "~/utils/validator"


function Notification(props:{title:string,desc:string}){
    const [isChecked,setIsChecked] = useState(false)
    return(
        <div className="w-full p-2 border border-gray-300 flex items-center rounded-lg justify-between my-2">
            <div className="w-5/6">
                <p className="font-bold">{props.title}</p>
                <p className="text-sm">{props.desc}</p>
            </div>
            <Switch checked={isChecked} onClick={()=>setIsChecked(prev=>!prev)} className={`${isChecked && "bub-bg-primary"}`}/>
        </div>
    )
}
interface ErrCheck{

}

interface ErrCheck{
    error?:string,
    field?:string,
    message?:string
}
interface Details {
    firstname?:string,
    lastname?:string,
    recieved_email?:string,
    phone_no?:string|number,
    profile_picture?:string,
    location?:string,
    address?:string,
    [key:string]:any
}
export function DetailsForm(){
  const {state,dispatch} = useContext(AuthContext)
  const {user} = state
  const [errors,setErrors] = useState<Details>({})
  const [isLoading,setIsLoading] = useState(false)
  const [details,setDetails] = useState<Details>({
    firstname:"",
    lastname:"",
    recieved_email:"",
    phone_no:"",
    profile_picture:"",
    location:"",
    address:""
  })

  function handleInput(e:any){
     setDetails(prev=>{
        const current = {...prev}
        const key:string = e.target?.id as string
        current[key] = e.target.value
        return current
     })
  }
  async function handleSave(e:any){
   e.preventDefault()
   const fieldErrors:ErrCheck[] = validateFields([
    {inputField:(details.firstname as string),inputType:"text",inputName:"Firstname"},
    {inputField:(details.lastname as string),inputType:"text",inputName:"Lastname"},
    {inputField:(details.recieved_email as string),inputType:"email",inputName:"Recieved_Email"},
    {inputField:(details.location as string),inputType:"address",inputName:"Location"},
    {inputField:(details.address as string),inputType:"address",inputName:"Address"},
    {inputField:(details.phone_no as string),inputType:"phone",inputName:"Phone_No"},
   ])
   
   const errObj:Details ={}
   fieldErrors.forEach(err=>{
    errObj[err.field as string] = err.error
   })
   setErrors(errObj)
   if(fieldErrors.length === 0){
      setIsLoading(true)
      const response = await Auth.updateDetails(details)
      setIsLoading(false)
      if(response.status == "success"){
         dispatch({type:"LOGIN",data:{
            admin:{...details}
         }})
         message.success("Profile Updated Successfully")

      }else{
        message.error(response.error)
      }
   }
  }
  useEffect(()=>{
    setDetails({
            ...state.user,
            recieved_email:state.user.email,
            location:state.user.location === null?"":state.user.location,
            address:state.user.address === null?"":state.user.address
        }
      )
  },[state])
  return(
    <form action="">
    <div className="bub__input-container mb-4 bub-w-95 mx-auto">
        <label className="font-bold block mb-1">First Name</label>
        <input 
        type="text" 
        value={details.firstname}
        id="firstname"
        onChange={handleInput}
        className="border rounded outline-none block p-1 w-full border-gray-400" 
        />
        <p className="text-red-500">{errors.firstname}</p>
     </div>
     <div className="bub__input-container mb-4  bub-w-95 mx-auto">
        <label className="font-bold block mb-1">Last Name</label>
        <input 
        type="text" 
        value={details.lastname}
        id="lastname"
        onChange={handleInput}
        className="border rounded outline-none block p-1 w-full border-gray-400"
         />
         <p className="text-red-500">{errors.lastname}</p>
     </div>
     <div className="bub__input-container mb-4 bub-w-95 mx-auto">
        <label className="font-bold block mb-1">Phone No</label>
        <input 
        type="text" 
        id="phone_no"
        onChange={handleInput}
        value={details.phone_no}
        className="border rounded outline-none block p-1 w-full border-gray-400" 
        />
        <p className="text-red-500">{errors.phone_no?.toString().replace("phone_no","Phone Number")}</p>
     </div>
     <div className="bub__input-container mb-4 bub-w-95 mx-auto">
        <label className="font-bold block mb-1">Email</label>
        <input 
        type="text" 
        value={details.recieved_email}
        id="recieved_email"
        onChange={handleInput}
        className="border rounded outline-none block p-1 w-full border-gray-400"
        />
        <p className="text-red-500">{errors.recieved_email?.replace("recieved_",'')}</p>
     </div>
     <div className="bub__input-container mb-4 bub-w-95 mx-auto">
        <label className="font-bold block mb-1">Location</label>
        <input 
        type="location" 
        id="location"
        onChange={handleInput}
        value={details.location === null?"":details.location}
        className="border rounded outline-none block p-1 w-full border-gray-400" 
        />
        <p className="text-red-500">{errors.location}</p>
     </div>
     <div className="bub__input-container mb-4 bub-w-95 mx-auto">
        <label className="font-bold block mb-1">Address</label>
        <input 
        type="text" 
        value={details.address === null ?"":details.address}
        id="address"
        onChange={handleInput}
        className="border rounded outline-none block p-1 w-full border-gray-400" 
        />
        <p className="text-red-500">{errors.address}</p>
     </div>
     <div className="bub-w-95 mx-auto">
     {isLoading?
      <button type="button" className="px-4 py-2 bub-bg-primary bub-card rounded-lg bub-w-100 mx-auto">
        <Spin/>
      </button>
     :<button className="px-4 py-2 bub-bg-primary bub-card rounded-lg bub-w-100 mx-auto"
      onClick={handleSave}
      >Save</button>
     }
     </div>
    </form>
  )
}

interface Passwords{
    new_password?:string,
    current_password?:string,
    confirm_password?:string,
    [key:string]:any
}
export function PasswordForm(){
    const [isLoading,setIsLoading] = useState(false)
    const [passwords,setPasswords] = useState<Passwords>({
        new_password:"",
        current_password:"",
        confirm_password:""
    })
    const [errors,setErrors] = useState<Passwords>({})
    function handleInput(e:any){
        setPasswords(prev=>{
            const current:Passwords = {...prev}
            const key:string = e.target?.id as string
            current[key] = e.target?.value
            return current
         })
    }
    async function changePassword(e:any){
      e.preventDefault()
      const fieldErrors = validateFields([
        {inputField:passwords.current_password as string,inputType:"password",inputName:"Password"},
        {inputField:passwords.new_password as string,inputType:"password",inputName:"New_Password"},
        {inputField:passwords.confirm_password as string,inputType:"password",inputName:"Confirm_Password"},
      ])
      const errObj:Passwords={}
      fieldErrors.forEach(err=>{
        const key:string = err.field as string
        errObj[key] = err.error
      })

      setErrors(errObj)
      if(fieldErrors.length == 0){
         if(passwords.new_password !== passwords.confirm_password){
            message.error("Confirm Password and New Password Do not match")
         }else{
            setIsLoading(true)
            const response = await Auth.changePassword(passwords)
            setIsLoading(false)
            if(response.status == "success"){
                message.success("password changed successfully")
            }
            else{
                message.error(response.error)
            }
         }
      }
    }
    return(
        <form action="">
            <div className="bub__input-container mb-4 bub-w-95 mx-auto">
                <label className="font-bold block mb-1">Current Password</label>
                <input 
                type="password" 
                className="border rounded outline-none block p-1 w-full border-gray-400" 
                id="current_password"
                value={passwords.current_password}
                onChange={handleInput}
                />
                <p className="text-red-500">{errors.password?.replace("_"," ")}</p>
            </div>
            <div className="bub__input-container mb-4  bub-w-95 mx-auto">
                <label className="font-bold block mb-1">New Password</label>
                <input 
                type="password" 
                id="new_password"
                className="border rounded outline-none block p-1 w-full border-gray-400"
                value={passwords.new_password}
                onChange={handleInput}
                />
                 <p className="text-red-500">{errors.new_password?.replace("_"," ")}</p>
            </div>
            <div className="bub__input-container mb-4 bub-w-95 mx-auto">
                <label className="font-bold block mb-1">Confirm Password</label>
                <input 
                type="password" 
                id="confirm_password"
                className="border rounded outline-none block p-1 w-full border-gray-400"
                value={passwords.confirm_password}
                onChange={handleInput}
                />
                 <p className="text-red-500">{errors.confirm_password?.replace("_"," ")}</p>
            </div>
            <div className="bub-w-95 mx-auto">
             {isLoading?
             <button type="button" className="px-4 py-2 bub-bg-primary bub-card rounded-lg bub-w-100 mx-auto">
                <Spin/>
             </button>
             :<button 
             className="px-4 py-2 bub-bg-primary bub-card rounded-lg bub-w-100 mx-auto"
             onClick={changePassword}
             >Update Password</button>
             }
            </div>
        </form>   
    )
}

export function NotificationForm(){
   return(
    <div className="border border-gray-300 bub-min-vh-30 rounded-lg p-2 py-3 my-3">
    <h3>Notifications</h3>
    <Notification title="Email Notification" desc={"Notify me through my email"} />
    <Notification title="Order Pending" desc={"Notify me when a new order comes in"} />
    <Notification title="Events" desc={"Notify me when someone registers for an event"}/>
    <Notification title="Messages" desc={"Notify me when  there is a review,comment,message, etc"}/>
   </div>
   )
}