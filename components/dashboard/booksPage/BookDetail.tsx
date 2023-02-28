import { Tabs,Image } from "antd"
import BookRating from "./BookRating"
import Reviews from "./Review"

interface Reviews{
    rating?:string|number,
    review?:string,
    answer?:string|number,
    [key:string]:any
  }
  
interface BookDetailProps{
    book:any,
    openModal:any,
    reviews:Reviews[]
}

export default function BookDetail({book,openModal,reviews}:BookDetailProps){
    const goToEditBook = (id:string)=>{
      return ()=>window.location.replace(`/dashboard/books/edit-book/${id}`)
    }
  
  
    const {TabPane} = Tabs
    const details = book.book_details?JSON.parse(book.book_details):{}
    return (
      <>
       <div className="bg-white rounded-lg w-full p-3">
           <header className="border  border-gray-400 rounded-lg p-2">
             <div className="flex justify-end items-center py-3 px-2">
               <button onClick={goToEditBook(book.book_id)}>
                 <i className="bi bi-pencil text-lg"></i>
               </button>
               <button className="ml-2" onClick={openModal}>
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
              <BookRating reviews={reviews}/>
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
            <Reviews
            reviews={reviews}
            />
           </div>
        </>
    )
  }