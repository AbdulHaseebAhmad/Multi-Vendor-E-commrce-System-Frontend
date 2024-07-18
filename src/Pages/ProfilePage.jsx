import React, { useEffect, useState } from "react";
import VericalNavbar from "../Components/VerticalNavbar";
import Navbar from "../Components/Navbar";
import UserDetails from "../Components/ProfileComponents/UserDetail";
import UserSettings from "../Components/ProfileComponents/UserSecuritySettnings";
import { redirect, useLoaderData } from "react-router-dom";
import ProfilePreviousOrder from "../Components/ProfileComponents/ProfilePreviousOrder";
import ProfileCurrentOrders from "../Components/ProfileComponents/ProfileCurrentOrders";
import ProfileWallet from "../Components/ProfileComponents/ProfileWallet";
 import { useDispatch } from "react-redux";
import { userAction } from "../store/userSlice";

export default function ProfilePage() {
  const [screen, setScreen] = useState("UserDetails");
  const dispacth = useDispatch();
  const userData = useLoaderData();
  const screenHandle = (data) => {
    setScreen(data);
    console.log(data);
  };

   useEffect(()=>{
   dispacth(userAction.setUserstate(userData))
  },[screen,userData.user])

  return (
    <div className="container w-full max-w-none bg-yellow-100 min-h-screen ">
      <div className="container w-full max-w-none flex  ">
        <VericalNavbar selectScreen={screenHandle} />
        {(screen === "UserDetails" && <UserDetails />) ||
          (screen === "UserSettings" && <UserSettings />) ||
          (screen === "PreviousOrders" && <ProfilePreviousOrder />) ||
          (screen === "CurrentOrders" && <ProfileCurrentOrders />)  ||
          (screen === "ProfileWallet" && <ProfileWallet/>)
          }
      </div>
    </div>
  );
}

export const profileloder = async ({ request, params }) => {
  let response = await fetch("https://multi-vendor-e-commerce-backend.vercel.app/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });
  if (response.status === 200) {
    const req = await response.json();
    const {user} = req;
    return req; 
  } else {
    return redirect("/login");
  }
};
