import { Divider, Image, message, Modal, Spin, Steps } from "antd";
import  OrdersFunction  from "~/utils/Order";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { AuthContext } from "~/contexts/authContext/AuthContext";

interface Item{
    [key:string]:any
}
function CartBook({book}:Item){
    return(
        <div className="grid-col-6 p-2 md:flex items-start bub-min-vh-30 bub-bg-accent rounded-lg mb-2">
        <div className=" w-full sm:w-3/5 md:w-2/5 card mx-auto md:mx-0">
           <Image
            height={"80%"} 
            width={"80%"} 
            src={book.book_img}
            alt="cart book-image"/>
        </div>
        <div className="ml-2 text-white text-center py-2 md:text-left">
           <p className="font-bold">{book.title}</p>
           <p className="text-sm">By {book.author}</p>
           <div className="mt-10">
               <p>Unit Price: N{book.price}</p>
               <p>Quantity:{book.quantity}</p>
               <p>Total: <span className="font-bold">{book.total}</span></p>
           </div>
        </div>
      </div>
    )
}

interface Cart{
    cart:Item[]
}


export function CustomersCart({cart}:Cart){
    const [isGrid,setIsGrid] = useState(true)
    return(
        <div>
            <header className="flex items-center justify-between">
                <p className="font-bold">Customers Cart</p>
                <div className="actions flex items-center">
                    <button className="card p-1 bg-white mr-2" onClick={()=>setIsGrid(false)}>
                       <i className={`bi bi-list-ul ${!isGrid?"bub-txt-primary":""}`}></i>
                    </button>
                    <button className="card p-1 bg-white" onClick={()=>setIsGrid(true)}>
                       <i className={`bi bi-grid ${isGrid?"bub-txt-primary":""}`}></i>
                    </button>
                </div>
            </header>
            <div className={`${isGrid?"bub-grid":""} bg-white rounded-lg p-2 px-4 my-2`}>
              {cart.map(item=>(
                <CartBook key={item.book_id} book={item}/>
              ))}
            </div>
        </div>
    )
}
export default function OrderDetails(){
    const {Step} = Steps
    const {state} = useContext(AuthContext)
    const [user,setUser] = useState<any>({})
    const router = useRouter()
    const [detail,setDetail] = useState<any>({})
    const [items,setItems] = useState<any[]>([])
    const [isLoading,setIsLoading] = useState(true)
    const [updatingOrder,setUpdatingOrder] = useState(false)
    const [updated,setUpdated] = useState(0)

    async function getOrder(){
        if(router.query.oid){
            setIsLoading(true)
            const response = await OrdersFunction.getOrder(router.query.oid as string)
            setIsLoading(false)
            if(response.status === "success"){
                if(response.order){
                  setDetail(response.order)
                  setItems(response.order.items?JSON.parse(response.order.items):[])
                }
            }
        }
    }
    function selectStep(status:string){
     return status === "pending"?0:status === "in progress"?1:status === "delivered"?2:0
    }
    useEffect(()=>{
      getOrder()
    },[router,updated])

    useEffect(()=>{
    if(state){
      setUser(state.user)
      }
    },[state])
    
    async function updateStatus(status:string,delivered_by:string){
      const id = router.query.oid as string
      setUpdatingOrder(true)
      const response = await OrdersFunction.updateOrder(id,{status,delivered_by})
      setUpdatingOrder(false)
      if(response.status === "success"){
        message.success("Order Updated Successfully")
        setUpdated(prev=>prev + 1)
      }else{
        message.error(response.error)
      }

    }
    return (
        <DashboardLayout pageTitle="Orders" currentPage="orders">
            <div>
                <Modal visible={updatingOrder} footer={false} centered closable={false}>
                  <div className="h-20 w-100 flex items-center justify-center">
                     <div className="text-center">
                        <Spin size="large"/>
                        <p>Updating Order</p>
                     </div>
                  </div>
                </Modal>
                <div className="my-3 flex items-center">
                <Link href={"/dashboard/orders"}><a>Orders </a></Link>
                <span className="block mx-1"> &gt;</span>
                <span className="font-bold">Order Details</span>
                </div>
               {isLoading?
               <div className="flex justify-center items-center bub-vh-80 w-full">
                 <Spin size="large"/>
               </div>
               :Object.entries(detail).length > 0?
               <>
                <div>
                    <div className="flex items-center pt-3">
                        <p>Order Status:</p>
                        <p className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg ml-3">
                            {detail.status}
                        </p>
                    </div>
                <header className="my-3 bub-grid">
                    <div className="bg-white grid-col-4 grid-col-md-12 rounded-lg bub-min-vh-25">
                       <h3 className="p-3 text-gray-500">Customer Details</h3>
                       <Divider className="-mt-1"/>
                       <div className="flex justify-between items-center p-3">
                         <div className="rounded-full flex justify-center items-center bg-gray-700" style={{width:"85px",height:"85px"}}>
                          {(detail.profile=== null || detail.profile === "")?
                          <p className="text-white text-2xl">{detail.firstname.slice(0,1).toUpperCase()}{detail.lastname.slice(0,1).toUpperCase()}</p>
                          :<Image src={detail.profile} 
                          width="100%"
                          height={"100%"}
                          alt={"profile-img"}
                          />
                          }
                         </div>
                         <div>
                            <p className="font-bold text-lg">{detail.full_name}</p>
                            <p className="bub-txt-primary">{detail.createdBy}</p>
                            <p>{detail.phone_number}</p>
                         </div>
                        </div>
                        <Divider/>
                        <div className="px-2">
                            <p className="text-gray-400">Shipping Location</p>
                            <p className="font-bold">{detail.shipping_location}</p>
                        </div>
                    </div>
                    <div className="bg-white grid-col-4 grid-col-md-12 rounded-lg bub-min-vh-25">
                       <h3 className="p-3 text-gray-500">Activity</h3>
                       <Divider className="-mt-1"/>
                       <div className="p-3">
                        <Steps direction="vertical" size="small" current={selectStep(detail.status)} progressDot>
                            <Step title="Order Placed" description={new Date().toDateString()} />
                            <Step title="Out For delivery" description="" />
                            <Step title="Delivered" description="" />
                        </Steps> 
                        </div>
                        <Divider/>
                        <div className="text-center mb-5">
                         {detail.status === "pending" && 
                           <button className="bub-txt-primary"
                           onClick={()=>{updateStatus("in progress",`${user.firstname} ${user.lastname}`)}}
                           >
                            Take this Order
                          </button>} 
                         {detail.status === "in progress" 
                          && <button 
                          className="bub-txt-primary" 
                          onClick={()=>{updateStatus("delivered",`${user.firstname} ${user.lastname}`)}}
                          >
                            Mark as Done
                            </button>} 
                         {detail.status === "delivered" && 
                         <button className="" type="button">Delivered By <span className="font-bold">{detail.delivered_by}</span></button>}  
                        </div>
                    </div>
                    <div className="bg-white grid-col-4 grid-col-md-12 rounded-lg bub-min-vh-25">
                       <h3 className="p-3 text-gray-500">Payment Detaiils</h3>
                       <Divider className="-mt-1"/>
                       <div className="p-3">
                          <div className="flex justify-between items-center">
                            <p>Sub Total</p>
                            <p>N{parseFloat(detail.payment_price) - (parseFloat(detail.delivery_fee) + parseFloat(detail.discount) )}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Delivery</p>
                            <p>N{detail.delivery_fee}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p>Discount</p>
                            <p>N{detail.discount}</p>
                          </div>
                        </div>
                        <Divider/>
                        <div className="flex font-bold justify-between items-center px-3">
                            <p>Total</p>
                            <p>N{detail.payment_price}</p>
                          </div>
                        <div className="flex flex-col justify-end px-3 bub-min-vh-15">
                          <p className="text-gray-300 capitalize">Payment Method: <span className="font-bold text-black">{detail.payment_method}</span></p>
                        </div>
                    </div>
                </header>
                <CustomersCart cart={items}/>
                </div>
               </>
               :<div className="flex justify-center items-center bub-vh-80 w-full">
                <p className="text-center text-3xl">No Order Found</p>
               </div>
               }
            </div>
        </DashboardLayout>
    )
}