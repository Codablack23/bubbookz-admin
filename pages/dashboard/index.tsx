
import Overview from "~/components/dashboard/home/Overview";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import Link from "next/link";
import { useState, useContext,} from "react";
import OrdersTable from "~/components/widgets/tables/OrdersTable";
import { OrdersContext } from "~/contexts/OrdersContext";
import { BookContext } from "~/contexts/BookContext";
import SalesOverview from "~/components/widgets/charts/SalesView";
import UserOverview from "~/components/widgets/charts/UsersOverview";
import OrdersChart from "~/components/widgets/charts/OrdersChart";
import TopBook from "~/components/widgets/books/TopBook";


export default function Dashboard(){
  const [isLoading,setLoading] = useState(false)
  const {orders} = useContext(OrdersContext)
  const {books} = useContext(BookContext)

    return(
    <DashboardLayout pageTitle="Home" currentPage="dashboard">
     <>
     <h3 className="font-black text-2xl my-4">Dashboard</h3>
     <Overview/>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-8 grid-col-md-12 bub-min-vh-30">
       <SalesOverview/>
       </div>
       <div className="bg-white rounded-lg grid-col-4 grid-col-md-12 bub-min-vh-30">
        <header className="flex p-2 items-center justify-between">
            <h3 className="font-bold">Top Products</h3>
            <Link href={"/dashboard/top-products"}>
                <a className="bub-txt-primary font-bold">See All</a>
            </Link>
        </header>
        <main className="p-2 overflow-auto mb-3" style={{maxHeight:"300px"}}>
           {books.slice(0,3).map(book=><TopBook key={book.book_id} book={book}/>)}
        </main>
       </div>
     </div>
     <div className="bub-grid my-3">
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30">
         <UserOverview/>
       </div>
       <div className="bg-white rounded-lg grid-col-6 grid-col-md-12 bub-min-vh-30">
        <OrdersChart/>
       </div>
     </div>
     <p className="font-bold mt-3">Top Orders</p>
     <OrdersTable orders={orders}/>
     </>
     
    </DashboardLayout>
    )
}