import moment from "moment";
import { useRef } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";


function UserChat(){
    return (
        <li className="m-2 p-2 bub-card rounded-lg">
        <p className="text-xs text-right">{moment().format("HH MM")}</p>
        <div className="flex">
         <div className="w-2/12">
         <div className="rounded-full h-8 w-8 bg-gray-300 relative">
            <p className="h-3 w-3 bg-green-500 rounded-full right-0 absolute bottom-0"></p>
          </div>
          </div> 
          <div className="w-9/12">
              <h5 className="font-bold">User 1</h5>
              <p className="text-xs">Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <p className="text-xs text-right">
          <i className="bi bi-check2-all "></i>
        </p>
     </li>
    )
}
export default function Messages(){
  
  let message = useRef<HTMLDivElement>(null)

    return (
      <DashboardLayout pageTitle="Messages" currentPage="messages">
         <div>
            <h3 className="font-bold text-xl mb-3">Messages</h3>
           <div className="flex relative md:justify-between bg-white rounded-lg bub-vh-85 p-2">
              <div ref={message} className={`z-10 users-section scale-0 md:scale-100 transition-all p-2 md:p-0 md:-translate-x-0 bg-white absolute h-full top-0 left-1 md:static w-full md:w-4/12`}> 
              <button 
                  onClick={()=>{
                      message.current?.classList.toggle("scale-0")
                    }}
                 className="close my-2 block md:hidden">
                <i className="bi bi-x-lg text-red-500"></i>
              </button>  
                <div className="bub-card bg-white rounded-lg p-2 py-3 mb-3 flex items-center w-100">
                  <i className="bi bi-search"></i>
                  <input type="text" className="ml-1 border-none outline-none" placeholder="Search" />
                </div>
                <ul className="bub-vh-70 p-0 list-none overflow-auto">
                 {Array(10).fill("").map((x,i)=>(
                    <UserChat key={`${i}-user-chat`}/>
                 ))}
                </ul>
              </div>
              <div className="md:ml-3 bg-white relative w-full md:w-8/12 bub-vh-80 bub-card rounded-lg">
                <header className="bg-gray-200 sticky top-0 border-bottom p-2 flex items-center justify-between rounded-tl-lg rounded-tr-lg">
                   <div className="flex items-center">
                    <div className="rounded-full h-12 w-12 bg-gray-300 relative">
                     
                     <p className="h-3 w-3 bg-green-500 rounded-full absolute bottom-0 right-0"></p>
                    </div>
                    <div className="ml-2">
                        <p className="bub-txt-dark font-bold">Jane Doe</p>
                        <p className="bub-txt-dark text-sm">Active</p>
                    </div>
                   </div>
                   <div className="flex items-center">
                    <button className="px-3 py-1 bub-card bg-white rounded-lg relative md:hidden block" onClick={()=>{
                      message.current?.classList.toggle("scale-0")
                    }}>
                      <i className="bi bi-person text-black text-xl block"></i>
                      <span className="absolute bub-card bub-bg-primary z-5 -mt-4 ml-2 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs font-bold">1</span>
                    </button>
                     {/* <i className="bi bi-telephone text-lg cursor-pointer"></i>
                     <i className="bi bi-camera text-lg mx-2 cursor-pointer"></i> */}
                     <i className="bi bi-three-dots-vertical text-lg cursor-pointer"></i>
                   </div>
                </header>
               <div className="mb-10"></div>
               <footer className="absolute flex items-center h-12 bottom-0 w-full bub-card bg-gray-100 p-2 rounded">
                  <input type="text" className="bg-transparent w-9/12 p-1 outline-0" placeholder="Type Here" />
                  <button className="ml-auto mr-2">
                    <i className="bi bi-paperclip"></i>
                  </button>
                  <button className="w-16 rounded h-8 flex items-center justify-center text-white bub-bg-primary card">Send</button>
               </footer>
              </div>
           </div>
         </div>
      </DashboardLayout>
    )
}