import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "~/contexts/authContext/AuthContext";

export default function ProfileCard(){
   const {state} = useContext(AuthContext)
   const {user} = state
    return(
        <header className="bub-card w-full rounded-lg bg-white p-3 text-center sm:text-left">
            <p className="text-right text-gray-300">Joined {new Date(user.createdAt).toDateString()}</p>
            <div className="md:flex justify-between items-center my-2">
                <div className="sm:flex items-center">
                  <div className="sm:text-center">
                    <div className="rounded-full flex items-center justify-center m-auto bg-gray-400" style={{width:"120px",height:"120px"}}>
                     {user.profile_picture === null?
                     <p className="text-white text-5xl">{user.firstname.slice(0,1).toUpperCase()}{user.lastname.slice(0,1).toUpperCase()}</p>
                     :<Image src={user.profile_picture} 
                        layout="responsive"
                        width="100%"
                        height={"100%"}
                        alt={"profile-img"}
                        />
                     }
                    </div>
                    <p className="font-bold">{user.firstname} {user.lastname}</p>
                  </div>
                  <div className="ml-5">
                    <p className="my-1">
                     <span><i className="bi bi-envelope bub-txt-primary"></i></span>
                     <span className="ml-2">{user.email}</span>
                    </p>
                    <p className="my-1">
                     <span><i className="bi bi-telephone bub-txt-primary"></i></span>
                     <span className="ml-2">{user.phone_no}</span>
                    </p>
                    <p className="my-1">
                     <span><i className="bi bi-geo-alt bub-txt-primary"></i></span>
                     <span className="ml-2">{user.location == null?"N/A":user.location}</span>
                    </p>
                    <p className="my-3">Total No of Deliveries: 50</p>
                  </div>
                </div>
                <Link href={"/dashboard/settings"}>
                <button className="bub-bg-primary rounded-lg px-5 py-2">
                    <i className="bi bi-pencil"></i>
                    <span className="ml-2">Edit Profile</span>
                </button>
                </Link>
            </div>
        </header>
    )
}