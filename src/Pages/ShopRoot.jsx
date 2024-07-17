import React, { Children } from "react";
import { Outlet, Link, redirect, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useLoaderData, useRouteLoaderData, useNavigate } from "react-router-dom";

export default function ShopRoot() {
  const shopData = useLoaderData();
  const userData = shopData.user;
  const { shopname, shopid, shoplogo, _id } = userData;
  const location = useLocation();
  const {pathname} = location;
  const segment = pathname.split('/')
  const settingsExist = segment[2];
  const navigate= useNavigate();
  console.log(settingsExist);

  return (
    <div className="bg-yellow-100">
      <Navbar />

      <div className="flex">
        <aside className="w-64  text-white min-h-screen bg-green-900">
          <div className="p-6 flex flex-col items-center gap-2">
            <img src={shoplogo} alt="Shop Logo" className="h-full mb-4" />
            <Link to="/shop" className="text-xl font-bold mb-2 font-semibold  ">
              <h2 className="text-xl ">{shopname}</h2>
            </Link>
            <p className="mb-6">Shop ID: {shopid}</p>
            {!settingsExist &&  <>
              <Link to="settings">
              <button className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900">
                Settings
              </button>
            </Link>
            <Link
              to="/shop/addproduct"
              className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
              Add Products
            </Link>
            <Link
              to="orders/pendingorders"
              className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
             Prending Orders
            </Link>
            <Link
              to="orders/completedorders"
              className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
             Completed Orders
            </Link>
            <Link
              to="searchproduct"
              className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
             Search Products
            </Link>
            </>}

            {settingsExist && settingsExist ==='settings' &&<>
              <Link to="settings/userdetails">
              <button className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900">
                User Details
              </button>
            </Link>
            <Link
              to="settings/usersecurity"
              className="bg-yellow-300 text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
              Security Settings
            </Link>
            </>}

            {settingsExist && <Link
              to="/shop"
              className=" text-yellow-300 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:text-green-900"
            >
            Back To Shop
            </Link>}
          </div>
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const shophomeloader = async () => {
  let userresponse = await fetch(
    "http://localhost:3000/api/users/auth/status",
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
      },
    }
  );

  let shopresponse = await fetch("http://localhost:3000/api/shop/auth/status", {
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
