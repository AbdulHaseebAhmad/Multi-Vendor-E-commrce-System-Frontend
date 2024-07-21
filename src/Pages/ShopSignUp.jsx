import React, { useState } from "react";
import {
  useLocation,
  useSubmit,
  redirect,
  useActionData,
  Link,
} from "react-router-dom";

export default function ShopSignUp() {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const pathName = segments[1];
  console.log(pathName)
  const submit = useSubmit();
  const actionData = useActionData();
  //console.log(actionData)

  const [formData, setFormData] = useState({
    email: "",
    shopname: "",
    //displayname: "",
    address: "",
     phone: "",
    password: "",
    confirmPassword: "",
    shoplogo:"",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    e.preventDefault();
    submit(
      {
        email: formData.email,
        shopname: formData.shopname,
        displayname: formData.displayname,
        shoplogo: formData.shoplogo,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      { method: "POST", encType: "application/json", action: `/${pathName}` }
    );
  };

  return (
    <div className=" bg-green-900 max-h-content min-h-screen flex justify-center items-center">
      <div className="max-w-[50%] bg-yellow-300 p-4 rounded-lg">
        <h2 className="text-2xl text-green-900 font-extrabold mb-4 ">Shop Sign Up</h2>
        {actionData && <div className="max-w-[80%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-1 rounded  "role="alert">
        {typeof(actionData)=== 'string'?  <span className="block sm:inline">{actionData} </span>
        : actionData.map((eachError)=> <span className="block sm:inline">*{eachError.msg}<br/></span>)}
        </div>}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={submitHandler}
        >
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm   mb-2 text-green-900 font-extrabold"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="shopname"
              className="block text-sm  mb-2 text-green-900 font-extrabold"
            >
              Shop Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="shopname"
              name="shopname"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Enter your Shop Name"
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm  mb-2 text-green-900 font-extrabold"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm  mb-2 text-green-900 font-extrabold"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm  mb-2 text-green-900 font-extrabold"
            >
              Phone
            </label>
            <input
              onChange={handleChange}
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="shoplogo"
              className="block text-sm  mb-2 text-green-900 font-extrabold"
            >
              Shop Logo
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="shoplogo"
              name="shoplogo"
              className="w-full px-8 py-2  rounded-sm focus:outline-none focus:border-2 focus:border-green-900  border-1 border-green-900 placeholder-green-900"
              placeholder="Enter your Shop Logo"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 font-bold w-full bg-green-800 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-green-800 hover:border-2 hover:border-green-800 hover:border-opacity-75"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="col-span-2  font-bold w-full bg-green-800 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-green-800 hover:border-2 hover:border-green-800 hover:border-opacity-75"
          >
            <Link to='/shoplogin'>Sign In</Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export const shopSignupLoader = async ({ request, params }) => {
  console.log(params);
  let response = await fetch("http://52.70.243.175:5001/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });
  let responseTwo = await fetch("http://52.70.243.175:5001/api/shop/auth/status", {
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
    return redirect("/home");
  }
  if (responseTwo.status === 200) {
    return redirect("/shop");
  }
};

export const shopSignupAction = async ({ request, params }) => {
  const signUpData = await request.json();
  console.log(signUpData);
  const formData = {
    email: signUpData.email,
    shopname: signUpData.shopname,
    phone: signUpData.phone,
    password: signUpData.password,
    confirmPassword: signUpData.confirmPassword,
    shoplogo:signUpData.shoplogo
  };

  const sendCredentialsForLogin = await fetch(
    "http://52.70.243.175:5001/api/shop/auth/signup",
    {
      method: request.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const responseData = await sendCredentialsForLogin.json();
  // console.log("This is SignUp Data: ", signUpData);
  //console.log(sendCredentialsForLogin.status);
  console.log(sendCredentialsForLogin.status )
  if(sendCredentialsForLogin.status === 201){
    return redirect('/shoplogin')
  } else {
    if (sendCredentialsForLogin.status === 400 && responseData.msg.includes("duplicate")) {
      return responseData.msg
    } else {
      return responseData;
      ;
    }
  }

};
