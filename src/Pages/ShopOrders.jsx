import React, { useEffect, useState } from "react";
import { Link, useLocation, useRouteLoaderData } from "react-router-dom";

export default function ShopOrders() {
  const {
    user: { _id },
  } = useRouteLoaderData("shophome");
  console.log(_id);
  const location = useLocation();
  const { pathname } = location;
  const segment = pathname.split("/");
  console.log(segment[3]);
  const [fetchedPendingOrders, setFetchedPendingOrders] = useState([]);
  const [fetchedCompletedOrders, setFetchedCompletedOrders] = useState([]);

  useEffect(() => {
    const orders = async () => {
      const request = await fetch(
        `http://localhost:3000/api/orders/getshoporders?shopid=${_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await request.json();
      console.log(response.msg, segment[3]);
      if (request.ok) {
        if (segment[3] === "pendingorders") {
          const pendingOrders = response.msg.filter(
            (eachOrder) => eachOrder.orderstatus !== "completed"
          );
          setFetchedPendingOrders(pendingOrders);
        } else if (segment[3] === "completedorders") {
          const completedOrders = response.msg.filter(
            (eachOrder) => eachOrder.orderstatus !== "pending"
          );
          setFetchedCompletedOrders(completedOrders);
        }
      } else {
        return null;
      }
    };
    orders();
  }, []);

  const viewOrderHandle = (e) => {
    const { value } = e.target;
    console.log(value);
  };

  return (
    <div className="bg-yellow-300 font-sans leading-normal tracking-normal">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-green-900">
          Pending Orders
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Customer Name</th>
                <th className="py-3 px-6 text-left">Customer Phone</th>
                <th className="py-3 px-6 text-left">Customer Address</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {segment[3] === "pendingorders" &&
                fetchedPendingOrders.length != 0 &&
                fetchedPendingOrders.map(
                  ({ _id, selectedPhone, userId, selectedAddress }, index) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={_id}
                    >
                      <td className="py-3 px-6 text-left">{index}</td>
                      <td className="py-3 px-6 text-left">
                        {_id.slice(0, 5)}....
                      </td>
                      <td className="py-3 px-6 text-left">{userId}</td>
                      <td className="py-3 px-6 text-left">{selectedPhone}</td>
                      <td className="py-3 px-6 text-left">
                        {selectedAddress.slice(0.5)}....
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <Link to={`${_id}`}>
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                              value={_id}
                              onClick={viewOrderHandle}
                            >
                              View
                            </button>
                          </Link>
                          
                        </div>
                      </td>
                    </tr>
                  )
                )}

              {segment[3] === "completedorders" &&
                fetchedCompletedOrders.length != 0 &&
                fetchedCompletedOrders.map( ({ _id, selectedPhone, userId, selectedAddress }, index) => (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100"
                      key={_id}
                    >
                      <td className="py-3 px-6 text-left">{index}</td>
                      <td className="py-3 px-6 text-left">
                        {_id.slice(0, 5)}....
                      </td>
                      <td className="py-3 px-6 text-left">{userId}</td>
                      <td className="py-3 px-6 text-left">{selectedPhone}</td>
                      <td className="py-3 px-6 text-left">
                        {selectedAddress.slice(0.5)}....
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <Link to={`${_id}`}>
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                              value={_id}
                              onClick={viewOrderHandle}
                            >
                              View
                            </button>
                          </Link>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
