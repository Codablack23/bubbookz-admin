import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { links } from "~/data/links";

interface Props{
  currentPage?:string,
  shown:boolean,
  showSideBar:Function
}

export default function SideBar(props:Props):JSX.Element{
   
   
   const link_class = "bub-txt-white hover:bub__link"
   const active = "bg-white bub-txt-primary hover:bub__link-active"
   const notShown = "-translate-x-full"
    return(
        <div className={`fixed lg:absolute top-0 overflow-auto h-full left-0 z-50 ${props.shown?notShown:""}
        transition-all
        lg:translate-x-0 bub-bg-neutral w-3/4 md:w-1/2 lg:w-1/5`}>
          <button
              className="bg-white rounded-full w-8 mb-4 ml-5 mt-5 h-8 inline-block lg:hidden"
              onClick={()=>props.showSideBar((prev:boolean)=>!prev)}
              >
                  <i className="bi bi-x-lg bub-txt-accent text-lg"></i>
             </button>
          <div className="brand flex justify-center p-4">
           <div style={{cursor:"pointer"}} className={"text-center"}>
           <Link href={"/dashboard"}>
                <Image
                src={"/images/Logo.svg"}
                alt={"logo"}
                width={"50px"}
                height={"50px"}
                />
            </Link>
            <p className="bub-font-a bub-txt-primary">Bubbookz</p>
           </div>
          </div>
          <div className="mt-6 bub__side-links">
              {links.map((link,i)=>(
                 <Link href={link.url} key={`${i}-side-links`} >
                <a
                 className={`p-5 text-sm 
                 ${props.currentPage?.toLowerCase() ==link.name.toLowerCase()?active:link_class}
                  flex w-full font-bold bub__overline`}>
                  <i className="bi bi-house font-bold"></i>
                  <span className="ml-5">{link.name}</span>
                </a>
                </Link>
              ))}
             
          </div>
        </div>
    )
}