import { DashboardLayout } from "~/components/layouts/DashboardLayout";
import CommunityTable from "~/components/widgets/tables/CommTable";

export default function CommunityPage(){
    return(
        <DashboardLayout pageTitle="All Communities" currentPage="communities">
            <div>
               <h3 className="text-2xl font-bold my-5">Communities</h3>
               <CommunityTable/>
            </div>
        </DashboardLayout>
    )
}