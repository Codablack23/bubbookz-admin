import Image from "next/image";
import Link from "next/link";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";

function Info(){
  return(
    <div className="bg-gray-200 sm:flex items-center my-2 p-2 py-4 w-full rounded-lg">
     <div className="rounded-full" style={{width:"70px",height:"70px"}}>
     <Image src={"/images/notify_logo.svg"} 
        className="rounded-full"
        layout="responsive"
        height={"100%"} 
        width={"100%"} 
        alt={"notification logo"}
       />
     </div>
     <div className="sm:ml-5 my-2 font-bold">
       <p>20 pending order</p>
     </div>
     <div className="ml-auto flex sm:block items-center justify-between">
       <div className="flex items-center">
        <span className="w-3 h-3 rounded-full inline-block bub-bg-primary"></span>
        <span className="block">11:00am</span>
       </div>
       <Link href={"#"}>
        <a className="bub-txt-primary font-bold">View Orders</a>
       </Link>
     </div>
    </div>
  )
}
export default function NotificationPage(){
 return(
    <DashboardLayout pageTitle="Notifications" currentPage="books">
      <>
      <div className="flex items center my-2">
            <Link href={"/dashboard"}>
            <a>Dashboard</a>
            </Link>
           <p className="mx-1 font-bold">{">"}</p>
           <p className="font-bold">Profile</p>
          </div>
      <div className="p-2 bg-white rounded-lg bub-min-vh-85 bub-max-vh-90 overflow-hidden">
        <div className="flex justify-between items-center font-bold my-2 mx-4">
          <button className="text-gray-400">Clear all notifications</button>
          <button className="bub-txt-primary">Mark all as Read</button>
        </div>
        <section className="m-auto my-3 overflow-auto bub-max-vh-80" style={{maxWidth:"650px"}}>
         <Info/>
         <Info/>
         <Info/>
         <Info/>
         <Info/>
         <Info/>
         <Info/>
        </section>
      </div>
      </>
    </DashboardLayout>
 )
}