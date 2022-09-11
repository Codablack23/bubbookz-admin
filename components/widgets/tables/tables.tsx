import { Skeleton, Spin, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { book_columns } from "~/data/columns";
import { BookList } from "~/data/interfaces";
import BookFunction from "~/utils/Book";

export function LoadingState(){
   return(
      <div className="bg-white h-28 flex items-center justify-center">
        <Spin size="large"/>
      </div>
   )
}
export default function BooksPageTable():JSX.Element{
   const [books,setBooks] = useState<BookList[]>([])
   const [isLoading,setIsLoading] = useState(true)
   const Router = useRouter()
   
   async function getBooks(){
      const response = await BookFunction.getBooks()
      setIsLoading(false)
      if(response.status === "success"){
         const allBooks = response.books
        if(allBooks.length > 0){
         setBooks(allBooks.map((book:any)=>{
            return {
               key:book.book_id,
               fmt:book.format,
               book_name:book.title,
               author:book.author,
               faculty:book.faculty,
               level:book.level,
               department:book.department,
               qty:book.quantity,
               status:book.quantity > 0?"in stock":"out of stock",
               semester:book.semester,
               price:book.price
              }
         }))
        }
      }
   }
   useEffect(()=>{
    getBooks()
   },[])
  return(
   <div>
      <div className="flex flex-wrap items-center justify-end mb-2">
        <p>Sort By:</p>
        <select className="bub__filter-select" id="">
            <option value="">Faculty</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Department</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Level</option>
        </select>
        <select className="bub__filter-select" id="">
           <option value="">Format</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Price</option>
        </select>
        <select className="bub__filter-select" id="">
        <option value="">Status</option>
        </select>
    </div>
   <div className="">
    {isLoading?
    <LoadingState/>
    :
       <Table 
       size="small"
       onRow={(record) => {
         return {
           onClick: e => {
             Router.push(`/dashboard/books/${record.key}`)
           }
         }
        }
       }
       dataSource={books}
       columns={book_columns}
       scroll={{ x: 600,}}
       pagination={{position:["topRight"]}}
       // className={"bub-bg-accent bub-txt-white"}
       />
    }
   </div>
   </div>
  )
}