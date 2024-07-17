import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import LinkNavbar from "../Components/LinkNavbar";
import { redirect, useLoaderData, Link, useLocation } from "react-router-dom";
import { cartAction } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import star from "../assets/star.png";

const ProductDetailPage = () => {
  const fetchedProductDetailData = useLoaderData();
  const [product, setProduct] = useState([]);
  const [sameCategoryProduct, setSameCategoryProducts] = useState([]);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryname = location.pathname.split("/")[3];
  console.log(categoryname);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const getSameCategoryProducts = async () => {
      try {
        const sameProducts = await fetch(
          `http://localhost:3000/api/products/categoryproducts?filter=categories&value=${fetchedProductDetailData.categories}`,
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
        seller: product.seller,
      })
    );
  };

  const viewSpecificationHandle = () => {
    setShowSpecifications(!showSpecifications);
    setShowReviews(false);
  };
  const viewReviewsHandle = () => {
    setShowReviews(!showReviews);
    setShowSpecifications(false);
  };
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Product Image */}
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-[500px] md:h-[500px] object-cover object-center"
          />

          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex flex-col gap-2 justify-center items-start">
              <div className="flex gap-2 justify-start items-center">
                <p className="font-bold text-green-900">
                  Average Rating:{" "}
                  {product && product.reviews && product.reviews.averageRating
                    ? product.reviews.averageRating
                    : 0}
                </p>
                <p className="font-bold text-green-900">
                  Total Reviews:{" "}
                  {product && product.reviews && product.reviews.customerReviews
                    ? product.reviews.customerReviews.length
                    : 0}
                </p>
              </div>
              <div className="flex gap-2">
                {" "}
                {Array.from({
                  length:
                    product.reviews &&
                    product.reviews.averageRating &&
                    Math.round(product.reviews.averageRating),
                }).map((eachRating) => (
                  <img src={star} className="w-4 h-4" />
                ))}
              </div>
            </div>
            <div className="mt-8 mb-8">
              <p>{product.description}</p>
            </div>

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
                    ₺ {product.price}
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
            <button
              onClick={addToCartHanlde}
              className="mt-5 bg-green-900 text-white py-2 px-4 rounded hover:bg-yellow-300 hover:text-green-900 font-bold transition duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Specification Dropdown */}
        <div className="mt-8 ">
          {
            <button
              onClick={viewSpecificationHandle}
              className="bg-green-900 text-white py-2 px-4 rounded hover:bg-yellow-300 hover:text-green-900 font-bold transition duration-300"
            >
              {showSpecifications
                ? "Hide Specifications"
                : "Show Specifications"}
            </button>
          }
          {
            <button
              onClick={viewReviewsHandle}
              className="bg-green-900 text-white ml-2 py-2 px-4 rounded hover:bg-yellow-300 hover:text-green-900 font-bold transition duration-300"
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
          }
          {showSpecifications &&
            (product && product.productSpecifications ? (
              <div className=" top-full left-0 mt-2 w-full z-10">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.productSpecifications).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <td className="p-2 border border-gray-300">
                              {key}
                            </td>
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
            ) : (
              <>
                <br />
                <p className="font-bold text-green-900 mt-2">
                  No Specifications To Show
                </p>
              </>
            ))}
        </div>

        {/* Customer Reviews */}
        {showReviews &&
          product.reviews &&
          product.reviews.customerReviews.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              <div className="flex flex-col gap-2 justify-center items-start mb-2">
                <div className="flex gap-2 justify-start items-center">
                  <p className="font-bold text-green-900">
                    Average Rating:{" "}
                    {product && product.reviews && product.reviews.averageRating
                      ? product.reviews.averageRating
                      : 0}
                  </p>
                  <p className="font-bold text-green-900">
                    Total Reviews:{" "}
                    {product &&
                    product.reviews &&
                    product.reviews.customerReviews
                      ? product.reviews.customerReviews.length
                      : 0}
                  </p>
                </div>
                <div className="flex gap-2">
                  {" "}
                  {Array.from({
                    length:
                      product.reviews &&
                      product.reviews.averageRating &&
                      Math.round(product.reviews.averageRating),
                  }).map((eachRating) => (
                    <img src={star} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              {product.reviews &&
                product.reviews.customerReviews.length > 0 && (
                  <div className="p-4 border border-gray-300 rounded-lg mb-4">
                    {product.reviews.customerReviews.map((review, index) => (
                      <>
                        <div
                          className="border border-gray-300 p-2 m-2"
                          key={index}
                        >
                          <div className="flex items-center mb-4">
                            <img
                              src="https://franchisematch.com/wp-content/uploads/2015/02/john-doe-300x300.jpg"
                              alt="User Avatar"
                              className="w-10 h-10 rounded-full mr-4"
                            />

                            <div>
                              <h2 className="text-lg font-semibold">
                                {review.username}
                              </h2>
                              <p className="text-gray-500">
                                Posted on: {review.date || "unknown"}
                              </p>
                            </div>
                          </div>

                          <p className="mb-1">{review.comment}</p>
                          <button className="mr-2 mb-2 text-green-900 font-bold">
                            Like
                          </button>
                          <button className="mr-2 mb-2 text-red-800 font-bold">
                            Dislike
                          </button>
                        </div>
                      </>
                    ))}
                  </div>
                )}
            </div>
          )}
      </div>
      <div className="container mx-auto w-11/12 p-3 border border-gray-300 rounded mb-2">
        <h2 className="text-2xl font-bold mb-6">Products in Same Category</h2>
        {sameCategoryProduct && sameCategoryProduct.length > 0 ? (
          <div className="overflow-x-auto hide-scrollbar">
            <div className="flex space-x-6">
              {sameCategoryProduct.map((product) => (
                <div
                  key={product._id}
                  className="flex-none w-64 bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={product.img}
                    alt="bike-image"
                    className="h-[250px] mx-auto mt-5 mb-5 "
                  />
                  <Link to={`/user/products/${categoryname}/${product._id}`}>
                    <h2 className="text-lg font-bold mb-1 text-green-900">
                      {product.name}
                    </h2>
                  </Link>
                  <div className="flex flex-col justify-center items-start ">
                    <p className="text-xl text-green-900 font-bold">
                      {product.price} ₺
                    </p>
                    <div className="flex h-[50px] justify-start items-center gap-2 ">
                      {Array.from({
                        length:
                          product.reviews &&
                          product.reviews.averageRating &&
                          Math.round(product.reviews.averageRating),
                      }).map((eachRating) => (
                        <img src={star} className="w-4 h-4" />
                      ))}
                      <p className="text-[12px] font-bold">
                        (
                        {product.reviews && product.reviews.averageRating
                          ? Math.round(product.reviews.averageRating)
                          : 0}
                        /5)
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p>No Matching Products Available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;

export const prdouctDetailLoader = async ({ request, params }) => {
  const productId = params.productId;

  const fetchProductDetailsRequest = await fetch(
    `http://localhost:3000/api/products/${productId}`,
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
