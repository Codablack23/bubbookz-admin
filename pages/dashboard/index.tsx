
import Overview from "~/components/dashboard/home/Overview";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { OrdersList } from "~/data/interfaces";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import  OrdersFunction  from "~/utils/Order";



function TopBook():JSX.Element{
    return(
      <div className="bub-bg-accent bub-grid bub-txt-white my-2 p-2 rounded-lg">
        <div className="grid-col-4">
          <div className="bub-w-100">
          <Image src={"/images/book.svg"} layout="responsive" width={"100%"} height={"100%"} alt={"book-img"}/>
          </div>
        </div>
        <div className="grid-col-8">
            <p className="font-bold">Principles Of General Chemistry</p>
            <p className="text-sm">by Mariana P. Diego</p>
            <p>N5000</p>
        </div>
      </div>
    )
}
export default function Dashboard(){

  const [orders,setData] = useState<OrdersList[]>([])

  async function getOrders(){
    const response = await OrdersFunction.getOrders()
    console.log(response)
    if(response.status == "success"){
      setData(response.orders)
    }
  }

  useEffect(()=>{
    getOrders()
  },[])
    return(
    <DashboardLayout pageTitle="Home" currentPage="dashboard">
     <>
     <h3 className="font-black text-2xl my-4">Dashboard</h3>
     <Overview/>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-8 grid-col-md-12 bub-min-vh-50"></div>
       <div className="bg-white rounded-lg grid-col-4 grid-col-md-12 bub-min-vh-30">
        <header className="flex p-2 items-center justify-between">
            <h3 className="font-bold">Top Products</h3>
            <Link href={"/dashboard/top-products"}>
                <a className="bub-txt-primary font-bold">See All</a>
            </Link>
        </header>
        <main className="p-2 overflow-auto mb-3" style={{maxHeight:"300px"}}>
            <TopBook/>
            <TopBook/>
            <TopBook/>
            <TopBook/>
            <TopBook/>
        </main>
       </div>
     </div>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30"></div>
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30"></div>
     </div>
     <p className="font-bold mt-3">Top Orders</p>
     <OrdersTable orders={orders}/>
     </>
     
    </DashboardLayout>
    )
}