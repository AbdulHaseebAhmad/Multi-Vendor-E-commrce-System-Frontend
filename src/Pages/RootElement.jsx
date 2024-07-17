import React from "react";
import { Link, json, redirect } from "react-router-dom";

export default function RootElement() {
  return <div className="bg-yellow-300 min-h-screen flex flex-col justify-center items-center">
  <h2 className="text-green-900 font-bold text-3xl mb-8">Welcome To E Commerce App</h2>
    <div className=" mx-auto h-20 flex justify-center items-center w-8/12 gap-5">
      <Link to='login'>
        <button className="w-40 p-3  bg-green-900 text-xl text-yellow-300 hover:bg-transparent hover:text-green-900 hover:font-semibold">
            User Login
        </button>
      </Link>
      <Link to='shoplogin'>
        <button className="w-40 p-3  bg-green-900 text-xl text-yellow-300 hover:bg-transparent hover:text-green-900 hover:font-semibold">
            Shop Login
        </button>
      </Link>
      <Link to='login'>
        <button className="w-40 p-3  bg-green-900 text-xl text-yellow-300 hover:bg-transparent hover:text-green-900 hover:font-semibold">
            Admin Login
        </button>
      </Link>
    </div>
  </div>;
}

export const authCechkLoader = async ({ request, params }) => {
  let response = await fetch("http://localhost:3000/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });

  let responseTwo = await fetch("http://localhost:3000/api/shop/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });
  const responseData = await response.json();
  if (response.status === 401 && responseTwo.status === 401) {
    return null;
  }
  if (response.status === 200) {
    return redirect("/user");
  }
  if (responseTwo.status === 200) {
    return redirect("/shop");
  }
};
