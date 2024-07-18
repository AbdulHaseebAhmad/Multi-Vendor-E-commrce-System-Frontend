import React, { useState } from "react";
import { useLoaderData, useSubmit, redirect } from "react-router-dom";

export default function EditProduct() {
  const product = useLoaderData();
  console.log(product);
  const submit = useSubmit();
  const [isDiscounted, setDiscounted] = useState(
    product.discountDetails ? true : false
  );
  const [discountApplied , setdiscountApplied] = useState(product.discountDetails ? true : false);

  console.log(isDiscounted);
  const productDetails = {};
  const [productToAdd, setProductToAdd] = useState({
    brand: product.brand,
    categories: product.categories,
    color: product.color,
    description: product.description,
    gender: product.gender,
    id: product.id,
    img: product.img,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    size: product.size,
    tags: product.tags,
    productSpecifications: product.productSpecifications,
    seller: product.seller,
    _id: product._id,
  });

  const [discountDetails, setDiscountDetails] = useState(product.discountDetails ? product.discountDetails : {
    ["New Price"]: "",
    ["Deal Name"]: "",
  });

  const discountChangeHandle = (e) => {
    const { name, value } = e.target;
    setDiscountDetails({ ...discountDetails, [name]: value });
    setProductToAdd((prevProductdetails) => ({
      ...prevProductdetails,
      discountDetails: {
        ...prevProductdetails.discountDetails,
        [name]: value,
      },
    }));
    console.log(productToAdd);
  };

  const addDiscountHandle = async () => {
    if (product.discountDetails) {
      delete product.discountDetails;
    }
    if (productToAdd.discountDetails) {
      delete productToAdd.discountDetails;
    }

    setDiscounted(!isDiscounted);
  };
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
  const editproducthandle = (e) => {
    addDealHandle()
    submit(productToAdd, {
      method: "PUT",
      action: "/shop/editproduct/:productid",
      encType: "application/json",
    });
  };

  const addDealHandle = async () => {
    let url = "";
    let method = "";
    if(isDiscounted){
      url = `https://multi-vendor-e-commerce-backend.vercel.app/api/deals?categoryname=${product.categories}&dealname=${discountDetails['Deal Name']}`
      method = 'POST'
    } else {
      url = `https://multi-vendor-e-commerce-backend.vercel.app/api/deals/deletecategory?categoryname=${product.categories}`;
      method = 'DELETE'
    }

    const request = await fetch(url,{
      method:method,
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res = await request.json();
    console.log(request)
    console.log(res)
  }
  return (
    <div className="p-2 min-h-screen flex flex-col items-center justify-center bg-green-900 text-white ">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8 bg-yellow-300 text-green-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={editproducthandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {Object.entries(productToAdd)
              .filter(([field, value]) => {
                return (
                  field !== "productSpecifications" &&
                  field !== "discountDetails"
                );
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
                      readOnly={field === "seller" || field === "_id"}
                    />
                  </div>
                );
              })}

            <div class="mb-4 flex items-center justify-start gap-2">
              <label className="font-bold" htmlFor="discounted">
                Add Discount
              </label>
              <input
                onChange={addDiscountHandle}
                name="discounted"
                type="checkbox"
                id="discounted"
                checked={isDiscounted}
              />
            </div>

            <br />
            {isDiscounted &&
              Object.entries(discountDetails)
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
                        onChange={discountChangeHandle}
                        name={field}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        type="text"
                        id="productName"
                        placeholder={
                          product.discountDetails
                            ? product.discountDetails[field]
                            : `Enter ${field}`
                        }
                        value={value}
                      />
                    </div>
                  );
                })}

            {productToAdd.productSpecifications && (
              <>
                {" "}
                <h3 className="font-bold text-green-900">
                  Product Specifications
                </h3>{" "}
                <br />
              </>
            )}
            {productToAdd.productSpecifications &&
              Object.entries(productToAdd.productSpecifications).map(
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
                    className="font-bold block text-sm  mb-2"
                    htmlFor="productName"
                  >
                    Add Product Specifications
                  </label>
                  <input
                    onChange={recordSpecHandle}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="productName"
                    placeholder="Enter product Specification"
                    value={specification}
                  />
                </div>
                <button
                  onClick={addSpecificationHandle}
                  className="font-bold flex-1 w-[20px] text-[15px]  h-10 bg-green-900 text-yellow-300 p-2"
                  disabled={specification.length === 0}
                >
                  Add
                </button>
              </div>
            }
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-900 text-white font-semibold hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50"
            >
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export const editproductloader = async ({ request, params }) => {
  const { productid } = params;
  const getproduct = await fetch(
    `https://multi-vendor-e-commerce-backend.vercel.app/api/products/${productid}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (getproduct.ok) {
    const response = await getproduct.json();
    return response;
  }
};

export const editproductaction = async ({ request, params }) => {
  const { method, encType } = request;
  const body = await request.json();
  console.log(body);
  const sendRequest = await fetch(
    "https://multi-vendor-e-commerce-backend.vercel.app/api/shop/editproduct",
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (sendRequest.ok) {
    redirect("/shop");
  }
};
