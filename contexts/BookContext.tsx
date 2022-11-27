import React,{ FC,createContext, useState,useEffect, ReactNode } from "react";
import Book from "~/utils/Book";

interface BooksType{
    books:any[],
    [key:string]:any
}
export const BookContext = createContext<BooksType>({
    books:[]
})

interface CompProps{
  children?:ReactNode | JSX.Element
}
export function BookContextProvider({children}:CompProps){
  const [books,setBooks] = useState([])
  
  useEffect(() => {
    const getBooks = async ()=>{
        const response = await Book.getBooks()
        if(response.status === "success"){
          setBooks(response.books)
        }
    }
    getBooks()
  }, [])
  return (
   <BookContext.Provider value={{books}}>
      {children}
   </BookContext.Provider>
  ) 
}