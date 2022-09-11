import { Table } from "antd";
import { useRouter } from "next/router";
import { ordersTable } from "~/data/columns";
import { OrdersList } from "~/data/interfaces";


export default function OrdersTable({orders}:{orders:OrdersList[]}):JSX.Element{
  const router = useRouter()

  return(
   <div className="my-3">
      <div className="flex flex-wrap items-center justify-start mb-2 sticky -top-5 z-30 bg-grey h-20">
        <p>Sort By:</p>
        <select className="bub__filter-select" id="">
        <option value="">Name</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Location</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Status</option>
        </select>
        <select className="bub__filter-select" id="">
            <option value="">Date</option>
        </select>
       
    </div>
    <div className="bg-white rounded-lg">
        <Table 
        onRow={(row)=>{
          return{
           onClick:()=>{
            router.push(`/dashboard/orders/${row.order_id}`)
           }
          }
        }
        }
        dataSource={orders.map(d=>{
          const orderDate = new Date(d.createdAt).toISOString()
          return {
            ...d,
            delivered_by:d.delivered_by?d.delivered_by:"Nil",
            date:orderDate.slice(0,orderDate.indexOf("T"))
          }
        })}
        columns={ordersTable}
        scroll={{ x: 600,}}
        pagination={{position:["topRight"]}}
        // className={"bub-bg-accent bub-txt-white"}
        />
   </div>
   </div>
  )}