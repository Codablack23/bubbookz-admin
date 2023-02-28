import { useEffect, useState } from "react"

interface Review{
    rating?:string|number,
    review?:string,
    answer?:string|number,
    [key:string]:any
  }

interface Props{
    isAnswered?:boolean,
    review:Review
}
export default  function ReviewMessage(props:Props):JSX.Element{
    const [isEditing,setIsEditing] = useState(false)
    const handleClick=(isShowing:boolean)=>()=>setIsEditing(isShowing)
    const {review} = props
    return (
        <div className="rounded-lg bg-white mt-2">
          <header className="flex items-center bub-bg-accent rounded-t-lg justify-between p-3">
            <div className="md:flex items-center">
                <div className="mb-3 md:mb-0 w-10 h-10 rounded-full bg-black"></div>
                <div className="ml-2 bub-txt-white">
                    <p className="font-bold">{review.name}</p>
                    <p className="block md:hidden">{review.user}</p>
                    <p className="text-sm m-0">{review.phone}</p>
                </div>
            </div>
            <div className="flex items-center bub-txt-white">
                <p className="hidden md:block">{review.user}</p>
                <button className="ml-3"><i className="bi bi-three-dots-vertical"></i></button>
            </div>
          </header>
          <main className="p-4 bub-max-vh-30 overflow-auto">
           <p className="w-5/6">{review.review}</p>
          </main>
          <div className="text-right p-2 px-4">
           {review.answer?
            <button className="bub-txt-primary">See Answer</button>
           :isEditing?
           <div>
              <div className="answer-form flex text-left bg-gray-200 rounded-lg p-2">
                 <input type="text" placeholder="Type here" className="bg-transparent border-none outline-none w-10/12" />
                 <button className="border-none outline-none w-2/12 bub-bg-primary rounded-md p-2">
                    <span className="mr-1">Send</span>
                    <span><i className="bi bi-send"></i></span>
                 </button>
              </div>
              <button className="bub-txt-primary" onClick={handleClick(false)}>Cancel</button>
           </div>
           : <button className="bub-txt-primary" onClick={handleClick(true)}>Answer</button>
           }
          </div>
          <footer className="bottom-0 border-t w-full border-gray-200 p-3 flex justify-between items-center">
           <p className="text-gray-600">{new Date(review.createdAt).toDateString()}</p>
           {review.answer?(
            <div className="flex items-center">
            <p className="w-3 h-3 bub-bg-green rounded-full"></p>
            <p className="text-sm font-bold">Answered</p>
           </div>
           ):(
            <div className="flex items-center">
            <p className="w-3 h-3 bub-bg-red rounded-full"></p>
            <p className="text-sm font-bold">Unanswered</p>
           </div>
           )}
          </footer>
        </div>
    )
}