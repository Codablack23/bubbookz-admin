import moment from "moment";

export function getDateRange(rangeType:string){
    const dates:string[] = []
    // const date = new Date()
    // const day = date.getDate()
    const currentDate = moment()
    switch (rangeType) {
      case "daily":
        for(let i = 0;i < 7;i++){
          dates.push(moment().date(currentDate.date() - i).format("MMM Do"))
        }
      break;
      case "weekly":
        for(let i = 0;i < 7;i++){
          dates.push(moment().date(currentDate.date() - (i * 7)).format("MMM Do"))
        }
      break;
      case "monthly":
        for(let i = 0;i < 7;i++){
        dates.push(moment().month(currentDate.month() - i).format("MMM"))
          
        }
      break;
      case "yearly":
        for(let i = 0;i < 7;i++){
          dates.push(moment().year(currentDate.year() - i).format("YYY"))
        }
      break;    
      default:
        []
        break;
    }
    return dates
  }