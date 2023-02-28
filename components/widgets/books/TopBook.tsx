import {Image } from "antd";


export default  function TopBook({book}:{book:any}):JSX.Element{
    console.log(book)
     return(
       <div className="bub-bg-accent bub-grid bub-txt-white my-2 p-2 rounded-lg">
         <div className="grid-col-4">
           <div className="bub-w-100">
           <Image src={book.book_img} width={"100%"} height={"100%"} alt={"book-img"} style={{height:"100px",objectFit:"cover"}}/>
           </div>
         </div>
         <div className="grid-col-8">
             <p className="font-bold">{book.title}</p>
             <p className="text-sm">by {book.author}</p>
             <p>N{book.price}</p>
         </div>
       </div>
     )
 }