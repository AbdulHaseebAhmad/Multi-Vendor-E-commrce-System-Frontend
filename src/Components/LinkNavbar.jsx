import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function LinkNavbar() {
  
  const user = useSelector((state)=> state.user.user);
  const totalCartItems = useSelector((state)=> state.cart.totalItems);

   return (
    <nav className="bg-green-900 p-4  w-8/12 mx-auto mt-4 ">
      <div className="container mx-auto w-12/12 flex justify-between items-center">
        <div className="flex flex space-x-">
        <h5 className="font-bold text-[20px] text-white hover:text-yellow-300 transition duration-300">Welcome</h5>
        <p className="ml-2 font-bold text-[20px] text-yellow-300 hover:text-yellow-300 transition duration-300">{user && user.username}</p>
        </div>
        <div className="flex space-x-6 ">
          <Link
            to="/user/products/all"
            className="font-bold text-xl text-white hover:text-yellow-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            to="/user/profile"
            className="font-bold text-xl text-white hover:text-yellow-300 transition duration-300"
          >
            My Profile
          </Link>
          <Link
            to="/user/favourites"
            className="font-bold text-xl text-white hover:text-yellow-300 transition duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/user/cart"
            className="font-bold text-xl text-white hover:text-yellow-300 transition duration-300"
          >
            Cart-({totalCartItems})
          </Link>
        </div>
      </div>
    </nav>
  );
}
