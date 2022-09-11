import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "~/contexts/authContext/AuthContext";

export default function Header(){
  const {state} = useContext(AuthContext)
  const {user} = state
    return(
        <header className="bub__dash-header sm:flex justify-between items-center mb-5">
        <div className="mb-4 sm:mb-0 flex items-center">
          <i className="bi bi-calendar-week bub-text-grey"></i>
          <span className="ml-2">Today {new Date().toDateString()}</span>
        </div>

        <form className="bub__search-form bg-white flex p-2 rounded-lg items-center mb-4 sm:mb-0">
          <i className="bi bi-search"></i>
          <input type="text" className="bg-transparent ml-2 outline-none" placeholder="Search for" />
        </form>

        <div
        style={{cursor:"pointer"}}
          className="bub__search-form bg-white
           flex justify-between ml-auto sm:ml-0 max-w-xs
           p-2 rounded-lg items-center mb-4 sm:mb-0
           relative bub-dropdown
           z-10
           ">
          <div className="flex items-center">
            <i className="bi bi-bell"></i>
            <div className="w-7 h-7 bg-gray-500 flex items-center justify-center ml-3 rounded-full">
             {user.profile_picture == null
             ?<p className="text-white">{user.firstname.slice(0,1).toUpperCase()}{user.lastname.slice(0,1).toUpperCase()}</p>
             :<Image src={"/images/profle.svg"} className={"rounded-full"} alt={"profile-img"} height={"28px"} width={"28px"}/>
             }
            </div>
          </div>
          <div className="ml-3 flex font-bold">
            <p>{user.firstname} {user.lastname}</p>
            <p className="ml-3"><i className="bi bi-chevron-down"></i></p>
          </div>
          <div className="bub-dropdown-menu z-20 top-12 right-0 bub-card absolute w-full bg-white rounded-lg">
           <Link href={"/dashboard/profile"}>
           <a className="bub-dropdown-link p-2 flex items-center w-full font-bold">
            <span><i className="bi bi-person pr-2 text-lg"></i></span>
            <span>Profile</span>
           </a>
          </Link>
          <Link href={"/dashboard/settings"}>
           <a className="bub-dropdown-link p-2 flex items-center w-full font-bold">
            <span><i className="bi bi-gear pr-2 text-lg"></i></span>
            <span>Settings</span>
           </a>
          </Link>
          <Link href={"/dashboard/notification"}>
           <a className="bub-dropdown-link p-2 flex items-center w-full font-bold">
            <span><i className="bi bi-bell pr-2 text-lg"></i></span>
            <span>Notifications</span>
           </a>
          </Link>
           <a className="bub-dropdown-link bub-txt-primary p-2 flex items-center w-full font-bold">
            <span><i className="bi bi-box-arrow-right pr-2 text-lg"></i></span>
            <span>Logout</span>
           </a>
          </div>
        </div>

      </header>
    )
}