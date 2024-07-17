import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VerticalNavbar = ({selectScreen}) => {
  const { displayname } = useSelector((state) => state.user.user);

  const screenHanlde = (e) => {
    selectScreen(e.target.id);
  };
  return (  
    <nav className="bg-green-900 min-h-content h-[557px] w-[300px] max-w-none flex flex-col justify-between pt-1 mt-0 ml-0 pb-3">
      <div className="p-4">
        <div className="text-white text-md font-bold mb-8">
          <h5>{displayname}'s Profile</h5>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id="UserDetails"
            onClick={screenHanlde}
          >
            User Details
          </button>
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id="UserSettings"
            onClick={screenHanlde}           
          >
            Security Settings
          </button>
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id="ProfileWallet"
            onClick={screenHanlde}
          >
            Wallet
          </button>
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id=""
            onClick={screenHanlde}
          >
            Coupons
          </button>
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id="PreviousOrders"
            onClick={screenHanlde}
          >
            Previous Orders
          </button>
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id="CurrentOrders"
            onClick={screenHanlde}
          >
            Current Orders
          </button>
         
          <button
            type="button"
            className="flex justify-start text-white hover:text-yellow-300 transition duration-300"
            id=""
            onClick={screenHanlde}
          >
            Favourite Brands
          </button>
          
        </div>
      </div>
      <div className="p-4">
        <Link
          to="/"
          className="bg-yellow-300 text-green-900 px-4 py-2 rounded hover:bg-green-900 hover:text-yellow-300 font-bold transition duration-300"
        >
          Home
        </Link>
      </div>
    </nav>
  );
};


export default VerticalNavbar;
