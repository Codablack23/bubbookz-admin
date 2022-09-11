import { Tabs } from "antd";
import Link from "next/link";
import ProfileCard from "~/components/dashboard/home/ProfileCard";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import { useContext, useEffect, useState } from "react";
import { OrdersList } from "~/data/interfaces";
import  OrdersFunction  from "~/utils/Order";
import { AuthContext } from "~/contexts/authContext/AuthContext";


export default function ProfilePage(){
    const {TabPane} = Tabs
    const [user,setUser] = useState<any>({})
    const {state} = useContext(AuthContext)
    const [orders,setData] = useState<OrdersList[]>([])
    const [delivered,progress] = [
      orders.filter(order=>(order.status == "delivered" && order.delivered_by?.toLowerCase() === `${user.firstname} ${user.lastname}`.toLowerCase() )),
      orders.filter(order=>(order.status == "in progress" && order.delivered_by?.toLowerCase() === `${user.firstname} ${user.lastname}`.toLowerCase())),
    ]
  
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

    useEffect(() => {
      if(state){
        setUser(state.user)
      }
    }, [state])

    return(
        <DashboardLayout pageTitle="Profile" currentPage="dashboard">
          <div>
          <div className="flex items center my-2">
            <Link href={"/dashboard"}>
            <a>Dashboard</a>
            </Link>
           <p className="mx-1 font-bold">{">"}</p>
           <p className="font-bold">Profile</p>
          </div>
          <ProfileCard/>
           <div className="my-3">
            <div className="text-right">
              <Link href={"/dashboard/orders"}>
              <button className="p-2 px-4 bub-bg-primary rounded-lg">
                    <i className="bi bi-plus-lg"></i>
                    <span className="ml-3">Take Order</span>
                </button>
              </Link>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Taken Orders" key={"1"}>
                    <OrdersTable orders={progress}/>
              </TabPane>
              <TabPane tab="Delivered Orders" key={"2"}>
                  <OrdersTable orders={delivered}/>
              </TabPane>
            </Tabs>
           </div>
          </div>
        </DashboardLayout>
    )
}