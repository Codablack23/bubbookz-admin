import { Image, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import Events from "~/utils/Events";

function LoadingState(){
    return (
        <div className="p-3 bg-white rounded-lg bub-min-vh-85">
          <header className="bub-grid">
            <div className="grid-col-4 grid-col-md-12">
               <Skeleton.Button
               block
               active
               style={{height:"300px"}}
               />
            </div>
            <div className="grid-col-8 grid-col-md-12">
                <Skeleton
                active
                paragraph={{rows:8}}
                />
            </div>
          </header>
          <div className="bub-grid mt-10">
            <div className="grid-col-4 grid-col-md-12">
            <Skeleton.Button
               block
               active
               style={{height:"150px"}}
               />
                <div className="mt-3">
               <Skeleton
                active
                paragraph={{rows:2}}
                />
               </div>
            </div>
            <div className="grid-col-4 grid-col-md-12">
              <Skeleton.Button
               block
               active
               style={{height:"150px"}}
               />
               <div className="mt-3">
               <Skeleton
                active
                paragraph={{rows:2}}
                />
               </div>
            </div>
            <div className="grid-col-4 grid-col-md-12">
            <Skeleton.Button
               block
               active
               style={{height:"150px"}}
               />
              <div className="mt-3">
               <Skeleton
                active
                paragraph={{rows:2}}
                />
               </div>
            </div>
          </div>
        </div>
    )
} 
export  function Speaker({speakers}:{speakers:string}){
    const allSpeakers = (speakers || speakers !== null)?
     JSON.parse(speakers)
    :[]
  return (
    <div className="bub-grid">
      {allSpeakers.length > 0 && (
        allSpeakers.map((speaker:any,i:number)=>(
            <div className="grid-col-4 grid-col-md-12 rounded-lg p-4 bub-bg-accent" key={`${i}-event-speakers`}>
            <header className="flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-700">
                   <Image src={speaker.imageUrl} className="rounded-full" height={"96px"} width={"96px"} alt="Host image"/>
                </div>
            </header>
            <p className="mt-2 bub-txt-primary text-center">{speaker.hostname}</p>
            <p className="my-4 text-white">{speaker.desc}</p>
            </div>                 
        ))
      )}
    </div>
   
  )
}
export default function EventDetailPage(){
    const router = useRouter()
    const [event,setEvent] = useState<any>({})
    const [isLoading,setisLoading] = useState(true)

    const goToEditEventPage=(id:string)=>{
      return ()=>window.location.replace(`/dashboard/events/edit-event/${id}`)
    }
    useEffect(()=>{
         async function getEvent(){
        if(router.query.eid){
            const response = await Events.getEvent(router.query.eid as string)
            setisLoading(false)
            console.log(response)
            if(response.status === "success"){
                if(response.event){
                    setEvent(response.event)
                }
            }
        }
    }
      getEvent()
    },[router])
    return(
        <DashboardLayout 
        currentPage="events" 
        pageTitle={`Event | ${(!isLoading && (Object.entries(event).length > 0))?event.name:"loading"}`}>
            <div>
                <div className="my-3 flex items-center">
                <Link href={"/dashboard/events"}><a>Events </a></Link>
                <span className="block mx-1"> &gt;</span>
                <Link href={"/dashboard/books/add-event"}><a>Add Event</a></Link>
                <span className="block mx-1"> &gt;</span>
                <span className="font-bold">Event Details</span>
                </div>
                {isLoading?
                <LoadingState/>
                :Object.entries(event).length > 0?
                <div className="bg-white rounded-lg p-3 mt-8 bub-min-vh-75">
                  <header className="bub-grid">
                    <div className="grid-col-4 grid-col-md-12">
                      <Image src={event.img_link} className="rounded-lg" alt={"Event Image"}/>
                    </div>
                    <div className="grid-col-8 grid-col-md-12">
                        <header className="flex justify-between">
                            <p className="font-bold text-lg">{event.name}</p>
                            <button onClick={goToEditEventPage(event.event_id)}>
                                <i className="bi bi-pencil text-md"></i>
                            </button>
                        </header>
                        <div className="mt-5">
                            <div className="flex">
                                <i className="bi bi-calendar bub-txt-primary"></i>
                                <p className="ml-2">{new Date(event.event_date).toDateString()}</p>
                            </div>
                            <div className="flex">
                                <i className="bi bi-geo-fill bub-txt-primary"></i>
                                <p className="ml-2">{event.location}</p>
                            </div>
                            <div className="flex">
                                <i className="bi bi-clock bub-txt-primary"></i>
                                <p className="ml-2">{event.event_time}</p>
                            </div>
                        </div>
                        <p className="my-5">{event.description}</p>
                     </div>
                  </header>
                  <p className="my-5 bub-font-a font-bold text-2xl">Meet Our Speakers</p>
                  <Speaker speakers={event.hosts}/>
                </div>
                :<div className="bub-vh-70 w-100 flex items-center justify-center">
                   <div className="text-center">
                     <p className="text-5xl font-bold">404</p>
                     <p>The event you are looking for does not exist or was deleted or moved</p>
                     <p className="bub-txt-primary mt-2 cursor-pointer" onClick={router.back}>Back</p>
                   </div>
                </div>
                }
            </div>
        </DashboardLayout>
    )
}