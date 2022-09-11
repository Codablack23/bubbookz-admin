import { message, Modal, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import Categories from "~/utils/Categories";
import { validateFields } from "~/utils/validator";

interface Props{
    id:string,
    faculty:{
      [key:string]:any
    }|any
}
interface Inputs{
  [key:string]:any,
  value:string
}
export function FacultyCategory(props:Props){
  const {faculty} = props 
  console.log(props.faculty.departments)
  const [departments,setDepartments] = useState(
    props.faculty.departments?
    props.faculty.departments.split(',')
    :[]
  )
    function showList(e:Event,id:string){
      const el = document.getElementById(`fc-${id}`) as HTMLDListElement
      if(el.style.maxHeight){
        el.style.maxHeight = "";
      }
      else{
        el.style.maxHeight = el.scrollHeight + "px";
      }
      const el_e = e.target as HTMLButtonElement
    }
    return(
        <div className="p-3 rounded-lg w-full my-3 bg-white">
        <header className="flex items-center justify-between">
           <p className="font-bold">Faculty of {faculty.name}</p>
           <button className="p-3" onClick={(e:any)=>showList(e,props.id)}>
               <i className="bi bi-caret-down-fill"></i>
           </button>
        </header>
        <ul className={`max-h-0 overflow-hidden`} id={`fc-${props.id}`} style={{transition:"all ease 0.3s"}}>
           {departments.length > 0 && departments.map((dept:any,i:number|string)=>(
                 <li key={`${i}-dept-${faculty.faculty_id}`} className="flex items-center justify-between my-2 bub-hover-fc">
                 <p>{dept}</p>
                 <div className="flex items-center actions">
                 <i className="bi bi-pencil cursor-pointer"></i>
                 <i className="bi bi-trash mx-3 cursor-pointer"></i>
                 </div>
             </li>
           ))}
        </ul>
       </div>
    )
}

export default function CategoriesPage():JSX.Element{
    const {TabPane} = Tabs
    const [school,setSchool] = useState("")
    const [faculty,setFaculty] = useState("")
    const [facultyErr,setFacultyErr] = useState("")
    const [uploadStats,setUploadStats] = useState(0)
    const [isLoading2,setIsLoading2] = useState(false)
    const [isLoading3,setIsLoading3] = useState(false)
    const [schools,setSchools] = useState<any[]>([])
    const [departments,setDepartments] = useState<Inputs[]>([])
    const [deptErr,setDeptErr] = useState<any[]>([])
    const [faculties,setFaculties] = useState<any[]>([])
    const [isLoading,setisLoading] = useState(true)
    const [isSchoolVisible,setIsSchoolVisible] = useState(false)
    const [isFcVisible,setIsFcVisible] = useState(false)
    const [school_error,setSchoolErr] = useState('')

    async function handleAddFaculty(e:any){
     e.preventDefault()
     const facultyError = validateFields([
      {inputField:faculty,inputType:"text"}
     ])
     setFacultyErr(
      facultyError[0]?facultyError[0].error as string:""
     )

     const errors = departments.length >0?validateFields([
      ...departments.map((e,i)=>{
        return{
          inputType:"text",
          inputField:e.value,
          inputName:`department-${i+1}`
        }
      })
     ]):[]


     setDeptErr(errors)
     if(facultyError.length == 0 && errors.length === 0){
      setIsLoading3(true)
      const response = await Categories.addFaculty({
        faculty,
        departments:departments.map(dept=>dept.value).toString()
      })
      setIsLoading3(false)
      setIsFcVisible(false)
      if(response.status == "success"){
        setUploadStats(prev=>prev+1)
        message.success("Faculty added successfully")
      }
      else{
        message.error(response.error)
      }
     }
  
    }
    function handleDeptEdit(e:any,i:number){
      setDepartments(
        prev=>prev.map((dept,id)=>{
          if(id==i){
            dept.value = e.target.value
          }
          return dept
        })
      )
    }
    function showDeptErr(i:string|number){
       const index = parseInt(i as string)
       const err = deptErr.find(dept=>dept.field == `department-${index+1}`)
       return err?err.error:''
    }
   function removeDepartment(key:string|number){
       setDepartments(
        prev=>prev.filter((d,i)=>i!=key)
       )
   }
   async function handleAddSchool(e:any){
         e.preventDefault()
         const errors = validateFields([
          {inputField:school,inputType:"text",inputName:"school"}
         ])
         let errText = (errors[0])?(errors[0].error as string):""
         setSchoolErr(errText)
         if(errors.length == 0){
            setIsLoading2(true)
            const response = await Categories.addSchool({school})
            setIsLoading2(false)
            setIsSchoolVisible(false)
            if(response.status == "success"){
              message.success("School added successfully")
              setUploadStats(prev=>prev+1)
            }else{
             
              message.error(response.error)
            }
         }

    }
    async function getCategories(){
      setisLoading(false)
      const response = await Categories.getCategories()
      setisLoading(false)
      if(response.status == "success"){
        setSchools(response.schools)
        setFaculties(response.faculties)
      }
      console.log(response)
    }
    useEffect(()=>{
      getCategories()
    },[uploadStats])
    return(
        <DashboardLayout pageTitle="Categories" currentPage="categories">
            <div className="p-2">
            <Modal footer={false} maskClosable={false} visible={isSchoolVisible} onCancel={()=>setIsSchoolVisible(prev=>!prev)}>
              <form action="" className="bub-w-95 m-auto my-6">
              <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">School</label>
                <input 
                type="text" 
                className="border rounded w-full outline-none block p-1  border-gray-400"
                value={school}
                onChange={(e)=>setSchool(e.target.value)}
                />
                <p className="text-xs text-red-300">{school_error}</p>
                {isLoading2?
                <button className="block bub-bg-primary my-3 p-2 w-full rounded-lg" type="button">
                  <Spin/>
                </button>:
                <button 
                className="block bub-bg-primary my-3 p-2 w-full rounded-lg"
                onClick={handleAddSchool}
                >Add</button>
                }
             </div>
              </form>
            </Modal>
            <Modal 
             footer={false}
             visible={isFcVisible} 
             onCancel={()=>setIsFcVisible(prev=>!prev)}
             maskClosable={false}
             >
              <form action="" className="bub-w-95 m-auto my-6">
                <h1 className="my-3 text-center font-bold text-xl">Faculty</h1>
              <div className="bub__input-container mb-4">
                <label className="font-bold block mb-1">Name of Faculty</label>
                <input 
                type="text" 
                className="border rounded w-full outline-none block p-1  border-gray-400" 
                value={faculty}
                onChange={(e)=>setFaculty(e.target.value)}
                />
                <p className="text-xs text-red-500">{facultyErr}</p>
             </div>
             {departments.map((dep,i)=>(
               <div className="bub__input-container mb-4" key={i}>
               <label className="font-bold block mb-1">Department {i+1}</label>
               <div className="w-full flex items-center">
                <input 
                type="text" 
                className="border rounded bub-w-95 outline-none block p-1  border-gray-400" 
                value={dep.value}
                onChange={(e)=>handleDeptEdit(e,i)}
                />
                <i className="ml-2 bi bi-x-lg text-gray-300"
                onClick={()=>removeDepartment(i)}
                ></i>
              </div>
              <p className="text-xs text-red-500">{showDeptErr(i)}</p>
            </div>
             ))}
              <div className="text-center">
              <button className="text-gray-500 text-center font-extrabold" type="button"
              onClick={()=>setDepartments(prev=>[...prev,{value:""}])}
              >
                <i className="bi bi-plus-circle"></i>
                <span className="ml-2">add Department</span>
              </button>
              {isLoading3?
               <button className="block bub-bg-primary my-3 p-2 w-1/2 m-auto rounded-lg"
               type={'button'}>
                <Spin/>
               </button>
              :<button className="block bub-bg-primary my-3 p-2 w-1/2 m-auto rounded-lg"
               onClick={handleAddFaculty}
               >Add</button>
              }
             
              </div>
              </form>
            </Modal>
           {isLoading?
           <div className="h-16 mt-10 rounded-lg bg-white justify-center flex items-center">
            <Spin size="large"/>
           </div>
           :<Tabs defaultValue={"1"}>
            <TabPane tab={"Schools"} key={"1"}>
              <ul className="rounded-lg bg-white bub-min-vh-20 overflow-auto py-6 bub-max-vh-60 px-1 w-full bub-cat-list">
               {schools.length < 1?
                <div className="text-center h-16  flex items-center justify-center">
                <p className="font-bold text-lg">No School Added </p>
             </div>
               :schools.map(school=>(
                <li key ={school.school_id} className="border-b border-gray-200 p-2">
                <p className="font-bold capitalize">{school.schoolname}</p>
               </li>
               ))
               }
              </ul>
              <div className="p-2 my-6 text-center">
                <button className="text-gray-500 font-extrabold" onClick={()=>setIsSchoolVisible(true)}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="ml-2">add school</span>
                </button>
              </div>
            </TabPane>
            <TabPane tab={"Faculty"} key={"2"}>
            {faculties.length > 0 ?(
                faculties.map(f=>(
                  <FacultyCategory key={f.faculty_id} id={f.faculty_id as string}  faculty={f} />
                ))
            ):
            <div className="text-center h-16 bg-white rounded-lg flex items-center justify-center">
            <p className="font-bold text-lg">No Faculty Added yet</p>
           </div>
            }
            <div className="p-2 my-6 text-center">
                <button className="text-gray-500 font-extrabold" onClick={()=>setIsFcVisible(true)}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="ml-2">add faculty</span>
                </button>
              </div>
            </TabPane>
            </Tabs>
           }
        </div>
        </DashboardLayout>
    )
}