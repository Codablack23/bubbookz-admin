import { useContext, useEffect, useState } from "react"
import { OrdersContext } from "~/contexts/OrdersContext"
import Auth from "~/utils/Auth"


export default function Overview():JSX.Element{
   const [users,setUsers] = useState<any[]>([])
   const {orders} = useContext(OrdersContext)
   const todaysRevenue  = orders.
   filter(orders=>{
     const today:any = new Date()
     const createdAt:any = new Date(orders.createdAt)
     return (today - createdAt) < 1
   })
   .reduce((a,b)=>a + (b.payment_status !== "paid"?0:b.payment_price),
  0)
 
  const getUsers = async()=>{
    const response = await Auth.getCustomers()
    console.log(response)
    if(response.status == "success"){
      setUsers(response.customers.filter((orders:any)=>{
        const today:any = new Date()
        const createdAt:any = new Date(orders.createdAt)
        return (today - createdAt) < 1
      }))
    }
  }
  useEffect(()=>{
    getUsers()
  },[])
   const revenue =  orders.reduce((a,b)=>a + (b.payment_status !== "paid"?0:b.payment_price),0)
    return(
        <header className="bub-grid-res">
       <div className="bg-white rounded-lg p-2 bub-min-vh-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Today&apos;s Revenue</p>
              <p className="font-bold text-lg">N{todaysRevenue}</p>
            </div>
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex justify-center items-center">
            <i className="bi bi-arrow-up-right text-blue-700 text-xl"></i>
            </div>
          </div>
          <p className="bub-txt-green">+34%</p>
       </div>
        <div className="bg-white rounded-lg p-2 bub-min-vh-10">
            
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-400">Today&apos;s Expenses</p>
               <p className="font-bold text-lg">N{todaysRevenue}</p>
             </div>
             <div className="w-10 h-10 bg-gray-400 rounded-lg flex justify-center items-center">
             <i className="bi bi-cash-stack text-xl"></i>
             </div>
           </div>
           <p className="bub-txt-green">+34%</p>
        </div>
        <div className="bg-white rounded-lg p-2 bub-min-vh-10">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-400">Today&apos;s Registered Accounts</p>
               <p className="font-bold text-lg">{users.length}</p>
             </div>
             <div className="w-10 h-10 bg-purple-300 rounded-lg flex justify-center items-center">
              <i className="bi bi-people text-xl text-purple-800"></i>
             </div>
           </div>
           <p className="bub-txt-green">+34%</p>
        </div>
        <div className="bg-white rounded-lg p-2 bub-min-vh-10">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-gray-400">Net Revenue</p>
               <p className="font-bold text-lg">N{revenue}
               </p>
             </div>
             <div className="w-10 h-10 bg-green-300 rounded-lg flex justify-center items-center">
             <i className="bi bi-wallet text-xl text-green-700"></i>
             </div>
           </div>
           <p className="bub-txt-green">+34%</p>
        </div>
       </header>
    )
}