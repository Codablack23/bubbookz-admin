import { Spin, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { community_columns } from "~/data/columns";
import {  CommunityList } from "~/data/interfaces";
import CommFunctions from '~/utils/Communities'


export default function CommunityTable():JSX.Element{
  const Router = useRouter()
  const [commnities,setCommunities] = useState<CommunityList[]>([])
  const [isLoading,setIsLoading] = useState(true)

  async function getCommunities(){
     const response = await CommFunctions.getCommunities()
     setIsLoading(false)
     if(response.status === "success"){
      setCommunities(response.communities)
     }
     console.log(response)
  }

  useEffect(()=>{
    getCommunities()
  },[])
  return(
   <div className="my-3">
      <div className="flex flex-wrap items-center justify-start mb-2 sticky -top-5 z-30 bg-grey h-20">
        <p>Sort By:</p>
        <select className="bub__filter-select" id="">
        <option value="">Activiy</option>
        </select>
        <select className="bub__filter-select" id="">
            <option value="">Registration Date</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Status</option>
        </select>
    </div>
    {isLoading?
    <div className="bub-vh-50 w-100 flex items-center justify-center">
      <div>
        <Spin size="large"/>
      </div>
    </div>
    :
    <>
     <div className="bg-white rounded-lg">
        <Table 
        onRow={(row)=>{
        return{
          onClick:()=>{
            Router.push(`/dashboard/communities/${row.community_id}`)
          }
        }
        }}
        dataSource={commnities.map(com=>{
          const createdAt = new Date(com.createdAt as string).toISOString()
          return {
            ...com,
            createdAt:createdAt.slice(0,createdAt.indexOf("T")),
            members:com.members.length
          }
        })}
        columns={community_columns}
        scroll={{ x: 600,}}
        pagination={{position:["topRight"]}}
        // className={"bub-bg-accent bub-txt-white"}
        />
   </div>
    </>
    }
   </div>
  )
}