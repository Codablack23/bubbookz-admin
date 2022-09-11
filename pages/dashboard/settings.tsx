import { Switch } from "antd";
import Link from "next/link";
import { title } from "process";
import { DetailsForm, NotificationForm, PasswordForm } from "~/components/dashboard/home/SettingsForm";
import { DashboardLayout } from "~/components/layouts/DashboardLayout";


export default function Settings():JSX.Element{
  return(
   <DashboardLayout pageTitle="Settings" currentPage="dashboard">
    <div className="">
      <div className="flex items center">
        <Link href={"/dashboard"}>
        <a>Dashboard</a>
        </Link>
        <p className="mx-1 font-bold">{">"}</p>
        <p className="font-bold">Settings</p>
      </div>
      <div className="bub-grid bg-white p-4 mt-5 py-5 rounded-lg">
        <div className="grid-col-6 grid-col-md-12 grid-col-sm-12">
          <p className="py-3 text-gray-400 font-bold">Edit Profile</p>
          <div className="border border-gray-300 bub-min-vh-30 rounded-lg p-2">
            <header className="flex items-center justify-center py-4 mb-4">
                <div className="bg-gray-200 rounded-full flex items-center justify-center" 
                style={{width:"100px",height:"100px"}}
                >
                    <i className="bi bi-person text-white text-6xl"></i>
                </div>
            </header>
           <DetailsForm/>
          </div>
        </div>
      
        <div className="grid-col-6 grid-col-md-12 grid-col-sm-12">
          <p className="py-3 text-gray-400 font-bold">Change Password</p>
          <div className="border border-gray-300 bub-min-vh-30 rounded-lg p-2 py-3">
            <PasswordForm/>
          </div>
          <NotificationForm/>
        </div>
      </div>
    </div>
   </DashboardLayout>
  )
}