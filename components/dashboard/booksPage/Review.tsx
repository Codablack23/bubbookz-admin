import { Tabs } from "antd";
import ReviewMessage from "./ReviewMessage";

interface Reviews{
    rating?:string|number,
    review?:string,
    answer?:string|number,
    [key:string]:any
  }

export default function Reviews({reviews}:{reviews:Reviews[]}){
    const {TabPane} = Tabs
    return (
        <Tabs defaultActiveKey="1">
        <TabPane key={"1"} tab={`All Reviews(${reviews.length})`}>
          <div className="">
              {reviews.map((r:any)=>
                <ReviewMessage key={r.id} review ={r}/>
              )}
          </div>
        </TabPane>
        <TabPane key={"2"} tab={`Answered (${reviews.filter((r:any)=>r.answer).length})`}>
        <div className="">
              {reviews.filter((r:any)=>r.answer).map((r:any)=>
                <ReviewMessage key={r.id} review ={r}/>
              )}
          </div>
        </TabPane>
        <TabPane key={"3"} tab={`Unanswered(${reviews.filter((r:any)=>!r.answer).length})`}>
          <div className="">
              {reviews.filter((r:any)=>!r.answer).map((r:any)=>
                <ReviewMessage key={r.id} review ={r}/>
              )}
          </div>
        </TabPane>
      </Tabs>
    )
}