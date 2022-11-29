import {Image} from "antd";
import Link from "next/link";
import React from "react";
import BookRating from "~/components/dashboard/booksPage/BookRating";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";

const Book:React.FC =()=>{
    return(
        <div className="p-3 rounded-lg bub-grid bub-bg-accent py-4 bub-min-vh-40 my-2">
            <div className="grid-col-3 grid-col-md-12">
              <div className="w-full sm:w-1/2 sm:m-auto lg:w-full">
              <Image
                height={"100%"}
                width={"100%"}
                src={"/images/book.svg"}
                alt={"book-img"}
                />
              </div>
            </div>
            <div className="grid-col-5 grid-col-md-12 bub-txt-white">
                <p className="text-lg">Principles of General chemistry</p>
                <p>by Mariana P. Diego and Sebastain L. Mateo</p>
            </div>
            <div className="grid-col-4 grid-col-md-12">
                <BookRating/>
            </div>
        </div>
    )
}

export default function TopProductsPage(){
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
           <Book/>
           <Book/>
           <Book/>
           <Book/>
           <Book/>
           <Book/>
           <Book/>
          </section>
        </div>
        </>
      </DashboardLayout>
    )
}