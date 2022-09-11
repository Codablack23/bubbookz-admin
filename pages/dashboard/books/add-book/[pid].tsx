import { Tabs } from "antd";
import Image from "next/image";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";

export default function PreviewBook():JSX.Element{
  const {TabPane} = Tabs
    return(
    <DashboardLayout pageTitle={"Preview"} currentPage={"books"}>
      <div className="bg-white rounded-lg w-full p-3 mt-4">
        <header className="border border-gray-400 rounded-lg p-2">
          <div className="flex justify-end py-3 px-2">
            <button>
              <i className="bi bi-pencil text-2xl"></i>
            </button>
          </div>
         <div className="bub-grid">
         <div className="grid-col-5 grid-col-md-12">
            <Image layout={"responsive"} src={"/images/book.svg"} width={"100%"} height={"100%"} alt={"book-img"}/>
          </div>
          <div className="grid-col-7 grid-col-md-12">
            <h3 className="font-bold text-2xl bub-txt-accent">The Design of Everyday Things</h3>
            <p className="m-0 text-gray-300">By: Donald A. Norman</p><br /><br />
            <p className="font-bold">Format:  Hardback</p>
            <p className="font-bold">Quantity in stock: 500</p><br /><br />
            <p className="font-bold">Faculty:Arts</p>
            <p className="font-bold">Department:Graphics Designs</p>
            <p className="font-bold">Level:200</p>
            <p className="font-bold">Semester:2</p>
          </div>
         </div>
         <div className="flex justify-end py-3 px-2">
          <p>Price: <span className="font-bold text-xl">N5000</span></p>
         </div>
        </header>
        <div className="p-2 my-3">
        <Tabs defaultActiveKey="1" centered>
          <TabPane key={"1"} tab="Description">
              <p className="p-5" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, impedit. Sed atque esse enim nam, suscipit placeat doloribus distinctio est. Labore perspiciatis at facilis id saepe nam, error modi voluptate et qui expedita quis inventore doloremque voluptates quaerat sequi eveniet voluptatum mollitia provident ullam. Rem facilis et dolorem blanditiis quibusdam doloremque aliquid, modi inventore similique magni explicabo consequatur voluptatum dolorum accusantium ea ducimus fugiat cumque dolores aliquam dolor. Aperiam, ratione dolor. A aliquam asperiores debitis, ab vero accusantium deserunt laudantium voluptate harum alias quo omnis perspiciatis rerum cumque ipsa excepturi soluta ipsam natus ut saepe consequuntur repudiandae eaque! Porro, iure!</p>
          </TabPane>
          <TabPane key={"2"} tab="Product Details">
            <div>
              <p>ISBN-10: 0525657746</p>
              <p>GTIN-13: 9780525657743</p>
              <p>Publisher: 9ja Prints</p>
              <p>Copyright: 2021</p>
              <p>Book Binding: Hardcover</p>
              <p>Pages: 456</p>
              <p>Weight: 0.93lb</p>
              <p>Dimensions(in) (L x W x H): 8.2 x 5.8 x 1.3</p>
            </div>
          </TabPane>
        </Tabs>
        </div>
      </div>  
    </DashboardLayout>
    )
}