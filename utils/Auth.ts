import axios from "axios";
function getEnv(){
    return {
        env:process.env.NEXT_PUBLIC_API,
        api:process.env.NEXT_PUBLIC_API,
    }
}
interface UserData{
    email:string,
    password:string,
}
interface RegisterData extends UserData{
   firstname:string,
   lastname:string,
   phone:string | number

}
interface Response{
    status:string,
    error?:string,
    [key:string]:any
}

class Auth{
    private api = getEnv().env === "production"?getEnv().api:"https://localhost:5505";
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async loginAdmin(data:UserData):Promise<Response>{
       return await axios.post(`${this.api}/admin/login`,data,this.config)
       .then((res)=>{
        return {
            ...res.data
        }
       })
       .catch((err)=>{
        return {
            status:"network error",
            error:"connection could not be established",
            axios_err:err
        }
       })
    }
    async registerAdmin(data:RegisterData):Promise<Response>{
        return await axios.post(`${this.api}/admin/signup`,data,this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
             status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     }
     async logoutAdmin():Promise<Response>{
        return await axios.post(`${this.api}/admin/logout`,{},this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
            status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     }
     async authenticate():Promise<Response>{
        return await axios.post(`${this.api}/admin/`,{},this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
            status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     } 
     async getCustomers():Promise<Response>{
        return await axios.post(`${this.api}/admin/customers`,{},this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
            status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     } 
     async changePassword(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/change-password`,data,this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
            status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     } 
     async updateDetails(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/update-profile`,data,this.config)
        .then((res)=>{
         return {
             ...res.data
         }
        })
        .catch((err)=>{
         return {
            status:"network error",
             error:"connection could not be established",
             axios_err:err
         }
        })
     } 
}

export default new Auth()