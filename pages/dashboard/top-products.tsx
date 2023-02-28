import {Image} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookFunction from '~/utils/Book'
import BookRating from "~/components/dashboard/booksPage/BookRating";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";

interface BookProps{
  book:{
    [key:string]:any
  },
  reviews:any[]
}

const Book:React.FC<BookProps> =({book,reviews})=>{
    return(
        <div className="p-3 rounded-lg bub-grid bub-bg-accent py-4 bub-min-vh-40 my-2">
            <div className="grid-col-3 grid-col-md-12">
              <div className="w-full sm:w-1/2 sm:m-auto lg:w-full">
              <Image
                height={"100%"}
                width={"100%"}
                src={book.book_img}
                alt={"book-img"}
                />
              </div>
            </div>
            <div className="grid-col-5 grid-col-md-12 bub-txt-white">
                <p className="text-xl font-bold">{book.title}</p>
                <p>by {book.author}</p>
            </div>
            <div className="grid-col-4 grid-col-md-12">
                <BookRating reviews={reviews}/>
            </div>
        </div>
    )
}

export default function TopProductsPage(){
  const [books,setBooks] = useState<any[]>([])
  const [reviews,setReviews] = useState<any[]>([])
  const [loading,setIsLoading] = useState(false)

  useEffect(()=>{
    const getBooks = async()=>{
      setIsLoading(true)
      const response = await BookFunction.getBooks()
      setIsLoading(false)
      if(response.status === "success"){
        setBooks(response.books)
        setReviews(response.reviews)
      }
    }

    getBooks()
  },[])
    return(
        <DashboardLayout pageTitle="Top products" currentPage="books">
        <>
        <div className="flex items center my-2">
              <Link href={"/dashboard"}>
              <a>Dashboard</a>
              </Link>
             <p className="mx-1 font-bold">{">"}</p>
             <p className="font-bold">Profile</p>
            </div>
        <div className="p-2 bg-white rounded-lg bub-min-vh-85 bub-max-vh-90 overflow-hidden">
          <h3 className="text-2xl font-bold text-center">Top Products</h3>
          <section className="m-auto my-3 overflow-auto bub-max-vh-80 bub-w-90">
           {loading?
             <div >
              <h4>Loading ....</h4>
             </div>
           :books.length > 0?
           books.map((book)=>(
            <Book key={book.book_id} book={book} reviews={reviews.filter(r=>r.book_id === book.book_id)}/>
           ))
           :<h5>No Books available</h5>}
          </section>
        </div>
        </>
      </DashboardLayout>
    )
}