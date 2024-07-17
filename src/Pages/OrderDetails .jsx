import React, { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useSubmit,
  useRouteLoaderData,
} from "react-router-dom";

const OrderDetails = () => {
  const data = useLoaderData();
  const shopData = useRouteLoaderData("shophome");
  const { shopname, phone } = shopData.user;
  const [printed, setPrinted] = useState(false);
  const {
    _id,
    cartItems,
    selectedAddress,
    selectedPhone,
    totalAmount,
    totalItems,
    orderstatus,
    userId,
  } = data;
  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`;
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;
  const submit = useSubmit();

  const completeOrderHandle = () => {
    console.log("hello");
    submit(
      { _id },
      {
        method: "PATCH",
        action: "/shop/orders/pendingorders",
        encType: "application/json",
      }
    );
  };

  const printReceiptHandle = () => {
    window.print();
    setTimeout(()=>{
        setPrinted(true);
    },[500])
  };

  return (
    <div
      className="container mx-auto p-6 bg-white shadow-md rounded-lg"
      id="order-details"
    >
      <div className="flex flex-col items-center gap-0 mb-6">
        <h1 className="mx-auto text-xl font-bold text-green-900">{shopname}</h1>
        <h3 className="mx-auto text-md font-bold text-green-900">{phone}</h3>
      </div>
      <div className="mb-6 flex justify-between">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <h2 className="text-xl font-semibold mb-2">Order Number:</h2>
          <h3 className="text-xl font-semibold mb-2">{_id}</h3>
        </div>
        <div className="">
          <p className="text-xl font-semibold mb-4">Date: {date}</p>
          <p className="text-xl font-semibold mb-2">Time: {currentTime}</p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Phone:</label>
            <p>{selectedPhone}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p>customer@example.com</p>
          </div>
          <div>
            <label className="font-semibold">Address:</label>
            <p>{selectedAddress}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>

        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Item</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Brand</th>
              <th className="py-2 px-4 border-b">Image</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Order Item */}
            {cartItems &&
              Object.entries(cartItems.map(({ eachItem }) => eachItem))
                .map(([field, value]) => value)
                .map(({ id, name, price, quantity, image, brand }) => (
                  <tr>
                    <Link to={`/products/${id}`}>
                      <td className="py-2 px-4 border-b text-center text-green-900 underline underline-dash">
                        {name}
                      </td>
                    </Link>
                    <td className="py-2 px-4 border-b text-center">
                      {quantity}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      $ {price}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{brand}</td>
                    <td className="flex py-2 px-4 border-b justify-center">
                      <img
                        src={image}
                        alt="Product"
                        class="w-12 h-12 object-cover"
                      />
                    </td>
                  </tr>
                ))}
            {/* Add more order items as needed */}

            <tr class="border-t">
              <td class="py-2 px-4"></td>
              <td class="py-2 px-4 text-right font-bold">
                Total Quantity: {totalItems}
              </td>
              <td class="py-2 px-4 text-right font-bold">
                Total Amount: $ {totalAmount}
              </td>
              <td class="py-2 px-4"></td>
              <td class="py-2 px-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4" id="print-buttons">
        <button
          onClick={completeOrderHandle}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          style={{background:!printed && 'grey'}}
          disabled={!printed}
        >
          Complete
        </button>
        <button
          onClick={printReceiptHandle}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

export const orderDetailsLoader = async ({ request, params }) => {
  const { orderid } = params;
  const getorderdetails = await fetch(
    `http://localhost:3000/api/orders/orderdetails?orderid=${orderid}`,
    { method: "GET", credentials: "include" }
  );
  const response = await getorderdetails.json();
  if (getorderdetails.ok) {
    return response.msg;
  } else {
    return { msg: "No Product Found" };
  }
};

export const orderCompleteRequest = async ({ request, params }) => {
  const { _id: orderid } = await request.json();
  console.log(orderid);
  const getorderdetails = await fetch(
    `http://localhost:3000/api/orders/completeorder?orderid=${orderid}`,
    { method: "PATCH", credentials: "include" }
  );
  const response = await getorderdetails.json();
  if (getorderdetails.ok) {
    return redirect("/shop/orders/pendingorders");
  } else {
    return { msg: "No Product Found" };
  }
};
