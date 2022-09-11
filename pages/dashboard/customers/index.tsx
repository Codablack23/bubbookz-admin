import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import CustomersTable from "~/components/widgets/tables/CustomersTable";

export default function CustomersPage(){
    return(
        <DashboardLayout pageTitle="Customers || All" currentPage="customers">
        <div>
            <h3 className="font-bold text-2xl my-3">Customers</h3>
            <CustomersTable/>
        </div>
    </DashboardLayout>
    )
}