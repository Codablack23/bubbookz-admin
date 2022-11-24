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

class Events{
    private api = getEnv().env === "production"?getEnv().api:"https://localhost:5505";
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async getEvents():Promise<Response>{
       return await axios.get(`${this.api}/events`,this.config)
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
    async getEvent(id:string):Promise<Response>{
        return await axios.get(`${this.api}/events/${id}`,this.config)
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
     async addEvent(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/add-event`,data,this.config)
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
     async editEvent(id:string,data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/edit-event/${id}`,data,this.config)
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

export default new Events()