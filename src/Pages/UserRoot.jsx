import React, { Children } from "react";
import { Outlet, Link, redirect, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useLoaderData, useRouteLoaderData, useNavigate } from "react-router-dom";
import LinkNavbar from "../Components/LinkNavbar";

export default function UserRooot() {
  
  const location = useLocation();
  const {pathname} = location;
  const segment = pathname.split('/')
  const settingsExist = segment[2];
  console.log(settingsExist);

  return (
    <div className="">
      <Navbar />
      { settingsExist !== 'profile' && <LinkNavbar/>}
      {<Outlet/>}
     
    </div>
  );
}

export const shophomeloader = async () => {
  let userresponse = await fetch(
    "http://52.70.243.175:5001/api/users/auth/status",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
    }
  );

  let shopresponse = await fetch("http://52.70.243.175:5001/api/shop/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });

  if (userresponse.status === 200) {
    return redirect("/user");
  }
  if (shopresponse.status === 200) {
    return shopresponse;
  } else {
    return redirect("/shoplogin");
  }
};
