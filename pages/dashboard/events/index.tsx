import { Spin, Table, Tabs } from "antd";
import Link from "next/link";
import BooksPageTable from "~/components/widgets/tables/tables";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import EventsTable from "~/components/widgets/tables/EventsTable";
import { useEffect, useState } from "react";
import { EventList } from "~/data/interfaces";
import Events from "~/utils/Events";


export default function EventsHomePage():JSX.Element{
    const {TabPane} = Tabs
    const [events,setEvents] = useState<EventList[]>([])
    const [loading,setLoading] = useState(false)

    async function getEvents(){
      setLoading(true)
      const response = await Events.getEvents()
      setLoading(false)

      if(response.status == "success"){
       setEvents(
        response.events.map((event:EventList)=>{
          const date = new Date(event.event_date as string) 
         return{
          ...event,
          event_date:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
         }
        })
       
       )
      }
      console.log(response)
    }
    useEffect(()=>{
     getEvents()
    },[])
    return(
        <DashboardLayout  pageTitle="Events" currentPage="events" >
        <div>
            <br />
          <h1 className="font-bold text-4xl lg:mt-5">Events</h1>
            <div className="flex justify-end">
            <Link href={"/dashboard/events/add-event"}>
           <button className="bub-bg-primary rounded-lg p-2 px-6 ">Add Event</button>
           </Link>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Published Events" key={"1"}>
                {loading ?
                 <div className="h-20 bg-white flex items-center justify-center">
                  <Spin size="large"/>
                 </div>
                :<EventsTable events={events}/>
                }
              </TabPane>
              <TabPane tab="Drafts(10)" key={"2"}>
              <EventsTable events={events}/>
              </TabPane>
            </Tabs>
        </div>
     
        </DashboardLayout>
    )
}