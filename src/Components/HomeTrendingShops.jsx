import React from "react";
import { Link } from "react-router-dom";

const BackgroundImageWithTitle = () => {
  const items = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/hand-drawn-smoke-shop-logo-design_23-2151172992.jpg",
      title: "Vape Shop",
    },
    {
      id: 2,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/227/054/non_2x/car-shop-logo-design-template-element-usable-for-business-and-automotive-logos-vector.jpg",
      title: "Car Shop",
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/previews/006/687/361/original/sport-shop-logo-design-free-vector.jpg",
      title: "Sport Shop",
    },
    {
      id: 4,
      image:
        "https://img.freepik.com/premium-vector/bike-shop-service-badge-logo_227744-120.jpg",
      title: "Bicycle Shop",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/premium-vector/phone-store-logo-icon-concept-vector-isolated_717577-68.jpg",
      title: "Gadget Shop",
    },
    {
      id: 6,
      image:
        "https://t3.ftcdn.net/jpg/03/15/06/10/360_F_315061039_JPz3A8Yd64Ugsy2T6Ez6E9IPwAhs3ftD.jpg",
      title: "Shoe Shop",
    },
  ];

  return (
    <>
      <h2 className="font-bold text-4xl w-11/12 text-green-900 mb-[-20px] p-4  mt-8 mx-auto">
        Trending Shops
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4  p-4 pb-8 w-11/12 h-[300px]  my-4 mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-12/12 h-full bg-cover bg-center shadow-blur-yellow"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-yellow-300  text-green-900 font-bold text-center p-2">
              <Link> {item.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundImageWithTitle;
