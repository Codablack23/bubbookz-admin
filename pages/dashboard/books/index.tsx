import { Tabs } from "antd";
import Link from "next/link";
import BooksPageTable from "~/components/widgets/tables/tables";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";


export default function BookHomePage():JSX.Element{
    const {TabPane} = Tabs
    return(
        <DashboardLayout  pageTitle="Books" currentPage="books" >
        <div>
            <br />
          <h1 className="font-bold text-4xl lg:mt-5">Books</h1>
            <div className="flex justify-end">
            <Link href={"/dashboard/books/add-book"}>
           <button className="bub-bg-primary rounded-lg p-2 px-6 ">Add Book</button>
           </Link>
            </div>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Published Books" key={"1"}>
               <BooksPageTable/>
              </TabPane>
              <TabPane tab="Drafts(10)" key={"2"}>
              <BooksPageTable/>
              </TabPane>
            </Tabs>
        </div>
     
        </DashboardLayout>
    )
}