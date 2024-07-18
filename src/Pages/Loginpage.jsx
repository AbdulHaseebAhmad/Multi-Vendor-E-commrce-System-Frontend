import React, { useState } from "react";
import { useSubmit, useLocation, redirect,Link } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const pathName = segments[1];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submit = useSubmit();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submit(
      { email: formData.email, password: formData.password },
      { method: "POST", encType: "application/json", action: `/${pathName}` }
    );
  };
  return (
    <div className="bg-green-900 h-screen flex justify-center items-center">
      <div className="bg-yellow-300  p-8 rounded-lg">
        <h2 className="text-2xl text-green-900 font-extrabold mb-4">User Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-sm font-semibold mb-2 text-green-900 font-extrabold"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              className="w-full px-8 py-2 border rounded-sm focus:outline-none focus:border-2 focus:border-green-900"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-green-900 font-extrabold mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full px-8 py-2 border rounded-xs focus:outline-none focus:border-2 focus:border-green-900"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="font-bold w-full bg-green-800 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-green-800 hover:border-2 hover:border-green-800 hover:border-opacity-75 mb-2"
          >
            Login
          </button>
          <button
            type="button"
            className="col-span-2  font-bold w-full bg-green-800 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-green-800 hover:border-2 hover:border-green-800 hover:border-opacity-75"
          >
          <Link to='/signup'>Sign Up</Link>
          </button>
          <button
            type="button"
            className="col-span-2 mt-2  font-bold w-full bg-green-800 text-yellow-300 py-2 px-4 rounded-lg hover:bg-yellow-300 hover:text-green-800 hover:border-2 hover:border-green-800 hover:border-opacity-75"
          >
          <Link to='/'>Home</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

export const loginLoader = async ({ request, params }) => {
  let response = await fetch("https://multi-vendor-e-commerce-backend.vercel.app/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });
  if (response.status === 200) {
    return redirect("/user");
  } else {
    return null;
  }
};
export const loginAction = async ({ request, params }) => {
  const data = await request.json();
  const formData = { email: data.email, password: data.password };
  //console.log(JSON.stringify(formData));
  const sendCredentialsForLogin = await fetch(
    "https://multi-vendor-e-commerce-backend.vercel.app/api/users/auth/login",
    {
      method: request.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const resData = await sendCredentialsForLogin.json();
  console.log(sendCredentialsForLogin.status);
  console.log(sendCredentialsForLogin);

  if(sendCredentialsForLogin.status === 200){
    return redirect('/user')
  }
  return null;
};
