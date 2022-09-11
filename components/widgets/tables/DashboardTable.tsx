import { Table } from "antd";
import Link from "next/link";
import { book_columns } from "~/data/columns";
import { BookList } from "~/data/interfaces";

const datasource:BookList[] = [
  
]
for (let i = 0; i < 4; i++) {
 datasource.push(  {
    key:`${i}-data`,
    fmt:"",
    book_name:"Principles Of General Chemistry",
    author:"James Brown",
    faculty:"Science",
    level:1,
    department:"Art",
    qty:20,
    status:"in stock",
    semester:"1",
    price:"N5000"
   })
    
}
export default function DashboardTable():JSX.Element{
  return(
     <div className="bg-white rounded-lg">
        <header className="flex items-center justify-between p-4">
           <h1 className="font-black">Recent Orders</h1>
           <Link href={"#"}>
             <a className="bub-txt-primary">See all</a>
           </Link>
        </header>
    <Table 
    dataSource={datasource}
    columns={book_columns}
    scroll={{ x: 600,}}
    pagination={false}
    // className={"bub-bg-accent bub-txt-white"}
    />
</div>
  )
}