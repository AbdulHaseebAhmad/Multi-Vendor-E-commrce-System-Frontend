import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PreviousOrders = () => {
  const orders = useSelector((state) => state.user.user.previousorders);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleOrderClick = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="container w-12/12 mx-auto p-8 min-h-screen ">
      <h1 className="text-3xl text-green-900 font-bold mb-8">
        Previous Orders
      </h1>

      <div className="grid grid-cols-5 md:grid-cols-1 sm:grid-cols-1 place-center gap-5 max-h-content">
        {orders && orders.map((order) => (
          <div
            key={order.id}
            className="transition duration-300 w-100 min-h-48 border border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer relative"
            onClick={() => handleOrderClick(order.id)}
          >
            <img
              src={order.image}
              alt={`Order ${order.id}`}
              className="w-24 h-24 object-contain"
            />
            <div className="mt-2 text-center">
              <div className="text-lg font-semibold">Price: ${order.price}</div>
              <div className="text-sm text-gray-500">Date: {order.date}</div>
              <div className="text-sm text-gray-500">
                Seller: {order.seller}
              </div>
            </div>
            {expandedOrder === order.id && (
              <div className="mt-3 w-full">
                {order.items.map((item, index) => (
                  <div className="transition duration-300 top-full left-0 w-full bg-gray-100 border-t border-gray-300 p-2 mt- rounded-lg shadow-lg mb-0">
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-300 last:border-none">
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-sm">
                        Unit Price: ${item.unitPrice}
                      </div>
                      <div className="text-sm">Quantity: {item.seller}</div>
                      <div className="text-sm">
                        Total Price: ${item.totalPrice}
                      </div>
                      <div className="text-sm">Seller: {item.seller}</div>
                    </div>
                  </div>
                ))}
                <div className="transition duration-300 top-full left-0 w-full bg-gray-100 border-t border-gray-300 px-4 p-2 mt- rounded-lg shadow-lg mb-0">
                <div
                      key={ order.id }
                      className="flex justify-between items-center py-2 border-b border-gray-300 last:border-none">
                      <div className="text-sm">
                        Total Price: ${'item.unitPrice'}
                      </div>
                      <div className="text-sm">Delivery Date: {'item.seller'}</div>
                      <div className="text-sm">
                        Delivery Company Price: ${'item.totalPrice'}
                      </div>
                      <div className="text-sm">Coupons: {'item.seller'}</div>
                    </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousOrders;
