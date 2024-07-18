import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import LinkNavbar from "../Components/LinkNavbar";
import { redirect, useLoaderData, Link } from "react-router-dom";
import { cartAction } from "../store/CartSlice";
import { useDispatch } from "react-redux";

const ViewProductDetails = () => {
  const fetchedProductDetailData = useLoaderData();
  const [product, setProduct] = useState([]);
  const [sameCategoryProduct, setSameCategoryProducts] = useState([]);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const getSameCategoryProducts = async () => {
      try {
        const sameProducts = await fetch(
          `https://multi-vendor-e-commerce-backend.vercel.app/api/products/categoryproducts?filter=categories&value=${fetchedProductDetailData.categories}`,
          {
            method: "Get",
            credentials: "include",
            headers: {
              Accept: "*/**",
            },
          }
        );
        const sameProductsss = await sameProducts.json();
        setProduct(fetchedProductDetailData);

        setSameCategoryProducts(sameProductsss);
      } catch (err) {
        console.log(err);
      }
    };
    getSameCategoryProducts();
  }, [product, fetchedProductDetailData]);

  const addToCartHanlde = () => {
    dispatch(
      cartAction.addItemToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        brand: product.brand,
        image: product.img,
        seller:product.seller,
      })
    );
  };

  return (
    <>
     
      <div className="container w-12/12 p-2 ">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[500px] md:h-[500px] object-cover object-center"
          />

          {/* Product Information */}
          <div>
            <div className="mt-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p>{product.description}</p>
            </div>
            <h2 className="text-xl font-semibold mb-2">Product Information</h2>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300">Brand</td>
                  <td className="p-2 border border-gray-300">
                    {product.brand}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">Price</td>
                  <td className="p-2 border border-gray-300">
                  ₺{product.price}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">Gender</td>
                  <td className="p-2 border border-gray-300">
                    {product.gender}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">Tags</td>
                  <td className="p-2 border border-gray-300">{product.tags}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-300">categories</td>
                  <td className="p-2 border border-gray-300">
                    {product.categories}
                  </td>
                </tr>
                
              </tbody>
            </table>
            
          </div>
        </div>

        {/* Specification Dropdown */}
        <div className="mt-8 ">
          {  <button onClick={() => setShowSpecifications(!showSpecifications)}
            className="bg-green-900 text-white py-2 px-4 rounded hover:bg-yellow-300 hover:text-green-900 font-bold transition duration-300"
          >
            {showSpecifications  ? "Hide Specifications" : "Show Specifications"}
          </button>}
          {showSpecifications  && (product && product.productSpecifications ? (
            <div className=" top-full left-0 mt-2 w-full z-10">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.productSpecifications).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="p-2 border border-gray-300">{key}</td>
                          <td className="p-2 border border-gray-300">
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ): <><br/><p className="font-bold text-green-900 mt-2">No Specifications To Show</p></>)}
        </div>

        {/* Customer Reviews */}
        {product.reviews && product.reviews.customerReviews.length > 0 && <div className="mt-8">
          <h2 className="text-2xl w-9/12 font-semibold mb-4 ">Customer Reviews</h2>
          <div className="flex gap-5 mb-5">
            <p>Average Rating: </p>
            <p>Total Reviews: </p>
          </div>
          
        </div>}
      </div>
     
    </>
  );
};

export default ViewProductDetails;

export const prdouctDetailLoader = async ({ request, params }) => {
  const productId = params.productId;

  const fetchProductDetailsRequest = await fetch(
    `https://multi-vendor-e-commerce-backend.vercel.app/api/products/${productId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*//****",
      },
    }
  );
  if (fetchProductDetailsRequest.status == 401) {
    return redirect("/");
  }
  if (fetchProductDetailsRequest.status == 200) {
    const fetcProducDetailRequestResponse =
      await fetchProductDetailsRequest.json();
    return fetcProducDetailRequestResponse;
  }
};
