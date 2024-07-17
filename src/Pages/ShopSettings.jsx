import React, { useEffect, useState } from "react";
import VericalNavbar from "../Components/VerticalNavbar";
import Navbar from "../Components/Navbar";
import UserDetails from "../Components/ShopSettings/UserDetail";
import UserSettings from "../Components/ShopSettings/UserSecuritySettnings";
import { redirect, useLoaderData, useRouteLoaderData, useLocation } from "react-router-dom";
import ProfilePreviousOrder from "../Components/ShopSettings/ProfilePreviousOrder";
import ProfileCurrentOrders from "../Components/ShopSettings/ProfileCurrentOrders";
import ProfileWallet from "../Components/ShopSettings/ProfileWallet";

export default function ShopSetting() {
  const [screen, setScreen] = useState('userdetails');

  const userData = useLoaderData();
  const shopData = useRouteLoaderData("shophome");
  const {
    user: { shopname, shoplogo, shopid, email, phone,password, _id },
  } = shopData;
 
  const location = useLocation();
  const {pathname} = location;
  const segment = pathname.split('/')
  const settingsToShow = segment[3]? segment[3]:'userdetails';
//  console.log(settingsToShow);

  const screenHandle = (data) => {
    setScreen(data);
    console.log(data);
  };

  useEffect(() => {
    setScreen(settingsToShow)
  }, [settingsToShow]);


  return (
    <div className="container w-full max-w-none bg-yellow-100 min-h-screen ">
      <div className="container w-full max-w-none flex  ">
        {(screen === "userdetails" && (
          <UserDetails shopname={shopname} shoplogo={shoplogo} shopid={shopid} email={email} phone={phone} _id={_id}/>
        )) ||
          (screen === "usersecurity" && <UserSettings email={email} phone={phone} password={password} _id={_id}/>) ||
          (screen === "PreviousOrders" && <ProfilePreviousOrder />) ||
          (screen === "CurrentOrders" && <ProfileCurrentOrders />) ||
          (screen === "ProfileWallet" && <ProfileWallet />)}
      </div>
    </div>
  );
}

/**=export const profileloder = async ({ request, params }) => {
  let response = await fetch("http://localhost:3000/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*",
    },
  });
  if (response.status === 200) {
    const req = await response.json();
    const {user} = req;
    return req; 
  } else {
    return redirect("/login");
  }
};*/
