import React, { useState } from "react";
import { redirect, useRouteLoaderData, useSubmit } from "react-router-dom";

export default function ShopAddProduct({ shopId }) {
  const shopData = useRouteLoaderData("shophome");
  const userData = shopData.user;
  const { _id } = userData;
  const submit = useSubmit();

  const [productToAdd, setProductToAdd] = useState({
    id: "",
    name: "",
    img: "",
    price: "",
    description: "",
    color: "",
    size: "",
    brand: "",
    quantity: "",
    categories: "",
    tags: "",
    gender: "",
    seller: _id,
    productSpecifications: {},
  });

  const [specification, setSpecification] = useState("");

  const recordSpecHandle = (e) => {
    const { value } = e.target;
    setSpecification(value);
  };
  const addSpecificationHandle = () => {
    setProductToAdd((prevProductdetails) => ({
      ...prevProductdetails,
      productSpecifications: {
        ...prevProductdetails.productSpecifications,
        [specification]: "",
      },
    }));
    setSpecification("");
    //setProductToAdd({...productToAdd,productSpecifications[specification]:''})
  };
  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setProductToAdd({ ...productToAdd, [name]: value });
  };

  const inputChangeSepcificationHandle = (e) => {
    const { name, value } = e.target;
    setProductToAdd((prevProductdetails) => ({
      ...prevProductdetails,
      productSpecifications: {
        ...prevProductdetails.productSpecifications,
        [name]: value,
      },
    }));
  };
  const addProductHandle = (e) => {
    submit(productToAdd, {
      method: "POST",
      action: "/shop/addproduct",
      encType: "application/json",
    });
  };
  return (
    <div className="p-2 min-h-screen flex flex-col items-center justify-center bg-green-900 text-white ">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 bg-yellow-300 text-green-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={addProductHandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(productToAdd)
              .filter(([field, value]) => {
                return field !== "productSpecifications";
              })
              .map(([field, value]) => {
                return (
                  <div class="mb-4" key={field}>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="productName"
                    >
                      {field &&
                        field.length !== 0 &&
                        field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      onChange={inputChangeHandle}
                      name={field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      type="text"
                      id="productName"
                      placeholder={`Enter ${field}`}
                      value={value}
                      readOnly={field === "seller"}
                    />
                  </div>
                );
              })}

              {productToAdd.productSpecifications && (
              <>
                {" "}
                <br/><h3 className="font-bold text-green-900">Product Specifications</h3> <br />
              </>
            )}
            {Object.entries(productToAdd.productSpecifications).map(
              ([field, value]) => {
                return (
                  <div class="mb-4" key={field}>
                    <label
                      className="block text-sm font-medium mb-2"
                      htmlFor="productName"
                    >
                      {field[0].toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      onChange={inputChangeSepcificationHandle}
                      name={field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      type="text"
                      id={field}
                      value={value}
                      placeholder={field}
                    />
                  </div>
                );
              }
            )}
            {
              <div class="mb-4 flex gap-2 items-end">
                <div className="flex-2 w-[250px]">
                  <label
                    className="block text-sm font-medium mb-2"
                    htmlFor="productName"
                  >
                    Product Specifications
                  </label>
                  <input
                    onChange={recordSpecHandle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="productName"
                    placeholder="Enter product name"
                    value={specification}
                  />
                </div>
                <button
                  onClick={addSpecificationHandle}
                  className="font-bold flex-1 w-[20px] text-[10px]  h-10 bg-green-900 text-yellow-300 p-2"
                  disabled={specification.length === 0}
                >
                  Add Specification
                </button>
              </div>
            }
          </div>

          <div className="text-center">
            <button type='submit' className="px-6 py-2 rounded-lg bg-green-900 text-white font-semibold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const addProductAction = async ({request,params}) => {
  const { method, encType } = request;
  const body = await request.json();
  console.log(body)
  const sendRequest = await fetch("https://52.70.243.175:443/api/shop/addproduct", {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(body),
  });
  if(sendRequest.ok){
    redirect('/shop')
  }
};
