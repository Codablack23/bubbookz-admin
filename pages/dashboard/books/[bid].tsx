import { message} from "antd";
import  BookFunction from '~/utils/Book'
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import {Modal,Button} from "antd"
import LoadingState from "~/components/widgets/loaders/BookLoader";
import Reviews from "~/components/dashboard/booksPage/Review";
import BookDetail from "~/components/dashboard/booksPage/BookDetail";


interface Reviews{
  rating?:string|number,
  review?:string,
  answer?:string|number,
  [key:string]:any
}

export default function Book():JSX.Element{
  
  const router = useRouter()
  const [reviews,setReviews] = useState<Reviews[]>([])
  const [book,setBook] = useState<any>({})
  const [isLoading,setIsLoading] = useState(true)
  const [isOpen,setIsOpen] = useState(false)
  const [loadingDel,setLoadingDel] = useState(false)

 const deleteBook = async ()=>{
  setLoadingDel(true)
   const response = await BookFunction.deleteBook(router.query.bid as string)
   setLoadingDel(true)
   if(response.status === "success"){
     setIsOpen(false)
     message.success(response.message)
     window.location.replace("/dashboard/books")
   }else{
    message.error(response.error)
   }
 }

  useEffect(()=>{
    async function getBook(){
      if(router.query.bid){
        const response = await BookFunction.getBook(router.query.bid as string)
        setIsLoading(false)
        if(response.status === "success"){
          if(response.book){
            setBook(response.book)
            setReviews(response.reviews)
          }
        }
      }
    }
    getBook()
  },[router])
    return(
    <DashboardLayout pageTitle={`Book | ${isLoading?"loading":book.title?book.title:"404"}`} currentPage={"books"}>
    <div className="mt-5">
    <Modal centered={true} footer={
      [
        <Button key="1" type="primary" className="text-blue-500" onClick={()=>setIsOpen(prev=>!prev)}>Cancel</Button>,
        <Button key="1" type="primary" loading={loadingDel} className="bg-red-500 text-white border-none" onClick={deleteBook}>Continue</Button>,
      ]
    } maskClosable={false} visible={isOpen} onCancel={()=>setIsOpen(prev=>!prev)}>
       <div className="text-center">
         <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
         <p>Are you sure you want to delete <span className="font-bold text-red-600">{book.title}?</span></p>
         <p>This process cannot be reversed</p>
       </div>
    </Modal>
    <div className="my-3 flex items-center">
         <Link href={"/dashboard/books"}><a>Books </a></Link>
         <span className="block mx-1"> &gt;</span>
         <Link href={"/dashboard/books/add-book"}><a>Add Book</a></Link>
         <span className="block mx-1"> &gt;</span>
         <span className="font-bold">Book Details</span>
      </div>
     {isLoading?<LoadingState/>:
      Object.entries(book).length > 0?
      <BookDetail 
      book={book}
      openModal = {()=>setIsOpen(true)}
      reviews={reviews}
      />
      :<div className="flex bub-vh-80 bg-white justify-center items-center">
         <div>
          <p  className="text-center text-6xl font-bold">404</p>
          <p className="text-center">Book Not Found</p>
          </div>
      </div>
     }
    </div>
    </DashboardLayout>
    )
}