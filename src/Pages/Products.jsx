import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import LinkNavbar from "../Components/LinkNavbar";
import ProductsFilter from "../Components/ProductsFilter";
import { Link, redirect, useLoaderData, useLocation } from "react-router-dom";
import star from "../assets/star.png";

const ProductsPage = () => {
  const fetchedProductsData = useLoaderData();
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const location = useLocation();
  const categoryname = location.pathname.split("/")[3];
  const isSuperDeal = location.pathname.split("/")[4];
  console.log(isSuperDeal);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default category option
  const [selectedPrice, setSelectedPrice] = useState("all"); // Default price option
  const [selectedColor, setSelectedColor] = useState("all"); // Default color option
  const [selectedSize, setSelectedSize] = useState("all"); // Default size option

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if(isSuperDeal){
      const dealproducts = fetchedProductsData.filter((eachProduct)=> {return eachProduct.discountDetails !== undefined})
      setFetchedProducts(dealproducts);
    } else {
      setFetchedProducts(fetchedProductsData);

    }
  }, []);

  // Filter products based on selected filter options
  const filteredProducts = fetchedProducts.filter((product) => {
    return (
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (selectedPrice === "all" || product.price === selectedPrice) &&
      (selectedColor === "all" || product.color === selectedColor) &&
      (selectedSize === "all" || product.size === selectedSize) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <ProductsFilter />
        {/* Search Bar */}
        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-4">
          {fetchedProducts.length > 0 ? fetchedProducts.map((product) => (
            <div
              key={product.id}
              className="relative border border-gray-300 p-4 rounded"
            >
              {product && product.discountDetails && (
                <div className="absolute flex w-[90%] m-0 justify-between">
                  <div className="bg-red-800 p-1">
                    <p className="text-yellow-300  font-bold">Discounted</p>
                  </div>
                  <div className="bg-red-800 p-1">
                    <p className="text-yellow-300  font-bold">
                      {product.discountDetails["Deal Name"]}
                    </p>
                  </div>
                </div>
              )}
              <img
                src={product.img}
                alt="bike-image"
                className="h-[250px] mx-auto mt-5 mb-5 "
              />
              <Link to={`/user/products/${categoryname}/${product._id}`}>
                <h2 className="text-lg font-bold mb-2 text-green-900">
                  {product.name}
                </h2>
              </Link>
              <div className="flex justify-between items-center ">
                <div className="flex gap-2">
                  <p
                    className="text-xl text-green-900 font-bold"
                    style={{
                      textDecoration: product.discountDetails && "line-through",
                      fontSize: product.discountDetails && "15px",
                    }}
                  >
                    {product.price} ₺
                  </p>
                  {product.discountDetails && (
                    <p className="text-xl text-green-900 font-bold">
                      {product.discountDetails["New Price"]} ₺
                    </p>
                  )}
                </div>
                <div className="flex h-[50px] p-2 space-x- justify-start items-center gap-2 ">
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
          )) : <p className="text-green-900 font-semibold text-xl">No Products Available</p>}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

export const productsLoader = async ({ request, params }) => {
  const { categoryname } = params;
  console.log(request.url.split('/'));
  let url =
    categoryname === "all"
      ? "https://52.70.243.175:443/api/products/allproducts"
      : `https://52.70.243.175:443/api/products/categoryproducts?filter=categories&value=${categoryname}`;
  const sendProductFetchRequest = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/**",
    },
  });
  const requestResponse = await sendProductFetchRequest.json();
  if (requestResponse.status === 401) {
    return redirect("/login");
  } else {
    console.log(requestResponse);
    return requestResponse;
  }
};
