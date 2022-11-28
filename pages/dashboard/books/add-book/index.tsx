import { Image, message, Modal, Progress, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import BookFunction from "~/utils/Book";
import { validateFields } from "~/utils/validator";

function getApi(){
  return process.env.NEXT_PUBLIC_API
}
const filetypes =["jpeg","jpg","png","svg","jif"]
interface Errors{
   title?:string,
   author?:string,
   isbn?:string,
   weight?:string,
   dimensions?:string,
   gtn?:string,
   publisher?:string,
   copyright?:string,
   link?:string,
   book_desc?:string,
   dept?:string,
   level?:string,
   faculty?:string,
   price?:string,
   quantity?:string,
   expenses?:string,
   pages?:string,
   semester?:string,
   format?:string,
   book_img?:string,
   [key:string]:any
}

export default function AddBook():JSX.Element{

  const router = useRouter()
  const [shown,setShown] = useState(false)
  const [imageUrl,setImageUrl] = useState<string|null>("")
  const [isUploading,setIsUploading] = useState(false)
  const [progress,setProgress] = useState<any>(0)
  const [progressObj,setProgressObj] = useState<any>({})

  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [ISBN,setISBN] = useState("")
  const [weight,setWeight] = useState<string|number>("")
  const [pages,setPages] = useState<string|number>("")
  const [dimension,setDimension] = useState("")
  const [GTN,setGTN] = useState("")
  const [format,setFormat] = useState("")
  const [publisher,setPublisher] = useState("")
  const [copyright,setCopyRight] = useState("")
  const [link,setLink] = useState("")
  const [book_description,setDescription] = useState("")
  const [dept,setDept] = useState("")
  const [level,setLevel] = useState("")
  const [faculty,setFaculty] = useState("")
  const [semester,setSemester] = useState("")
  const [price,setPrice] = useState<string|number>(0)
  const [quantity,setQuantity] = useState<string|number>(0)
  const [expenses,setExpenses] = useState<string|number>(0)
  const [tags,setTags] = useState<string[]>([])
  const [tagList,setTagList] = useState<string[]>([])
  const [tagname,setTagname] = useState("")
  const [errors,setErrors] = useState<Errors>({})
  const [tagErr,setTagErr] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  
  function handleAddTags(value:string){
   if(tags.length <6){
    if(tags.includes(value)){
      setTags((prev=>prev.filter((p:string)=>p!==value)))
    }else{
      setTags(prev=>[...prev,value])
    }
   }
  }
  async function handleSubmit(e:any){
     const fieldErrors = validateFields([
      {inputField:title,inputType:"text",inputName:"Title"},
      {inputField:author,inputType:"text",inputName:"author"},
      {inputField:ISBN,inputType:"address",inputName:"ISBN"},
      {inputField:weight as string,inputType:"number",inputName:"weight"},
      {inputField:dimension,inputType:"text",inputName:"dimensions"},
      {inputField:GTN,inputType:"address",inputName:"GTN"},
      {inputField:publisher,inputType:"text",inputName:"publisher"},
      {inputField:copyright,inputType:"text",inputName:"copyright"},
      {inputField:link,inputType:"link",inputName:"book_link"},
      {inputField:book_description,inputType:"text",inputName:"book_desc"},
      {inputField:dept,inputType:"text",inputName:"dept"},
      {inputField:level,inputType:"number",inputName:"Level"},
      {inputField:faculty,inputType:"text",inputName:"faculty"},
      {inputField:semester,inputType:"number",inputName:"semester"},
      {inputField:price as string,inputType:"number",inputName:"Price"},
      {inputField:quantity as string,inputType:"number",inputName:"Quantity"},
      {inputField:expenses as string,inputType:"number",inputName:"expenses"},
      {inputField:pages as string,inputType:"number",inputName:"pages"},
      {inputField:format,inputType:"text",inputName:"format"},
      {inputField:(imageUrl as string),inputType:"link",inputName:"book_img"},
     ])
     const errObj:Errors = {}

     fieldErrors.forEach(err=>{
      const err_key:string = err.field as string
      errObj[err_key] = err.error
     })
     console.log(link)
     setErrors(errObj);
     if(fieldErrors.length === 0){
      if(tags.length < 1){
        message.warning("Please add atleast one tag")
      }else{
        setIsLoading(true)
        const response = await BookFunction.addBook({
          title,
          author,
          details:JSON.stringify({
            ISBN,
            GTN,
            publisher,
            copyright,
            pages,
            weight,
            dimension
          }),
          faculty,
          department:dept,
          level,
          book_description,
          semester,
          format,
          price,
          book_link:link,
          expenses,
          discount_price:0.00,
          quantity,
          tags:tags.toString(),
          book_img:imageUrl,
        })
        setIsLoading(false)
        if(response.status == "success"){
          message.success("book successfully added")
          setTimeout(()=>{
            router.push(`dashboard/books/${response.book_id}`)
          },2000)
        }
        else{
          message.error(response.error)
        }
      }
     }
  }
  function handleAddTag(){
    const err = validateFields([
      {inputField:tagname,inputType:"text",inputName:"tag"}
    ])
    setTagErr(err.length > 0?err[0].error as string:"")
    if(err.length == 0){
       if(tagList.includes(tagname.toLowerCase())){
         setTagErr("tag already exist please another tag")
       }else{
        setTagErr("")
        setTagList((prev)=>[...prev,tagname.toLowerCase()])
        setShown(false)
       }
    }
  }
  const [file,setFile] = useState<FileList[]|{}>({})
   
  async function handleUpload(e:any){
    e.preventDefault()
    setIsUploading(true)
    const response =  await axios.post(`${getApi()}/upload`,file,{
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
      console.log(response.file.url)
     }
  }

    return(
    <DashboardLayout pageTitle={"Add Book"} currentPage={"books"}>
      <>
      <div className="my-3 flex items-center">
        <Link href={"/dashboard/books"}><a>Books </a></Link>
        <span className="block mx-1"> &gt;</span>
        <span className="font-bold">Add Book</span></div>
      <div className="bub-grid mt-4 ">
        <Modal
        footer={false}
        visible={isLoading}
        maskClosable={false}
        centered
        closable={false}
        >
         <div className="flex justify-center items-center">
            <div className="text-center">
            <Spin size="large"/>
            <h3>Uploading Book</h3>
            <p>This might take a few minutes</p>
            </div>
         </div>
        </Modal>
        <Modal visible={shown} maskClosable={false} footer={false} onCancel={()=>setShown(false)}>
             <form action="">
             <h3 className="font-bold text-center">Add Tag</h3>
              <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Name of Tag</label>
                <input 
                type="text" 
                className="border rounded outline-none block p-1 bub-w-100 border-gray-400"
                value={tagname}
                onChange={(e)=>setTagname(e.target.value)}
                />
                <p className="text-xs text-red-300">{tagErr}</p>
             </div>
             <div className="text-center">
              <button className="bub-btn-primary rounded px-3 py-1" type="button"
              onClick={handleAddTag}
              >Add Tag </button>
             </div>
             </form>
        </Modal>
        <div className="bg-white bub-min-vh-85 grid-col-7 p-3 rounded-lg grid-col-md-12">
           <form action="" className="bub__add-book_form w-full">
             <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Book Title</label>
                <input 
                type="text"
                className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
                <p className="text-red-300 text-xs">{errors.title}</p>
             </div>
             <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Author</label>
                <input 
                 type="text"
                 className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                 value={author}
                 onChange = {(e)=>{setAuthor(e.target.value)}}
                 />
                   <p className="text-red-300 text-xs">{errors.title}</p>
             </div>
             <label className="font-bold">Product Details</label>
             <div className="border border-gray-400 p-2 bub-w-95 mb-4 rounded-xl bub-min-vh-20 mt-3 bub__product-details">
                <div className="bub__input-container mb-4 bub-min-w-40">
                    <label className="font-bold block mb-1">ISBN</label>
                    <input 
                    type="text"
                    className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                    value={ISBN}
                    onChange = {(e)=>{setISBN(e.target.value)}}
                    />
                      <p className="text-red-300 text-xs">{errors.title}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <label className="font-bold block mb-1">GTN</label>
                  <input
                   type="text"
                   className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                   value={GTN}
                   onChange={(e)=>setGTN(e.target.value)}
                   />
                    <p className="text-red-300 text-xs">{errors.title}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                    <label className="font-bold block mb-1">Publisher</label>
                    <input 
                    type="text" 
                    className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                    value={publisher}
                    onChange={(e)=>setPublisher(e.target.value)}
                    />
                    <p className="text-red-300 text-xs">{errors.title}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <label className="font-bold block mb-1">Copyright</label>
                  <input 
                  type="text" 
                  className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                  value={copyright}
                  onChange={(e)=>setCopyRight(e.target.value)}
                  />
                  <p className="text-red-300 text-xs">{errors.copyright}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                    <label className="font-bold block mb-1">Pages</label>
                    <input 
                    type="number" 
                    className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                    value={pages}
                    onChange={(e)=>setPages(e.target.value)}
                    />
                    <p className="text-red-300 text-xs">{errors.pages}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                    <label className="font-bold block mb-1">Weight</label>
                    <input 
                    type="number" 
                    className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                    value={weight}
                    onChange={(e)=>setWeight(e.target.value)}
                    />
                    <p className="text-red-300 text-xs">{errors.weight}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <label className="font-bold block mb-1">Dimension</label>
                  <input 
                  type="text" 
                  className="border rounded outline-none block p-1 bub-w-95 border-gray-400" 
                  value={dimension}
                  onChange={(e)=>setDimension(e.target.value)}
                  />
                  <p className="text-red-300 text-xs">{errors.dimensions}</p>
                </div>
             </div>
             <label className="font-bold mt-4">Categories</label>
             <div className="p-2 bub-w-95 rounded-xl bub-min-vh-5 mt-3 bub__product-details">
                <select  
                  className={`
                  border rounded outline-none block p-1 w-full
                  ${!errors.faculty?"border-gray-400":"border-red-300"}
                  `}
                  value={faculty}
                  onChange={(e)=>{setFaculty(e.target.value)}}
                  >
                    <option value="">Faculty</option>
                    <option value="Engineering">engineering</option>
                </select>
                <select 
                  className={`
                  border rounded outline-none block p-1 w-full
                  ${!errors.dept?"border-gray-400":"border-red-300"}
                  `}
                  value={dept}
                  onChange={(e)=>{setDept(e.target.value)}}>
                 <option value="">Department</option>
                 <option value="mechatronic">Mechatronic</option>
                </select>
                <select 
                    className={`
                    border rounded outline-none block p-1 w-full
                    ${!errors.level?"border-gray-400":"border-red-300"}
                    `}
                    value={level}
                    onChange={(e)=>{setLevel(e.target.value)}}
                >
                 <option value="">Level</option>
                 <option value="100">100</option>
                 <option value="200">200</option>
                 <option value="300">300</option>
                 <option value="400">400</option>
                 <option value="500">500</option>
                </select>
                <select 
                    className={`
                    border rounded outline-none block p-1 w-full
                    ${!errors.semester?"border-gray-400":"border-red-300"}
                    `}
                    value={semester}
                    onChange={(e)=>{setSemester(e.target.value)}}
                >
                  <option value="">Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div className="flex mt-3 items-center">
               <label className="font-bold">Format:</label>
               <div className="flex items-center ml-4">
                <input type="checkbox" name="" onClick={()=>setFormat("buy")} checked={format == "buy"} id="" />
                <label className="font-bold text-sm ml-2" htmlFor="">Buy</label>
               </div>
               <div className="flex items-center ml-4">
                <input type="checkbox" name="" id="" onClick={()=>setFormat("download")} checked={format == "download"}/>
                <label className="font-bold ml-2 text-sm" htmlFor="">Download</label>
               </div>
            </div>

            <p className="text-red-300 text-xs">{errors.format?"please pick a format":""}</p>
            <div className="bub__input-container mt-10 mb-4">
                <label className="font-bold block mb-1">Add Link</label>
                <div className="flex bub__input-field items-center border rounded-lg bub-w-65 bub-w-sm-95 border-gray-200 p-1">
                  <i className="bi bi-link-45deg text-2xl text-gray-200 block bub-w-10"></i>
                  <input
                  type="text" 
                  className="outline-none block p-1 bub-w-90"
                  value={link}
                  onChange={(e)=>setLink(e.target.value)}
                  />
                </div>
                <p className="text-red-300 text-xs">{errors.book_link}</p>
             </div>
             <label className="font-bold">Sales Details</label>
             <div className="p-2 bub-w-95 mb-4 rounded-xl bub-min-vh-10 mt-2 bub__product-details">
                <div className="bub__input-container mb-4 bub-min-w-40">
                    <label className="font-bold block mb-1">Quantity</label>
                    <input type="text" className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                     value={quantity}
                     onChange={(e)=>setQuantity(e.target.value)}
                     />
                    <p className="text-red-300 text-xs">{errors.quantity}</p>
                </div>
                <div className="bub__input-container mb-4 bub-min-w-40">
                  <label className="font-bold block mb-1">Price</label>
                  <input 
                  type="text"
                  className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  />
                  <p className="text-red-300 text-xs">{errors.price}</p>
                </div>
             </div>
             <div className="bub__input-container mb-4 bub-min-w-40">
                  <label className="font-bold block mb-1">Expenses for the book</label>
                  <input
                   type="text"
                   className="border rounded outline-none block p-1 bub-w-95 border-gray-400"
                   value={expenses}
                   onChange={(e)=>setExpenses(e.target.value)}
                   />
                   <p className="text-red-300 text-xs">{errors.expenses}</p>
             </div>
             <div className="bub__input-container mb-4 bub-min-w-10">
                  <label className="font-bold block mb-1">Description</label>
                  <textarea 
                  className="bub-min-vh-30 rounded bub-w-95 border resize-none outline-none border-gray-400"
                  value={book_description}
                  onChange={(e)=>setDescription(e.target.value)}
                  ></textarea>
                  <p className="text-red-300 text-xs">{errors.book_desc}</p>
             </div>
             <label className="font-bold block mb-1">Tags</label>
             <div className="bub__tags-container p-2">
             <div className="bub__tags">
                {tagList.length > 0 && (
                  tagList.map((val,i)=>(
                    <p key={`${i}-tags`} 
                    onClick={()=>handleAddTags(val)}
                    className={`bg-gray-200
                     capitalize rounded-xl px-4 py-2 cursor-pointer 
                     text-center ${tags.includes(val)&&"bub-bg-primary"}`}>{val}</p>
                  ))
                )}
                </div>
             <button className="flex mt-3 items-center" type="button"
             onClick={()=>setShown(prev=>!prev)}
             >
                <i className="bi bi-plus-circle text-xl"></i>
                <span className="block ml-2">add tag</span>
             </button>
             </div>
           </form>
        </div>
        <div className="bub-min-vh-45 min-h-screen rounded-lg grid-col-5 grid-col-md-12">
          <div className="rounded bg-white p-3 bub-min-vh-40">
            <h3 className="font-bold">Add Image</h3>
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
                      
                      items-center bub-min-vh-30 rounded mt-3 p-3 outline-none"
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
                   <p className="text-red-300 text-xs">{errors.book_img}</p>
               </form>
               )}
             </Dropzone>
             {isUploading && (
               <div className="border border-gray-300 rounded p-2">
               <div className="flex items-center">
               <i className="bi bi-cloud-arrow-up-fill bub-txt-primary text-2xl"></i>
               <div className="w-80 ml-3 disabled:bg-gray-300">
                 <p className="">The Design</p>
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
          <div className="bg-white rounded p-3 py-10 mt-4 bub-min-vh-30">
            <div className="m-auto" style={{maxWidth:"440px"}}>
             <button className="block bub-w-85 m-auto text-center p-2 rounded bub-card">See Preview</button><br />
             <button 
             className="block bub-w-85 m-auto text-center p-2 bub-bg-accent rounded bub-card"
             onClick={handleSubmit}
             id="preview"
             >See Preview</button><br />
             <button className="block bub-w-85 m-auto text-center p-2 bub-bg-primary rounded bub-card" 
             onClick={handleSubmit}
             id="publish"
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