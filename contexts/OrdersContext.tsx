import { createContext, useState,useEffect, ReactNode } from "react";
import Book from "~/utils/Book";
import OrdersFunction from "~/utils/Order";

interface OrdersType{
    orders:any[],
    [key:string]:any
}
export const OrdersContext = createContext<OrdersType>({
    orders:[]
})

interface CompProps{
  children?:ReactNode | JSX.Element
}

export function OrdersContextProvider({children}:CompProps){
  const [orders,setOrders] = useState([])

  const getBooks = async ()=>{
    const response = await OrdersFunction.getOrders()
    console.log(response)
    if(response.status === "success"){
      setOrders(response.orders)
    }
}
  
  useEffect(() => {
    getBooks()
  }, [])
  return (
   <OrdersContext.Provider value={{orders}}>
     {children}
   </OrdersContext.Provider>
  ) 
}