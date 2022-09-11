import { Dropdown, Menu, message, Modal, Skeleton, Spin, Tag } from "antd";
import { DownOutlined } from '@ant-design/icons';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import { CommunityList } from "~/data/interfaces";
import CommFunctions from '~/utils/Communities'

interface DetailProps{
    community:CommunityList,
    updateCommunity?:any
}
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
               <div className="mt-5">
                <Skeleton.Button active style={{width:'100px'}}/>
               </div>
            </div>
            <div className="grid-col-8 grid-col-md-12">
                <Skeleton
                active
                paragraph={{rows:13}}
                />
            </div>
          </header>
        </div>
    )
} 
function DropdownMenu({menu}:{menu:ReactElement<any>}){
    return(
        <Dropdown
        // buttonsRender={}
        overlay={menu}>
          <DownOutlined/>
        </Dropdown>
    )
}
function CommunityDetail({community,updateCommunity}:DetailProps){
  
    const menu = (
    <Menu
     onClick={updateCommunity}
     items={[
          {
            label: 'Approve',
            key: 'approved',
          },
          {
            label: 'Decline',
            key: 'declined',
          },
          {
            label: 'Suspend',
            key: 'suspended',
          },
     ]}
    />
    )
    function showStatus(status:string){
      let color = status?.toLowerCase() == "pending"?"orange"
      :status?.toLowerCase()  === "approved"?"green"
      :status?.toLowerCase()  === "declined"?"red"
      :status?.toLowerCase()  === "suspended" && "grey"
      return(
          <Tag color={color as string} className={`capitalize mx-3 text-xs p-1 px-4 rounded-xl`}>
             {status}
          </Tag>
      )
    }
    return (
        <div className="rounded-lg bg-white p-3 w-full bub-grid">
            <div className="grid-col-4 grid-col-md-12">
               <div className="w-full m-auto sm:w-1/2 lg:w-full mb-3">
                  <Image src={community.banner_img} className={"rounded-lg"} layout="responsive" height={"100%"} width={"100%"} alt={"community image"}/>
               </div>
               <div className="flex items-center">
                <p>Status:</p>
                  {showStatus(community.status as string)}
                  <div><DropdownMenu menu={menu}/></div>
               </div>
            </div>
            <div className="grid-col-8 grid-col-md-12">
                <div className="text-right my-2">
                    <button>
                        <i className="bi bi-trash text-xl"></i>
                    </button>
                </div>
                <h3 className="font-bold text-xl">{community.title}</h3>
                <p>created by {community.creator}</p>
                <div className="flex items-center my-2">
                    <p className="mr-3">
                        <span><i className="bi bi-people font-bold"></i></span>
                        <span className="ml-1">{community.members} members</span>
                    </p>
                    <p className="mr-3">
                        <span><i className="bi bi-hand-thumbs-up font-bold"></i></span>
                        <span className="ml-1">{community.likes} Likes</span>
                    </p>
                    {/* <p className="mr-3">
                        <span><i className="bi bi-chat-left-text font-bold"></i></span>
                        <span className="ml-1">500 members</span>
                    </p> */}
                </div>
                <p className="py-5 sm:w-11/12">
                {community.about}
                </p>
                <ul className="sm:w-11/12 my-2">
                    <h3 className="font-bold text-lg mb-6">Community Rules</h3>
                    <li className="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, odit.</li>
                    <li className="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, odit.</li>
                    <li className="my-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, odit.</li>
                </ul>
            </div>
        </div>
    )
}
export default function CommunityDetailPage(){
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(true)
    const [community,setCommunity] = useState<CommunityList>({})
    const [comUpdated,setComUpdated] = useState(0)
    const [loading,setLoading] = useState(false)

    async function updateCommunity({key}:{[key:string]:any}) {
        setLoading(true)
        const response = await CommFunctions.updateCommunityStatus(
            (community.community_id as string),
            {status:key}
           )
        setLoading(false)
        console.log(response)
           if(response.status === "success"){
            message.success(`Community has been ${key} successfully`)
            setTimeout(()=>{
                setComUpdated((prev:number)=>prev+1)
            },2000)
           }else{
            message.error(response.error)
           }
    }
    async function getCommunity(){
        if(router.query.cid){
           setIsLoading(true)
           const response = await CommFunctions.getCommunity(router.query.cid as string)
           setIsLoading(false)
           if(response.status === "success"){
             if(response.community){
                setCommunity(response.community)
             }
           }
        }
    }
    useEffect(()=>{
      getCommunity()
    },[router,comUpdated])
    return(
     <DashboardLayout currentPage="communities" pageTitle="Community Detail">
       <div>
        <Modal visible={loading} footer={false} closable={false} centered>
           <div className="flex items-center justify-center w-full h-20">
            <Spin/>
           </div>
        </Modal>
       <div className="my-3 flex items-center">
        <Link href={"/dashboard/communities"}><a>Communities </a></Link>
        <span className="block mx-1"> &gt;</span>
        <a className="font-bold">Community Details</a>
     </div>
        {isLoading?
        <LoadingState/>
        :Object.entries(community).length > 0?
        <CommunityDetail community={community} updateCommunity={updateCommunity}/>
        :(
            <div className="bg-white w-100 bub-vh-85 p-3 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-5xl font-bold">404</p>
                    <p>The community you are looking for does not exist or has been moved</p>
                    <p className="bub-txt-primary cursor-pointer mt-3" onClick={router.back}>Back</p>
                </div>
            </div>
        )
        }
       </div>
     </DashboardLayout>
    )
}