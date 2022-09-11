import { Carousel, Modal, Progress,message,Image,Select, Spin } from "antd";
import Link from "next/link";
import Dropzone from "react-dropzone";
import { validateFields } from "~/utils/validator";
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import axios from "axios";
import Events from "~/utils/Events";
import Router from "next/router";

const filetypes =["jpeg","jpg","png","svg","jif"]

interface Host{
   hostname?:string,
   desc?:string,
   imageUrl?:string,
   [key:string]:any
}
interface  WidgetProps{
  action:Dispatch<SetStateAction<any>>,
}
interface HostProps extends WidgetProps{
  id?:string|number,
  host?:Host,
  errors?:{[key:string]:any}
}
interface DropZoneProps {
  id?:string|number,
  host?:Host,
  title?:string,
  action:([key]:any)=>any,
  errors?:string

}
interface ErrorObj{
event_name?:string, 
contact_number?:string,
location_link?:string,
registration_link?:string,
image_link?:string,
description?:string,
location?:string,
[key:string]:any
}
function DropzoneWidget({action,title,errors}:DropZoneProps){
  const [file,setFile] = useState<FileList[]|{}>({})
  const [isUploading,setIsUploading] = useState(false)
  const [imageUrl,setImageUrl] = useState<any>("")
  const [progress,setProgress] = useState<any>(0)
  const [progressObj,setProgressObj] = useState<any>({loaded:0.00,total:0.00})
  
  async function handleUpload(e:any){
    e.preventDefault()
    setIsUploading(true)
    const response =  await axios.post("http://localhost:5505/upload",file,{
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "Set-Cookie"
      },
      withCredentials:true,
      onUploadProgress:(event:{[key:string]:any})=>{
        setProgressObj({loaded:event.loaded,total:event.total})
        const loaded = parseFloat(event.loaded)
        const total = parseFloat(event.total)
        const percent = ((loaded/total) * 100).toFixed(2)
        setProgress(percent)
      }
     })
     .then((res:any)=>res.data)
     .catch((err:any)=>{
      return{
      status:"Failed",
      error:"couldnt connect to server",
      axios:err
     }})
     if(response.status == "success"){
      setImageUrl(response.file.url)
      action(response.file.url)
     }else{
      setIsUploading(false)
      message.error(response.error)
     }
  }
  return(
    <div>
       <Dropzone onDrop={files=>{
    const currentFile =files[0]
    const type = files[0].type.slice(currentFile.type.indexOf("/")+1)
    if(filetypes.includes(type)){
      const url = URL.createObjectURL(files[0])
      setImageUrl(url)
      setFile(files)
    }
    else{
      message.error(`Unsupported image types only ${filetypes.toString()} are accepted`)
    }
    
  }}>
     {(({getRootProps, getInputProps})=>
      <form action="" className="upload" onSubmit={handleUpload}>
          {imageUrl ?
          <div className="bg-gray-200 rounded-lg p-3 text-center">
            {!isUploading && (
                <header className="flex justify-between items-center">
                <button 
                type="button"
                {...getRootProps()}
                className="outline-none"><i className="bi bi-pencil text-xl text-gray-800"></i></button>
                <button 
                type="button"
                onClick={()=>setImageUrl("")}
                className="outline-none"
                ><i className="bi bi-trash text-xl text-red-400 "></i></button>
               </header>
            )}
            <Image src={imageUrl as string} height={200} alt="book-photo"/>
          </div>
          :
            <label className="border-2 
            cursor-move border-dashed border-gray-400
           bg-gray-300 flex justify-center text-center
            
            itms-center bub-min-vh-30 rounded mt-3 p-3 outline-none"
            {...getRootProps()}
            >
           <div>
           <i className="text-7xl bi bi-image text-gray-500"></i><br /><br />
           <p className="font-bold text-gray-600">Drag and Drop or Click to upload image</p>
           </div>
           </label>   
          }         
          {imageUrl && (isUploading ?
          <button className="bg-gray-100 text-grey rounded-lg my-3 p-2 outline-none cursor-not-allowed" disabled type="button">Upload</button>
          :<button className="bub-bg-primary rounded-lg my-3 p-2 outline-none">Upload</button>  
          )}
         <input type="file" className="max-h-0 overflow-hidden" name="" id="upload" {...getInputProps()} />
         
     </form>
     )}
   </Dropzone>
   {isUploading && (
     <div className="border border-gray-300 rounded p-2">
     <div className="flex items-center">
     <i className="bi bi-cloud-arrow-up-fill bub-txt-primary text-2xl"></i>
     <div className="w-80 ml-3 disabled:bg-gray-300">
       <p className="">{`${title}'s Image'`}</p>
       <Progress percent={progress.toString()}/>
       <p className="mt-1">{(progressObj.loaded/(1024 * 1024)).toFixed(2)}mb of {(progressObj.total/(1024 * 1024)).toFixed(2)}mb</p>
     </div>
     </div>
     <div className="flex justify-end mt-1">
       <button disabled className="bub-txt-red disabled:text-gray-100 cursor-not-allowed">Cancel</button>
     </div>
   </div>
   )}
    </div>
  )
 
}
function HostDetailWidget({action,host,id,errors}:HostProps){
const handleEditField=(e:any,field:string)=>{

action((prev:Host[])=>
  prev.map(h=>{
   if(h.id == id){
     h[field] = e.target.value
   }
   return h
  })
)}
function handleUpload(url:string){
  action((prev:Host[])=>prev.map(h=>{
    if(h.id == id){
     h.imageUrl =url
    }
    return h
   }))
}
return(
<div className="host-form">
    <div className="bub__input-container my-4">
      <label className="font-bold block mb-2">Host Name</label>
      <input 
      type="text" 
      className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
      value={host?.hostname}
      onChange={(e)=>handleEditField(e,"hostname")}
      />
      <p className="text-red-500">{errors?.hostname}</p>
    </div>
    <h3 className="font-bold text-gray-400 my-3">Add Host Image</h3>
    <DropzoneWidget action={handleUpload} errors={""} title={host?.hostname}/>
    <p className="text-red-500">{errors?.imageUrl && ("Please Upload a Host Image")}</p>
    <div className="bub__input-container mb-4 bub-min-w-10">
      <label className="font-bold block mb-1">Description</label>
      <textarea 
      className="bub-min-vh-30 rounded bub-w-95 border resize-none outline-none border-gray-400"
      value={host?.desc}
      onChange={(e)=>handleEditField(e,"desc")}
      ></textarea>
       <p className="text-red-500">{errors?.desc}</p>
  </div>
</div>
  )
}
function UploadBannerWidget({action}:WidgetProps){
  return(
    <div className="rounded bg-white p-3 bub-min-vh-40">
    <h3 className="font-bold">Add Cover Image</h3>
    <DropzoneWidget action={action} title={"Event"}/>
  </div>
  )
}
export default function AddEvent():JSX.Element{
  const currentDate:any = new Date()
  const {Option} = Select

  //states values
  const [name,setEventName] = useState("")
  const [contact,setContact] = useState("")
  const [date,setDate] = useState<any>({
      day:currentDate.getDate() + 2,
      month:currentDate.getMonth() + 1,
      year:currentDate.getFullYear(),

  })
  const [location,setLocation] = useState("")
  const [location_link,setLocationLink] = useState("")
  const [reg_link,setRegLink] = useState("")
  const [desc,setDesc] = useState("")
  const [time,setTime] = useState<any>({
    hour:1,
    minute:{
      1:0,
      2:0,
    },
    meridian:"am"
  })
  const [loading,setLoading] = useState(false)

  const [imageUrl,setImageUrl] = useState("")
  const [hosts,setHost] = useState<Host[]>([])
  const [errors,setErrors] = useState<ErrorObj>({})

  //refs
  const slider = useRef<any>({})

  //editing text fields function
  function handleRemoveHost(id:number|string){
    setHost((prev:Host[])=>{
      return prev.filter((h,i)=>i!=id)
    })
    console.log(id)
  }
    function generateNumber(start:number,end:number):number[]{
      const arr:number[] = []
      for(let i=start;i<=end;i++){
         arr.push(parseFloat(i.toFixed(2).toString()))
      }
      return arr
    }
    function handleSetTimeDetails(value:any,detail:any){
      setTime((prev:any)=>{
        const current = {...prev}
        current[detail] = value
        return current
      })
    }
    function handleSetMinute(value:any,digit:number){
      setTime((prev:any)=>{
        const current = {...prev}
        current.minute[digit] = value
        return current
      })
    }
    function handleSetDateDetails(value:string|number,detail:string){
         setDate((prev:any)=>{
          const current = {...prev}
          current[detail] = value
          return current
         })
    }

    //submit function
    async function handleSubmit(e:any){
      const hostErrors = hosts.length > 0 ? validateFields([
        ...hosts.map((host,i)=>{
          return{
           inputField:host.desc as string,
           inputType:"address",
           inputName:`desc-${i}`
          }
         }),
         ...hosts.map((host,i)=>{
          return{
           inputField:host.hostname as string,
           inputType:"address",
           inputName:`hostname-${i}`
          }
         }),
         ...hosts.map((host,i)=>{
          return{
           inputField:host.imageUrl as string,
           inputType:"link",
           inputName:`imageUrl-${i}`
          }
         })
      ]):[]

        const fieldErrors = validateFields([
          {inputField:name,inputType:"text",inputName:"Event_Name"},
          {inputField:contact,inputType:"phone",inputName:"Contact_Number"},
          {inputField:location,inputType:"address",inputName:"Location"},
          {inputField:reg_link,inputType:"link",inputName:"Registration_Link"},
          {inputField:imageUrl,inputType:"link",inputName:"Image_Link"},
          {inputField:location_link,inputType:"text",inputName:"Location_Link"},
          {inputField:desc,inputType:"address",inputName:"Description"},
        ])
        const allErrors = [
          ...fieldErrors,
          ...hostErrors
        ]


        const errObj:ErrorObj={}
        allErrors.forEach((err)=>{
          const errIndex:string = err.field as string
          errObj[errIndex] = err.error
        })
        const oneDay = 1000 * 60 * 60 * 24
        setErrors(errObj)
        const userDate:any = new Date(date.year,date.month - 1,date.day)
        const dateDiff = (userDate - currentDate)/oneDay
        const {hour,minute,meridian} = time
        if(allErrors.length == 0){
          if(dateDiff > 2){
           setLoading(true)
           const response = await Events.addEvent({
            name,
            contact,
            date,
            location,
            reg_link,
            location_link,
            desc,
            img_link:imageUrl,
            event_time:`${hour}:${minute[1]}${minute[2]}${meridian.toString().toLowerCase()}`,
            hosts:JSON.stringify(hosts)
           })
           setLoading(false)
           if(response.status == "success"){
            message.success("Event Created Successfully")
            setTimeout(()=>{
              Router.push(`/dashboard/events/${response.event_id}`)
            },2000)
           }else{
            message.error(response.error)
           }
          }else{
            message.error("Please Schedule an Event atleast 2 days from the current date")
          }
        }else{
          message.error("please check for errors in fields")
        }
      
    }


    return(
    <DashboardLayout pageTitle={"Add Event"} currentPage={"events"}>
      <>
      <Modal visible={loading}
       footer={false}
       centered
       closable={false}
       closeIcon={false}
       >
        <div className="h-20 flex items-center justify-center">
         <div className="text-center">
         <Spin 
          size="large"
          /><br/>
          <p className="">Creating Event</p>
          <p>This might take up to a few minutes</p>
         </div>
        </div>
       </Modal>
      <div className="my-3 flex items-center">
        <Link href={"/dashboard/events"}><a>Events </a></Link>
        <span className="block mx-1"> &gt;</span>
        <span className="font-bold">Add Event</span></div>
      <div className="bub-grid mt-4 ">
        <div className="bg-white bub-min-vh-85 grid-col-7 p-3 rounded-lg grid-col-md-12">
           <form action="" className="bub__add-book_form w-full">
             <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Event Name</label>
                <input 
                type="text" 
                className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                value={name}
                onChange={(e)=>setEventName(e.target.value)}
                />
                <p className="text-red-500 text-xs">{errors.event_name?.replace("_"," ")}</p>
             </div>
             <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Contact Number</label>
                <input 
                type="number" 
                className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                value={contact}
                onChange={(e)=>setContact(e.target.value)}
                />
                <p className="text-red-500 text-xs">{errors.contact_number?.replace("_"," ")}</p>
             </div>
             <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Location</label>
                <input 
                  type="text" 
                  className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  />
                  <p className="text-red-500 text-xs">{errors.location?.replace("_"," ")}</p>
             </div>
            <div className="bub__input-container mt-10 mb-4">
                <label className="font-bold block mb-1">Registration Link</label>
                <div className="flex bub__input-field items-center border rounded-lg bub-w-95 border-gray-200 p-1">
                  <i className="bi bi-link-45deg text-2xl text-gray-200 block bub-w-10"></i>
                  <input 
                  type="text" 
                  className="outline-none block p-1 bub-w-90"
                  value={reg_link}
                  onChange={(e)=>setRegLink(e.target.value)}
                  />
                </div>
                <p className="text-red-500 text-xs">{errors.registration_link?.replace("_"," ")}</p>
             </div>
               
            <div className="bub__input-container mt-10 mb-4">
                <label className="font-bold block mb-1">Location Link</label>
                <div className="flex bub__input-field items-center border rounded-lg bub-w-95 border-gray-200 p-1">
                  <i className="bi bi-link-45deg text-2xl text-gray-200 block bub-w-10"></i>
                  <input 
                  type="text" 
                  className="outline-none block p-1 bub-w-90" 
                  value={location_link}
                  onChange={(e)=>setLocationLink(e.target.value)}
                  />
                  
                </div>
                <p className="text-red-500 text-xs">{errors.location_link?.replace("_"," ")}</p>
             </div>
             
             <label className="font-bold">Event Date</label>
             <div className="p-2 bub-w-95 mb-1 rounded-xl bub-min-vh-10 mt-2 bub__product-details">
                <div className="bub__input-container mb-4 bub-min-w-40">
                    {/* <label className="font-bold block mb-1">Day</label> */}
                    <Select 
                    value={date.day} 
                    className="border rounded relative block bub-w-95 border-gray-400"
                    onChange={(value)=>handleSetDateDetails(value,"day")}
                    >
                        <Option value="">Day</Option>
                        {generateNumber(1,31).map((h,i)=>
                        <Option value={h} key={i}>{h}</Option>
                         )}
                    </Select>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <Select 
                  value={date.month} 
                  className="border  relative rounded block bub-w-95 border-gray-400"
                  onChange={(value)=>handleSetDateDetails(value,"month")}
                  >
                   <Option value="">Month</Option>
                   {generateNumber(1,12).map((h,i)=>
                    <Option value={h} key={i}>{h}</Option>
                   )}
                  </Select>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <Select 
                  value={date.year} 
                  className="border  relative rounded block bub-w-95 border-gray-400"
                  onChange={(value)=>handleSetDateDetails(value,"year")}
                  >
                  <Option value="">Year</Option>
                  {generateNumber(
                    currentDate.getFullYear(),
                    (currentDate.getFullYear() + 5))
                    .map((h,i)=>
                    <Option value={h} key={i}>{h}</Option>
                   )}
                  </Select>
                </div>
            
             </div>
             <section>
              <h3 className="font-bold pb-3">Time</h3>
             <div className="flex items-center pb-3">
              <Select 
              value={time.hour} 
              className="relative"
              onChange={(e)=>handleSetTimeDetails(e,"hour")}
              >
              {generateNumber(1,12).map((h,i)=>
                 <Option value={h} key={i}>{h}</Option>
                 )}
              </Select>
              <p className="mx-2">:</p>
              <Select className="" 
              value={time.minute[1]}
              onChange={(e)=>handleSetMinute(e,1)}
              >
                 {generateNumber(0,5).map((h,i)=>
                 <Option value={h} key={i}>{h}</Option>
                 )}r
              </Select>
              <Select className="ml-3 relative" 
              value={time.minute[2]}
              onChange={(e)=>handleSetMinute(e,2)}
              >
                 {generateNumber(0,9).map((h,i)=>
                 <Option value={h} key={i}>{h}</Option>
                 )}
              </Select>
              <Select 
                className="ml-3 relative" 
                value={time.meridian}
                onChange={(e)=>handleSetTimeDetails(e,"meridian")}
                >
                 <Option value={"am"}>AM</Option>
                 <Option value={"pm"}>PM</Option>
              </Select>
             </div>
             </section>
             <div className="bub__input-container mb-4 bub-min-w-10">
                  <label className="font-bold block mb-1">Description</label>
                  <textarea 
                  className="bub-min-vh-30 rounded bub-w-95 border resize-none outline-none border-gray-400"
                  value={desc}
                  onChange={(e)=>setDesc(e.target.value)}
                  ></textarea>
                  <p className="text-red-500 text-xs">{errors.description?.replace("_"," ")}</p>
             </div>
          
           </form>
        </div>
        <div className="bub-min-vh-45 min-h-screen rounded-lg grid-col-5 grid-col-md-12">
          <div className="bg-white rounded-lg p-2 bub-min-vh-15 mb-3">
             <header className="mt-3 flex items-center w-full justify-between">
                <button 
                className="bub-bg-primary rounded-lg p-2 px-4" 
                onClick={()=>
                setHost(
                  prev=>[...prev,{
                    id:prev.length,
                    hostname:"",
                    desc:"",
                    imageUrl:""
                  }])
                }>
                   <i className="bi bi-plus"></i>
                   <span>Add Host</span>
                </button>
               {hosts.length > 1 && (
                 <div className="flex w-1/5 justify-end">
                 <button onClick={()=>slider.current.prev()}><i className="bi bi-chevron-left mr-2 text-lg"></i></button> 
                 <button onClick={()=>slider.current.next()}><i className="bi bi-chevron-right text-lg"></i></button> 
              </div>
               )}
             </header>
             {hosts.length > 0 && (
              <Carousel
              dots={false}
              ref={ref=>{
                slider.current = ref
              }}
              >
                
               {hosts.map((h,i)=>
               <div key={`${i}-hosts`}>
                 <div className="text-right flex justify-end mt-2 mb-1 mr-3">
                 <button  onClick={()=>handleRemoveHost(i)}>
                 <i className="bi bi-x-lg text-red-500 text-lg"></i>
                 </button>
                 </div>
                 <HostDetailWidget 
                   id={i} 
                   host={h} 
                   errors ={
                    {
                    hostname:errors[`hostname-${i}`]?errors[`hostname-${i}`].replace(`-${i}`,""):"",
                    desc:errors[`desc-${i}`]?errors[`desc-${i}`].replace(`desc-${i}`,"description"):"",
                    imageUrl:errors[`imageurl-${i}`]?errors[`imageurl-${i}`].replace(`-${i}`,""):''
                    }
                  }
                   action={setHost}
                  />
                </div>
                )}
              </Carousel>
             )}
            
          </div>
          <UploadBannerWidget action={setImageUrl}/>
          <p className="text-red-500 text-xs">{errors.image_link}</p>

          <div className="bg-white rounded p-3 py-10 mt-4 bub-min-vh-30">
            <div className="m-auto" style={{maxWidth:"440px"}}>
             <button className="block bub-w-85 m-auto text-center p-2 rounded bub-card">See Preview</button><br />
             <button className="block bub-w-85 m-auto text-center p-2 bub-bg-accent rounded bub-card">See Preview</button><br />
             <button 
             className="block bub-w-85 m-auto text-center p-2 bub-bg-primary rounded bub-card"
             onClick={handleSubmit}
             >Save and Publish</button><br />
             <button className="block bub-w-85 m-auto text-center p-2 rounded bub-card">Clear</button>
            </div>
          </div>
       </div>
      </div>  
      </>
    </DashboardLayout>
    )
}