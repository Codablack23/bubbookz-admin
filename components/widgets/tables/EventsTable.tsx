import { Table } from "antd";
import { useRouter } from "next/router";
import { events_columns } from "~/data/columns";
import { EventList } from "~/data/interfaces";

interface Props{
  events:EventList[]
}
export default function EventsTable({events}:Props):JSX.Element{
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
        <option value="">Date</option>
        </select>
    </div>
    <div className="bg-white rounded-lg">
        <Table 
        onRow={(row)=>{
          return {
            onClick:()=>{
              router.push(`/dashboard/events/${row.event_id}`)
            }
          }
        }}
        dataSource={events}
        columns={events_columns}
        scroll={{ x: 600,}}
        pagination={{position:["topRight"]}}
        // className={"bub-bg-accent bub-txt-white"}
        />
   </div>
   </div>
  )
}