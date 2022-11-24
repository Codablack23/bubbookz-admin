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
class Categories{
    private api =getEnv().env === "production"?getEnv().api:"https://localhost:5505";
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async getCategories():Promise<Response>{
       return await axios.post(`${this.api}/admin/categories`,{},this.config)
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
    async addDepartment(id:string,data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/add-department/${id}`,data,this.config)
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
    async addSchool(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/add-school`,data,this.config)
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
     async addFaculty(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/add-faculty`,data,this.config)
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

export default new Categories()