interface Props{
    children:JSX.Element,
    pageTitle:string,
    currentPage:string
}

import { Spin } from "antd";
import Head from "next/head";
import {useEffect, useState}  from "react"
import Auth from "~/utils/Auth";
import Header from "../dashboard/home/Header";
import SideBar from "../widgets/SIdebar";

function LoadingState(){
  return (
    <div className="bg-white w-full h-screen flex justify-center items-center">
    <div>
     <div className="flex justify-center">
     <Spin size="large"/>
     </div>
     <p className="text-center">Getting your Dashboard Ready</p>
    </div>
    </div>
  )
}

export function DashboardLayout(props:Props):JSX.Element{
  const [isSideBar,setIsSideBar] = useState(true)
  const [isLoading,setIsLoading] = useState(true)
  async function checkUser(){
    const response = await Auth.authenticate()
    response.status != "logged in" ? (
      window.location.assign("/")
    ):setIsLoading(false)
  }
  useEffect(()=>{
    checkUser()

  })

    return(
        <div className="relative bub-container bg-grey min-h-screen w-full max-w-full">
         {isLoading ?
         <LoadingState/>
         :<>
          <Head>
            <title>{props.pageTitle}</title>
          </Head>
          <SideBar currentPage={props.currentPage} shown={isSideBar} showSideBar={setIsSideBar}/>
          <div className="bub__main-content p-5 min-h-screen max-h-screen overflow-auto">
             <button
              className="bg-white rounded-full w-8 mb-4 h-8 inline-block lg:hidden"
              onClick={()=>setIsSideBar(prev=>!prev)}
              >
                  <i className="bi bi-justify bub-txt-accent text-lg"></i>
             </button>
             <Header/>
            {props.children}
          </div>
         </>
         }
        </div>
    )
}