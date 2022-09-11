
export const authReducer = (state:any,action:{type:string,data?:any}) =>{
   switch (action.type) {
    case "LOGIN":
        console.log(action)
       return {isLoggedIn:true,user:{...action.data.admin}}
    case "LOGOUT":
      return{
         isLoggedIn:false,
         user:null
      }
    break
    default:
        return state
   }
}