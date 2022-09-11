interface Props{
    isAnswered?:boolean
}
export default  function ReviewMessage(props:Props):JSX.Element{
    return (
        <div className="rounded-lg bg-white mt-2">
          <header className="flex items-center bub-bg-accent rounded-t-lg justify-between p-3">
            <div className="md:flex items-center">
                <div className="mb-3 md:mb-0 w-10 h-10 rounded-full bg-black"></div>
                <div className="ml-2 bub-txt-white">
                    <p className="font-bold">Roland James</p>
                    <p className="block md:hidden">goodluckedih@gmail.com</p>
                    <p className="text-sm m-0">070 3216 234</p>
                </div>
            </div>
            <div className="flex items-center bub-txt-white">
                <p className="hidden md:block">goodluckedih@gmail.com</p>
                <button className="ml-3"><i className="bi bi-three-dots-vertical"></i></button>
            </div>
          </header>
          <main className="p-4 bub-max-vh-30 overflow-auto">
           <p className="w-5/6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat nam aut quas alias debitis iste recusandae voluptatum dolores quibusdam, ipsam soluta, reiciendis accusantium repudiandae facilis.</p>
          </main>
          <div className="text-right p-2 px-4">
           {props.isAnswered?
            <button className="bub-txt-primary">See Answer</button>
           : <button className="bub-txt-primary">Answer</button>}
          </div>
          <footer className="bottom-0 border-t w-full border-gray-200 p-3 flex justify-between items-center">
           <p className="text-gray-600">{new Date().toDateString()}</p>
           {props.isAnswered?(
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