import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import { useEffect, useState } from "react";
import { OrdersList } from "~/data/interfaces";
import  OrdersFunction  from "~/utils/Order";

interface OrderDetail{
  orderType:string,
  amount:number,
  total:number
}
function OrderDetails({orderType,amount,total}:OrderDetail){
  const  getPercent = (value:number,total:number)=> (((value/total) * 100).toFixed(2))
  return (
    <div className="p-2 px-4 rounded-lg bg-white">
    <p className="text-gray-400">{orderType} Orders</p>
    <p className="font-bold my-1 text-lg">{amount}</p>
    <p className="text-green-900 text-sm">{getPercent(amount,total)}%</p>
  </div>
  )
}

export default function OrdersHomePage(){
  const [orders,setData] = useState<OrdersList[]>([])
  const [delivered,pending,progress,cancelled] = [
    orders.filter(order=>(order.status == "delivered")),
    orders.filter(order=>(order.status == "pending")),
    orders.filter(order=>(order.status == "in progress")),
    orders.filter(order=>(order.status == "cancelled"))
  ]
  const total = delivered.length + pending.length + progress.length + cancelled.length

  useEffect(()=>{
    
  async function getOrders(){
    const response = await OrdersFunction.getOrders()
    if(response.status == "success"){
      setData(response.orders)
     }
    }
    getOrders()
  },[])

    return(
        <DashboardLayout pageTitle="Orders" currentPage="orders">
           <div className="">
             <h3 className="font-bold text-2xl">Orders</h3>
             <div className="bub-grid-res  my-4">
                <OrderDetails
                  orderType="Delivered"
                  amount={delivered.length}
                  total={total}
                />
                <OrderDetails
                  orderType="Pending"
                  amount={pending.length}
                  total={total}
                />
                 <OrderDetails
                  orderType="Progressing"
                  amount={progress.length}
                  total={total}
                />
                  <OrderDetails
                  orderType="Cancelled"
                  amount={cancelled.length}
                  total={total}
                />
             </div>
             <OrdersTable orders={orders}/>
           </div>
        </DashboardLayout>
    )
}