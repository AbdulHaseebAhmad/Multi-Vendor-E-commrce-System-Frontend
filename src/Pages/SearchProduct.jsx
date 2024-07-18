import React, { useEffect, useState } from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
const SearchProduct = () => {
  const [product, setProduct] = useState();
  const [productId, setProductId] = useState("");
  console.log(productId);
  const {user:{_id}} = useRouteLoaderData('shophome');
  console.log(_id)
  const getProduct = async () => {
    const request = await fetch(
      `https://multi-vendor-e-commerce-backend.vercel.app/api/products/searchproducts/${productId}?sellerId=${_id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    const { msg } = response;
    setProduct(msg);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-start min-h-screen  p-4">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Product ID"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-900"
            onChange={(e) => {
              setProductId(e.target.value);
            }}
          />
          <button
            onClick={getProduct}
            className="w-full mt-4 p-2 bg-green-900 text-white rounded-md hover:text-green-900 hover:font-semibold hover:bg-yellow-300"
          >
            Search Product
          </button>
        </div>
        {product && product != undefined && (
          <div className="w-full mt-5 flex justify-start">
          <div
            className="bg-white p-4 rounded-lg shadow-md min-w-[200px] flex-shrink-0"
            key={product._id}
          >
            <img
              src={product.img}
              alt="Product Image"
              className="h-[170px] w-[180px] mx-auto mb-2"
            />
            <Link to={`/shop/vieproducts/${product._id}`}>
              <h4 className="text-lg font-bold">{product.name}</h4>
            </Link>
            <div className="flex w-full justify-between items-center">
              <p>${product.price}</p>{" "}
              <span className="flex gap-2">
                <Link to={`/shop/editproduct/${product._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#064E3B"
                    className="size-4 hover:cursor-pointer"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="red"
                  className="size-4 hover:cursor-pointer"
                  onClick={() => {
                    deleteproductHandle(_id);
                  }}
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                  <path
                    fillRule="evenodd"
                    d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
