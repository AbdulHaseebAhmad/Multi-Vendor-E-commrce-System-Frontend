import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BackgroundImageWithTitle = () => {
  const [items,setItems] = useState([]);
  const itemss = [
    {
      id: 1,
      image:
        "https://i5.walmartimages.com/asr/a2474c37-b022-4776-9a2c-3172e98ceede.f670f36d692b76e84cd792ee8837ce25.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      title: "Women",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/4b/ea/c1/4beac1a2ceb6ff197cd14c57547d5356.jpg",
      title: "Electronics",
    },
    {
      id: 3,
      image:
        "https://www.boden.co.uk/content/dam/boden/shops-and-categories/2024/wk17--gw-filterable-header---dresses/style/DT_ALL.jpg",
      title: "Bicycles",
    },
    {
      id: 4,
      image:
        "https://imgmedia.lbb.in/media/2023/03/641ad00f3b0e3b6d05db5675_1679478799910.jpg",
      title: "Home And Kitchen",
    },
    {
      id: 5,
      image:
        "https://r.lvmh-static.com/uploads/2018/03/regard-944x1270-1-944x1270.jpg",
      title: "Beauty ",
    },
    {
      id: 6,
      image:
        "https://www.dhresource.com/webp/m/0x0/f2/albu/g18/M01/CD/D5/rBVapWDrvSmAcoorAAHZ_cv8GL4186.jpg",
      title: "Loungerie",
    },
  ];

  useEffect(() => {
    const sendRequest = async () => {
      const request = await fetch("https://multi-vendor-e-commerce-backend.vercel.app/api/deals/gettrendingcategories", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const response = await request.json();
      setItems(response.msg)
    };
    sendRequest()
  },[]);

  return (
    <>
      <h2 className="font-bold text-4xl text-green-900 w-11/12  mb-[-20px] p-4 my-4 mx-auto">
        Super Deals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 w-11/12 h-[300px]   my-4 mx-auto">
        {items.length > 0 ? items.map((item) => (
          <div
            key={item._id}
            className="relative w-12/12 h-full bg-cover bg-center shadow-blur-yellow"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-yellow-300  text-green-900 font-bold text-center p-2">
              <Link to={`products/${item.category}/superdeal`}>{item.category}</Link>
            </div>
          </div>
        )) : <p>No Trending Shops</p>}
      </div>
    </>
  );
};

export default BackgroundImageWithTitle;
