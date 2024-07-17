import React from 'react'
import { Link, useLocation, useSubmit } from 'react-router-dom'
import LinkNavbar from './LinkNavbar';
import { useDispatch } from 'react-redux';
import { cartAction } from '../store/CartSlice';
 const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const pathName = segments[1];
  const submit = useSubmit()

  const logOutHandler = () => {
    dispatch(cartAction.resetCart());
    submit(null,{ method: "POST", encType: "application/json", action:`/user` })
  }
    return (
      <div>
        <nav className="bg-green-900 p-2 ">
        <div className="container mx-auto  flex justify-between items-center">
          <div className="text-white text-lg font-bold ">
             <Link to='/'>E-Commerce App</Link>
          </div>
          <button onClick={logOutHandler} className="font-bold bg-yellow-300 text-green-900 px-4 py-2 rounded hover:bg-yellow-700 transition duration-300 hover:bg-transparent hover:text-yellow-300">
            Sign Out
          </button>
        </div>
      </nav>

      </div>
    );
  };

  export default Navbar;