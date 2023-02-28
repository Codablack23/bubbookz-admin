import dynamic from "next/dynamic";
import { useContext } from "react";
import { OrdersContext } from "~/contexts/OrdersContext";

const Chart =  dynamic(()=> import( "react-apexcharts"),{ssr:false});


export default function OrdersChart(){
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