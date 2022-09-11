import { Progress } from "antd";

export default function BookRating(){
   return(
    <div>
    <div className="text-center">
        <h3 className="font-bold">Product Rating</h3>
        <h3 className="font-bold text-xl">4.5/5</h3>
        <p>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span className="mx-1">
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>
            <span>(50)</span>
        </p>
    </div>
   <div className="mt-4">
    <div className="flex items-center px-2 py-1">
        <div className="w-1/4">
            <span>5</span>
            <i className="bi bi-star-fill bub-txt-orange"></i>
            <span>(30)</span>
        </div>
        <div className="w-3/4">
        <Progress  format={()=>""} strokeColor={"#FFB648"} percent={70}/>
        </div>
    </div>
    <div className="flex items-center px-2 py-1">
        <div className="w-1/4">
            <span>4</span>
            <i className="bi bi-star-fill bub-txt-orange"></i>
            <span>(10)</span>
        </div>
        <div className="w-3/4">
        <Progress  format={()=>""} strokeColor={"#FFB648"} percent={10}/>
        </div>
    </div>
    <div className="flex items-center px-2 py-1">
        <div className="w-1/4">
            <span>3</span>
            <i className="bi bi-star-fill bub-txt-orange"></i>
            <span>(20)</span>
        </div>
        <div className="w-3/4">
        <Progress  format={()=>""} strokeColor={"#FFB648"} percent={11}/>
        </div>
    </div>
    <div className="flex items-center px-2 py-1">
        <div className="w-1/4">
            <span>2</span>
            <i className="bi bi-star-fill bub-txt-orange"></i>
            <span>(3)</span>
        </div>
        <div className="w-3/4">
        <Progress  format={()=>""} strokeColor={"#FFB648"} percent={2}/>
        </div>
    </div>
    <div className="flex items-center px-2 py-1">
        <div className="w-1/4">
            <span>1</span>
            <i className="bi bi-star-fill bub-txt-orange"></i>
            <span>(7)</span>
        </div>
        <div className="w-3/4">
        <Progress  format={()=>""} strokeColor={"#FFB648"} percent={8}/>
        </div>
    </div>
   </div>
</div>
   )
}