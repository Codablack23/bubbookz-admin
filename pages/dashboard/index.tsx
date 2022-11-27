
import Overview from "~/components/dashboard/home/Overview";
import dynamic from "next/dynamic";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { OrdersList } from "~/data/interfaces";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import  OrdersFunction  from "~/utils/Order";
const Chart =  dynamic(()=> import( "react-apexcharts"),{ssr:false});
import { OrdersContext } from "~/contexts/OrdersContext";
import { BookContext } from "~/contexts/BookContext";
import { Select } from "antd";

const SalesOverview=()=>{
  const  options ={
    chart: {
      id: "basic-bar"
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ["Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 5", "Nov 6", "Nov 7"]
    }
  }
  const {orders} = useContext(OrdersContext)
  const {Option} = Select

  return(
    <div className="p-2">
      <header className="flex justify-between items-center p-2">
         <h3 className="text-lg "><b>Sales Overview</b></h3>
         <div className="bub-w-25">
          <Select style={{width:150}} defaultValue="monthly">
              <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
          </Select>
         </div>
      </header>
      <Chart 
      type="area"
      options={options}
      series={[{
              name: 'Revenue',
              data: [31, 40, 28, 51, 42, 109, 100]
            }, {
              name: 'Expenses',
              data: [11, 32, 45, 32, 34, 52, 41]
       }]}
       />
    </div>
  )
}

const UserOverview=()=>{
  const  options ={
    chart: {
      id: "basic-bar"
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ["Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5", "Nov 5", "Nov 6", "Nov 7"]
    }
  }
  const {orders} = useContext(OrdersContext)
  const {Option} = Select


  return(
    <div className="p-2">
       <header className="flex justify-between items-center p-2">
         <h3 className="text-lg "><b>Statistics</b></h3>
         <div className="bub-w-25">
          <Select style={{width:100}} defaultValue="monthly">
          <Option value="daily">Daily</Option>
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
          </Select>
         </div>
      </header>
      <Chart 
      type="bar"
      options={options}
      series={[{
              name: 'Visits',
              data: [31, 40, 28, 51, 42, 109, 100]
            }, {
              name: 'Registered Users',
              data: [11, 32, 45, 32, 34, 52, 41]
       }]}
       />
    </div>
  )
}

function OrdersChart(){
  const {orders} = useContext(OrdersContext)
  const series = [
    orders.filter(order=>(order.status == "delivered")).length,
    orders.filter(order=>(order.status == "pending")).length,
    orders.filter(order=>(order.status == "cancelled")).length
  ]
  const options = {
    labels:["Delivered Orders","Pending Orders","Cancelled Orders"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }
  return (
    <Chart
    series={series}
    options={options}
    type="donut"
    />
  )
}
function TopBook({book}:{book:any}):JSX.Element{
   console.log(book)
    return(
      <div className="bub-bg-accent bub-grid bub-txt-white my-2 p-2 rounded-lg">
        <div className="grid-col-4">
          <div className="bub-w-100">
          <Image src={book.book_img} layout="responsive" width={"100%"} height={"100%"} alt={"book-img"}/>
          </div>
        </div>
        <div className="grid-col-8">
            <p className="font-bold">{book.title}</p>
            <p className="text-sm">by {book.author}</p>
            <p>N{book.price}</p>
        </div>
      </div>
    )
}
export default function Dashboard(){
  const [isLoading,setLoading] = useState(false)
  const {orders} = useContext(OrdersContext)
  const {books} = useContext(BookContext)

    return(
    <DashboardLayout pageTitle="Home" currentPage="dashboard">
     <>
     <h3 className="font-black text-2xl my-4">Dashboard</h3>
     <Overview/>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-8 grid-col-md-12 bub-min-vh-30">
       <SalesOverview/>
       </div>
       <div className="bg-white rounded-lg grid-col-4 grid-col-md-12 bub-min-vh-30">
        <header className="flex p-2 items-center justify-between">
            <h3 className="font-bold">Top Products</h3>
            <Link href={"/dashboard/top-products"}>
                <a className="bub-txt-primary font-bold">See All</a>
            </Link>
        </header>
        <main className="p-2 overflow-auto mb-3" style={{maxHeight:"300px"}}>
           {books.slice(0,3).map(book=><TopBook key={book.book_id} book={book}/>)}
        </main>
       </div>
     </div>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30">
         <UserOverview/>
       </div>
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30">
        <OrdersChart/>
       </div>
     </div>
     <p className="font-bold mt-3">Top Orders</p>
     <OrdersTable orders={orders}/>
     </>
     
    </DashboardLayout>
    )
}