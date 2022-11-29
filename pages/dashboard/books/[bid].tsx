import { Skeleton, Tabs } from "antd";
import  BookFunction from '~/utils/Book'
import {Image} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookRating from "~/components/dashboard/booksPage/BookRating";
import ReviewMessage from "~/components/dashboard/booksPage/ReviewMessage";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";



function LoadingState(){
      return (
        <div className="p-3 bg-white rounded-lg">
            <header className="bub-grid">
              <div className="grid-col-4 grid-col-md-12">
                <Skeleton.Button 
                style={{height:'300px'}}
                block
                active/>
              </div>
              <div className="grid-col-4 grid-col-md-12">
                <Skeleton
                paragraph={{rows:5}}
                active
                />
              </div>
              <div className="grid-col-4 grid-col-md-12">
                <Skeleton.Button block style={{height:'300px'}} active/>
              </div>
            </header>
            <div className="mt-4">
             <Skeleton
                paragraph={{rows:5}}
                active
                />
            </div>
            <div className="mt-4">
             <Skeleton
                paragraph={{rows:5}}
                active
                />
            </div>
        </div>
      )
}

function BookDetail({book}:any){
  const {TabPane} = Tabs
  const details = book.book_details?JSON.parse(book.book_details):[]
  return (
    <>
     <div className="bg-white rounded-lg w-full p-3">
         <header className="border  border-gray-400 rounded-lg p-2">
           <div className="flex justify-end items-center py-3 px-2">
             <button>
               <i className="bi bi-pencil text-lg"></i>
             </button>
             <button className="ml-2">
               <i className="bi bi-trash text-lg"></i>
             </button>
           </div>
          <div className="bub-grid capitalize">
          <div className="grid-col-3 grid-col-md-12">
             <Image  src={book.book_img} className={"rounded-lg"} width={"100%"} height={"100%"} alt={"book-img"}/>
           </div>
           <div className="grid-col-5 text-center sm:text-left grid-col-md-12">
             <h3 className="font-bold sm:text-2xl bub-txt-accent capitalize">{book.title}</h3>
             <p className="m-0 text-gray-300 capitalize">By: {book.author}</p><br /><br />
             <p className="font-bold">Format:  {book.format}</p>
             <p className="font-bold">Quantity in stock: {book.in_stock}</p><br /><br />
             <p className="font-bold">Faculty:{book.faculty}</p>
             <p className="font-bold capitalize">Department: <span className="capitalize">{book.department}</span></p>
             <p className="font-bold">Level:{book.level}</p>
             <p className="font-bold">Semester:{book.semester}</p>
           </div>
           <div className="grid-col-4 grid-col-md-12">
            <BookRating/>
           </div>
          </div>
          <div className="flex justify-center sm:justify-end py-3 px-2">
           <p>Price: <span className="font-bold text-xl">N{book.price}</span></p>
          </div>
         </header>
         <div className="p-2 my-3">
         <Tabs defaultActiveKey="1" centered>
           <TabPane key={"1"} tab="Description">
               <p className="md:p-5" >{book.book_description}</p>
           </TabPane>
           <TabPane key={"2"} tab="Product Details">
             <div>
               <p>ISBN-10: {details.ISBN}</p>
               <p>GTN-13: {details.GTN}</p>
               <p>Publisher: {details.publisher}</p>
               <p>Copyright: {details.copyright}</p>
               <p>Pages: {details.pages}</p>
               <p>Weight: {details.weight}</p>
               <p>Dimensions(in) (L x W x H):{details.dimension}</p>
             </div>
           </TabPane>
         </Tabs>
         </div>
       </div>  
     
       <div className="p-2 my-3">
         <p className="font-bold">Book Reviews</p>
         <Tabs defaultActiveKey="1">
           <TabPane key={"1"} tab="All Reviews(10)">
             <div className="">
                 <ReviewMessage />
                 <ReviewMessage isAnswered/>
                 <ReviewMessage />
             </div>
           </TabPane>
           <TabPane key={"2"} tab="Answered(10)">
           <ReviewMessage isAnswered/>
           <ReviewMessage isAnswered/>
           </TabPane>
           <TabPane key={"3"} tab="Unanswered(0)">
             <ReviewMessage />
             <ReviewMessage />
             <ReviewMessage />
           </TabPane>
         </Tabs>
         </div>
      </>
  )
}

export default function Book():JSX.Element{
  
  const router = useRouter()
  const [book,setBook] = useState<any>({})
  const [isLoading,setIsLoading] = useState(true)

  async function getBook(){
    if(router.query.bid){
      const response = await BookFunction.getBook(router.query.bid as string)
      setIsLoading(false)
      if(response.status === "success"){
        if(response.book){
          setBook(response.book)
        }
      }
    }
  }

  useEffect(()=>{
    getBook()
  },[router])
    return(
    <DashboardLayout pageTitle={`Book | ${isLoading?"loading":book.title?book.title:"404"}`} currentPage={"books"}>
    <div className="mt-5">
    <div className="my-3 flex items-center">
         <Link href={"/dashboard/books"}><a>Books </a></Link>
         <span className="block mx-1"> &gt;</span>
         <Link href={"/dashboard/books/add-book"}><a>Add Book</a></Link>
         <span className="block mx-1"> &gt;</span>
         <span className="font-bold">Book Details</span>
      </div>
     {isLoading?<LoadingState/>:
      Object.entries(book).length > 0?
      <BookDetail book={book}/>
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