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

class OrdersFunction{
    private api = getEnv().api;
    private config = {
        headers: {"Access-Control-Allow-Origin": "Set-Cookie"},
        withCredentials:true,
    }
    async getOrders():Promise<Response>{
       return await axios.post(`${this.api}/admin/orders`,{},this.config)
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
    async getOrder(id:string):Promise<Response>{
        return await axios.post(`${this.api}/admin/orders/${id}`,{},this.config)
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
     
     async updateOrder(id:string,data:any):Promise<Response>{
        return await axios.post(`${this.api}/admin/order/update/${id}`,data,this.config)
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

export default new OrdersFunction()