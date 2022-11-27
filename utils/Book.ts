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

class BookFunction{
    private api = getEnv().env == "production"?getEnv().api:"http://localhost:5505";
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async getBooks():Promise<Response>{
       return await axios.get(`${this.api}/books`,this.config)
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
    async getBook(id:string):Promise<Response>{
        return await axios.get(`${this.api}/books/${id}`,this.config)
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
     async addBook(data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/add-book`,data,this.config)
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
     async editBook(id:string,data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/edit-book/${id}`,data,this.config)
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

export default new BookFunction()