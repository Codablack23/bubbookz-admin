import { Spin, Table } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { customer_columns } from "~/data/columns";
import { CustomerList } from "~/data/interfaces";
import Auth from "~/utils/Auth";

interface Props{
  currentUser:CustomerList
}

function ProfileCard(props:Props){
  const {currentUser} = props
  return(
  <div>
      <div className="bub-grid">
    <div className="grid-col-5 grid-col-md-12 flex justify-start items-start">
      <div className="img-container h-24 w-24 rounded-full flex justify-center items-center bg-gray-600">
        {currentUser.profile_picture
        ?(<Image height={"100%"} width={"100%"} layout={"responsive"} className={"rounded-full"} src={currentUser.profile_picture as string} alt="profile image"/>)
        :( <p className="text-white text-3xl">{(currentUser.first_name as string).slice(0,1).toUpperCase()}{(currentUser.last_name as string).slice(0,1).toUpperCase()}</p>)
        }
      </div>
      <div>
        <h3 className="font-bold ml-3">{currentUser.first_name} {currentUser.last_name}</h3>
        <p className="bub-txt-primary">
          <span className="mx-3"><i className="bi bi-envelope"></i></span>
          <span>{currentUser.email}</span>
        </p>
        <p className="bub-txt-primary">
          <span className="mx-3"><i className="bi bi-telephone"></i></span>
          <span>{currentUser.phone_no?currentUser.phone_no:"N/A"}</span>
        </p>
      </div>
    </div>
    <div className="grid-col-7 grid-col-md-12">
      <div className="flex my-2">
        <p>School:</p>
        <p className="ml-5">{currentUser.school}</p>
      </div>
      <div className="flex my-2">
        <p>Faculty:</p>
        <p className="ml-5">{currentUser.faculty}</p>
      </div>
      <div className="flex my-2">
        <p>Department:</p>
        <p className="ml-5">{currentUser.department}</p>
      </div>
    </div>
  </div>
    <p className="text-right bub-txt-primary">Joined : {new Date(currentUser.createdAt).toDateString()}</p>
  </div>
  )
}
export default function CustomersTable():JSX.Element{
  const [customers,setCustomers] = useState<CustomerList[]>([])
  const [currentUser,setCurrentUser] = useState<CustomerList>({})
  const [isLoading,setLoading] = useState(true)

  async function getCustomers(){
    const response = await Auth.getCustomers()
    setLoading(false)
    if(response.status == "success" && response.customers.length > 0){
      setCustomers(response.customers)
    }
  }
  
  useEffect(()=>{
    getCustomers()
  },[])
  return(
   <div className="my-3">
     <p>Sort By:</p>
      <div className="bub-grid-tags w-1/2 mb-3 md:sticky -top-5 z-3 bg-grey">
        <select className="bub__filter-select h-8" id="">
        <option value="">School</option>
        </select>
        <select className="bub__filter-select h-8" id="">
            <option value="">Faculty</option>
        </select>
        <select className="bub__filter-select h-8" id="">
        <option value="">Department</option>
        </select>
        <select className="bub__filter-select h-8" id="">
        <option value="">Registration Date</option>
        </select>
    </div>
    <div className="mt-3">
     {isLoading?
     <div className="bg-white h-24 p-2 rounded-lg flex items-center justify-center">
      <Spin size="large"/>
     </div>
     :<Table 
        onRow={(record)=>{
          return{
            onClick:()=>{
              setCurrentUser(record)
            }
          }
        }}
        dataSource={customers}
        columns={customer_columns}
        scroll={{ x: 600,}}
        pagination={{position:["topRight"]}}
        // className={"bub-bg-accent bub-txt-white"}
        />
     }
   </div>
   <footer className="sticky bub-card bg-white -bottom-5 p-3 rounded-b-lg">
     {Object.entries(currentUser).length > 0 && (
     <ProfileCard currentUser={currentUser}/>
     )}
   </footer>
   </div>
  )
}