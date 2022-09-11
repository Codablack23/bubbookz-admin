import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import { useEffect, useState } from "react";
import { OrdersList } from "~/data/interfaces";
import  OrdersFunction  from "~/utils/Order";

export default function OrdersHomePage(){
  const [orders,setData] = useState<OrdersList[]>([])
  const [delivered,pending,progress,cancelled] = [
    orders.filter(order=>(order.status == "delivered")),
    orders.filter(order=>(order.status == "pending")),
    orders.filter(order=>(order.status == "in progress")),
    orders.filter(order=>(order.status == "cancelled"))
  ]
  const total = delivered.length + pending.length + progress.length + cancelled.length

  async function getOrders(){
    const response = await OrdersFunction.getOrders()
    console.log(response)
    if(response.status == "success"){
      setData(response.orders)
    }
  }
  const  getPercent = (value:number,total:number)=> (((value/total) * 100).toFixed(2))

  useEffect(()=>{
    getOrders()
  },[])

    return(
        <DashboardLayout pageTitle="Orders" currentPage="orders">
           <div className="">
             <h3 className="font-bold text-2xl">Orders</h3>
             <div className="bub-grid-res  my-4">
                <div className="p-2 px-4 rounded-lg bg-white">
                  <p className="text-gray-400">Delivered Orders</p>
                  <p className="font-bold my-1 text-lg">{delivered.length}</p>
                  <p className="text-green-900 text-sm">{getPercent(delivered.length,total)}%</p>
                </div>
                <div className="p-2 px-4 rounded-lg bg-white">
                  <p className="text-gray-400">Pending Orders</p>
                  <p className="font-bold my-1 text-lg">{pending.length}</p>
                  <p className="text-blue-900 text-sm">{getPercent(pending.length,total)}%</p>
                </div>
                <div className="p-2 px-4 rounded-lg bg-white">
                  <p className="text-gray-400">Orders in progress</p>
                  <p className="font-bold my-1 text-lg">{progress.length}</p>
                  <p className="text-green-900 text-sm">{getPercent(progress.length,total)}%</p>
                </div>
                <div className="p-2 px-4 rounded-lg bg-white">
                  <p className="text-gray-400">Cancelled Orders</p>
                  <p className="font-bold my-1 text-lg">{cancelled.length}</p>
                  <p className="text-red-900 text-sm">{getPercent(cancelled.length,total)}%</p>
                </div>
             </div>
             <OrdersTable orders={orders}/>
           </div>
        </DashboardLayout>
    )
}