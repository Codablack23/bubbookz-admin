import { Select } from "antd"
import dynamic from "next/dynamic";
import { useState, useContext } from "react"
import { OrdersContext } from "~/contexts/OrdersContext"
import { getDateRange } from "~/utils/helpers"

const Chart =  dynamic(()=> import( "react-apexcharts"),{ssr:false});


export default function UserOverview(){
    const [dateRange,setDateType] = useState("monthly")
  
    
    const  options ={
      chart: {
        id: "basic-bar"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: getDateRange(dateRange)
      }
    }
    const {orders} = useContext(OrdersContext)
    const {Option} = Select
  
  
    return(
      <div className="p-2">
         <header className="flex justify-between items-center p-2">
           <h3 className="text-lg "><b>Statistics</b></h3>
           <div className="bub-w-25">
            <Select style={{width:100}} defaultValue="monthly" value={dateRange} onChange={(value)=>setDateType(value)}>
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