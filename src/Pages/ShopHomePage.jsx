import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

export default function ShopHomePage() {
  const shopData = useRouteLoaderData("shophome");
  const userData = shopData.user;
  const {
    brands,
    completedorders,
    pendingorders,
    shopname,
    shopid,
    shoplogo,
    totalorders,
    _id,
  } = userData;

  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  useEffect(() => {
    const products = async () => {
      const getproducts = await fetch(
        `http://localhost:3000/api/shop/getproducts?shopid=${_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await getproducts.json();

      if (getproducts.status === 200) {
        const { products } = response;
        setFetchedProducts(products);
      }
    };

    const ordersdata = async () => {
      const getordersdata = await fetch( `http://localhost:3000/api/orders/getshoporders?shopid=${_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    ); 
    const response = await getordersdata.json();

     if(getordersdata.ok){
      setFetchedOrders(response.msg)
     }
    }
    products();
    ordersdata();
  }, []);

  const deleteproductHandle = async (id) => {
    const sendDeleteProductRequest = await fetch(`http://localhost:3000/api/shop/deleteproduct?productid=${id}`,{
      method:"DELETE",
      credentials:'include'
    })
    const response = await sendDeleteProductRequest.json();
    console.log(sendDeleteProductRequest.status)
    if(sendDeleteProductRequest.status === 200){
      window.location.reload()
    }

  }

  return (
    <div className="bg-yellow-100">
      <div className="flex">
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Total Orders</h3>
              <p className="text-2xl">{fetchedOrders.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Pending Orders</h3>
              <p className="text-2xl">{fetchedOrders.filter((order)=>{return order.orderstatus === 'pending'}).length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Completed Orders</h3>
              <p className="text-2xl">{fetchedOrders.filter((order)=>{return order.orderstatus === 'completed'}).length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Most Selling Brand</h3>
              <p className="text-2xl">Brand A</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">
                Most Selling Product Category
              </h3>
              <p className="text-2xl">Category X</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Most Selling Products</h3>
              <ul className="list-disc list-inside">
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Brands We Deal In</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.map(({ brandname, brandimage }, index) => {
                return (
                  <div
                    className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
                    key={index}
                  >
                    <img
                      src={brandimage}
                      alt="Brand Logo"
                      className="h-full w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-[950px] overflow-hidden">
            <h3 className="text-xl font-bold mb-4">Products We Offer</h3>
            <div className="flex overflow-x-auto space-x-4 p-4 hide-scrollbar">
              {fetchedProducts.length !== 0 &&
                fetchedProducts.map(({ _id, name, img, price }) => (
                  <div
                    className="bg-white p-4 rounded-lg shadow-md min-w-[200px] flex-shrink-0"
                    key={_id}
                  >
                    <img
                      src={img}
                      alt="Product Image"
                      className="h-[170px] w-[220px] mx-auto mb-2"
                    />
                    <Link to={`/shop/vieproducts/${_id}`}>
                      <h4 className="text-lg font-bold">{name}</h4>
                    </Link>
                    <div className="flex w-full justify-between items-center">
                      <p>${price}</p>{" "}
                      <span className="flex gap-2">
                        <Link to={`editproduct/${_id}`}>
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
                          onClick={()=>{deleteproductHandle(_id)}}
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
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
