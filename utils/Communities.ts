import axios from "axios";

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
function getEnv(){
    return {
        env:process.env.NEXT_PUBLIC_API,
        api:process.env.NEXT_PUBLIC_API,
    }
}
class CommFunctions{
    private api = getEnv().env === "production"?getEnv().api:"https://localhost:5505";
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async getCommunities():Promise<Response>{
       return await axios.get(`${this.api}/communities`,this.config)
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
    async getCommunity(id:string):Promise<Response>{
        return await axios.get(`${this.api}/communities/${id}`,this.config)
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
     async updateCommunityStatus(id:string,data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/update-community/${id}`,data,this.config)
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

export default new CommFunctions()