import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCurrentOrders = () => {
  const user = useSelector((state) => state.user.user);
  const { _id } = user;
  const [orders,setOrders] = useState();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const getorders = async () => {
      let localOrders = [];
      const orders = await fetch(
        `https://multi-vendor-e-commerce-backend.vercel.app/api/orders/getcustomerorders?customerid=${_id}`,
        { method: "GET", credentials: "include" }
      );
      if(orders.ok){
        const fetchedOrders = await orders.json();
        console.log(fetchedOrders.msg)
        setOrders(fetchedOrders.msg.filter((eachOrder)=>eachOrder.orderstatus === 'pending'))
      }
    };
    getorders()
  }, []);
  const handleOrderClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container w-12/12 mx-auto p-8 min-h-screen ">
      <h1 className="text-3xl text-green-900 font-bold mb-8">Current Orders</h1>

  
      <div className="grid grid-cols-5 md:grid-cols-1 sm:grid-cols-1 place-center gap-5 max-h-content">
        {orders &&
          orders.map((order,index) => (
            <div
              key={order._id}
              className="transition duration-300 w-100 min-h-48 border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer relative"
              onClick={() => handleOrderClick(order._id)}
            >
              <div>Order Number : {index}</div>
              <div className="mt-2 text-center">
                <div className="text-lg font-semibold">
                  Price: ${order.totalAmount}
                </div>
                <div className="text-sm text-gray-500">
                  Quantity: {order.totalItems}
                </div>
                <div className="text-sm text-gray-500">
                  Seller: {order.seller}
                </div>
              </div>
              {expandedOrder === order._id && (
                <div className="mt-3 w-full">
                  {order &&
                    order.cartItems &&
                    order.cartItems.map(({ eachItem }, index) => {
                      return (
                        <div className="p-5 transition duration-300 top-full left-0 w-full bg-gray-100 border-t border-gray-300 p-2 mt- rounded-lg shadow-lg mb-0">
                          <div
                            key={index}
                            className="flex justify-between items-center py-2 border-b border-gray-300 last:border-none"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={eachItem.image}
                                alt={eachItem.name}
                                className="w-12 h-12 object-contain"
                              />
                              <Link to = {`/products/${eachItem.id}`}>
                                <div className="text-sm">{eachItem.name}</div>
                              </Link>
                            </div>
                            <div className="text-sm">
                              Unit Price: ${eachItem.price}
                            </div>
                            <div className="text-sm">
                              Quantity: {eachItem.quantity}
                            </div>
                            <div className="text-sm">
                              Total Price: ${eachItem.price * eachItem.quantity}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {orders
                    .filter((eachOrder) => {
                      return eachOrder._id === expandedOrder;
                    })
                    .map((order) => {
                      return (
                        <div className="transition duration-300 top-full left-0 w-full bg-gray-100 border-t border-gray-300 px-4 p-2 mt- rounded-lg shadow-lg mb-0">
                          <div
                            key={order._id}
                            className="flex justify-end gap-[20%] items-center py-2 border-b border-gray-300 last:border-none"
                          >
                            <div className="text-sm"></div>
                            <div className="text-sm"></div>
                            <div className="text-sm text-center">
                              Total Quantity: {order.totalItems}
                            </div>
                            <div className="text-sm">
                              Total Price: $ {order.totalAmount}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileCurrentOrders;
