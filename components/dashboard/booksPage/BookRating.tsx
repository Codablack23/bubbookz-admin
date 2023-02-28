import { Progress } from "antd";

interface Review{
    rating?:string|number,
    review?:string,
    answer?:string|number,
    [key:string]:any
}
interface RatingProps {
    reviews:Review[]
}
export default function BookRating({reviews}:RatingProps){
    const totalRatings = reviews.length
    const getStar =(star:number,reviews:Review[]) => reviews.filter((r)=>(r.rating as number) === star).length
    const getaverage=(reviews:Review[],allRatings:number)=>{
        const total:number = reviews.map(r=>parseInt(r.rating as string)).reduce((total,a)=>total + a,0) 
        return ((total)/allRatings).toFixed(1)
    }
    const getFilledStars=(num:number)=>(
        Array(num).fill("").map((stars,i)=>(
            <span className="mx-1" key={i + 'filled-star'}>
                <i className="bi bi-star-fill bub-txt-orange"></i>
            </span>   
        ))
    )
   return(
    <div>
    <div className="text-center">
        <h3 className="font-bold">Product Rating</h3>
        <h3 className="font-bold text-xl">{getaverage(reviews,totalRatings)}/5</h3>
        <p>
          {getFilledStars(parseInt(getaverage(reviews,totalRatings)))}   
         <span>({totalRatings})</span>
        </p>
    </div>
   <div className="mt-4">
   {Array(5).fill(" ").map((r,i)=>(
     <div key={`${i}-rating`} className="flex items-center px-2 py-1">
     <div className="w-1/4">
         <span>{5-i}</span>
         <i className="bi bi-star-fill bub-txt-orange mx-1"></i>
         <span>({getStar((5-i),reviews)})</span>
     </div>
     <div className="w-3/4">
     <Progress  
     format={()=>""} 
     strokeColor={"#FFB648"} 
     percent={totalRatings !== 0?((getStar((5-i),reviews)/totalRatings) * 100):0}
     />
     </div>
 </div>
   ))}    
   </div>
</div>
   )
}