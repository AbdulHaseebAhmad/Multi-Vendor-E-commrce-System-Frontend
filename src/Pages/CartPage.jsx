import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import LinkNavbar from "../Components/LinkNavbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/CartSlice";
import { useSubmit } from "react-router-dom";
const CarPage = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const { address, phone, paymentoptions, username, _id } = user;
  const [showAddress, setShowAddress] = useState(false);
  const [addressSelection, setAddressSelection] = useState("");
  const [paymentSelection, setPaymentSelection] = useState("");
  const [customAddress, setCustomAddres] = useState();

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const { cartItems, totalItems, totalAmount } = cart;
  const dispatch = useDispatch();
  const submit = useSubmit();

  const handleIncreaseQuantity = (id) => {
    dispatch(cartAction.addItemToCart({ id: id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(cartAction.removeItemFromCart({ id: id }));
  };

  const placeOrder = () => {
    const selectedAddress = customAddress ? customAddress.address : address;
    const paymentType = paymentSelection === "1" ? "Main" : "Secondary";
    const selectedPhone = customAddress ? customAddress.phone : phone;
    const testCart = cartItems.map((eachItem) => {
      return { eachItem, seller: eachItem.seller };
    });
    const order = {
      cartItems: testCart,
      totalAmount,
      totalItems,
      selectedAddress,
      selectedPhone,
      paymentmethod: paymentType,
      orderstatus: "pending",
      userId: username,
      customerid: _id,
    };
    submit(order, {
      method: "POST",
      action: "/user/cart",
      encType: "application/json",
    });
    dispatch(cartAction.resetCart());
    // window.location.reload()
  };

  const showAddressHandle = () => {
    setAddressSelection("");
    setShowPaymentMethod(false);
    setShowAddress(!showAddress);
  };

  const ConfirmAddressHandle = () => {
    setShowAddress(!showAddress);
    setShowPaymentMethod(!showPaymentMethod);
  };
  const selectTypeOfAddress = (e) => {
    const { id } = e.target;
    setAddressSelection(id);
  };

  const selectTypeOfPayment = (e) => {
    const { id } = e.target;
    setPaymentSelection(id);
    //console.log(paymentSelection);
  };

  const onChangeAddress = (e) => {
    const { name, value } = e.target;
    setCustomAddres({ ...customAddress, [name]: value });
    //console.log(customAddress)
  };

  return (
    <>
      {" "}
      <div className="container mx-auto my-8">
        <table className="min-w-full bg-white border border-green-900">
          <thead>
            <tr className="w-full bg-green-900 text-yellow-300">
              <th className="py-2 px-4 border-b border-yellow-300">
                Product Image
              </th>
              <th className="py-2 px-4 border-b border-yellow-300">
                Product Name
              </th>
              <th className="py-2 px-4 border-b border-yellow-300">Price</th>
              <th className="py-2 px-4 border-b border-yellow-300">Quantity</th>
              <th className="py-2 px-4 border-b border-yellow-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="py-2 px-4 border-b border-green-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b border-green-900 text-green-900">
                  {item.name}
                </td>
                <td className="py-2 px-4 border-b border-green-900 text-green-900 tracking-wide">
                  {item.price} ₺
                </td>
                <td className="py-2 px-4 border-b border-green-900 text-green-900">
                  {item.quantity}
                </td>
                <td className="py-2 px-4 border-b border-green-900">
                  <button
                    className="bg-green-900 text-yellow-300 px-2 py-1 rounded mr-2 hover:bg-green-800"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-green-900 text-yellow-300 px-2 py-1 rounded hover:bg-green-800"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="5"
                className="py-2 px-4 border-t border-green-900 text-green-900"
              >
                <div className="flex justify-between ">
                  <p className="tracking-wide">Total Items: {totalItems}</p>
                  <p className="tracking-wide">Total Price: {totalAmount} ₺</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {!addressSelection && cartItems.length > 0 && (
          <button
            onClick={showAddressHandle}
            className="w-auto h-10 mt-5 bg-green-900  text-yellow-300  font-semibold rounded-sm pl-2 pr-2 transition duration-400 ease-in-out transform hover:bg-yellow-300 hover:text-green-900"
          >
            {showAddress ? "Cancel Address Selection" : "Choose Address"}
          </button>
        )}
      </div>
      {showAddress && (
        <div className="container mx-auto p-2">
          <h3 className="font-bold text-3xl text-green-900 mb-2">
            Address Selection
          </h3>
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-md w-1/2 relative">
              <div className="flex justify-between w-full items-center">
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Registered Address
                </h3>
                <input
                  type="radio"
                  name="address"
                  id="registered-address"
                  className="size-5 color-green-900"
                  onClick={selectTypeOfAddress}
                />
              </div>
              {addressSelection === "registered-address" && (
                <>
                  <div className="mb-4">
                    <label
                      for="registered-address-field"
                      className="block text-gray-700"
                    >
                      Address:
                    </label>
                    <p
                      id="registered-address-field"
                      className="border p-2 rounded bg-gray-100"
                    >
                      {address}
                    </p>
                  </div>
                  <div>
                    <label
                      for="registered-phone"
                      className="block text-gray-700"
                    >
                      Phone Number:
                    </label>
                    <p
                      id="registered-phone"
                      className="border p-2 rounded bg-gray-100"
                    >
                      {phone}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md w-1/2 relative">
              <div className="flex justify-between w-full items-center">
                <h3 className="text-xl font-bold mb-2 text-green-900">
                  Custom Address
                </h3>
                <input
                  type="radio"
                  name="address"
                  id="custom-address"
                  className="size-5"
                  onClick={selectTypeOfAddress}
                />
              </div>
              {addressSelection === "custom-address" && (
                <>
                  <div className="mb-4">
                    <label
                      for="custom-address-field"
                      className="block text-gray-700"
                    >
                      Address:
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="border p-2 rounded w-full"
                      placeholder="Enter your address"
                      onChange={onChangeAddress}
                    />
                  </div>
                  <div>
                    <label for="custom-phone" className="block text-gray-700">
                      Phone Number:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="border p-2 rounded w-full"
                      placeholder="Enter your phone number"
                      onChange={onChangeAddress}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <button
            onClick={ConfirmAddressHandle}
            className="w-auto h-10 mt-5 bg-green-900  text-yellow-300  font-semibold rounded-sm pl-2 pr-2 transition duration-400 ease-in-out transform hover:bg-yellow-300 hover:text-green-900"
          >
            Confirm Address
          </button>
        </div>
      )}
      {showPaymentMethod && cartItems.length > 0 && (
        <div className="container mx-auto p-2">
          <h3 className="font-bold text-3xl text-green-900 mb-2">
            Payment Method
          </h3>
          <div className="flex space-x-4">
            {Object.entries(paymentoptions).map(([field, value]) => {
              return (
                <div className="bg-white p-4 rounded-lg shadow-md w-1/2 relative">
                  <div className="flex justify-between w-full items-center">
                    <h3 className="text-xl font-bold text-green-900 mb-2">
                      {field}
                    </h3>
                    <input
                      type="radio"
                      name="address"
                      id={value.id}
                      className="size-5 color-green-900"
                      onClick={selectTypeOfPayment}
                    />
                  </div>
                  {value &&
                    paymentSelection == value.id &&
                    Object.entries(value.details).map(([field, value]) => {
                      return (
                        <div className="mb-4">
                          <label
                            for="registered-address-field"
                            className="block text-gray-700"
                          >
                            {field}:
                          </label>
                          <p
                            id="registered-address-field"
                            className="border p-2 rounded bg-gray-100"
                          >
                            {value}
                          </p>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
          <button
            onClick={placeOrder}
            className="w-auto h-10 mt-5 bg-green-900  text-yellow-300  font-semibold rounded-sm pl-2 pr-2 transition duration-400 ease-in-out transform hover:bg-yellow-300 hover:text-green-900"
          >
            Proceed CheckOut
          </button>
        </div>
      )}
    </>
  );
};

export default CarPage;

export const placeOrderAction = async ({ request, params }) => {
  const { method, encType } = await request;
  const order = await request.json();

  const placeOrder = await fetch(
    "https://52.70.243.175:443/api/orders/placeorder",
    {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  console.log(order);
  return null;
};
