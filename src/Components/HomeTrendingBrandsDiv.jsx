import React from "react";
import { Link } from "react-router-dom";

const BackgroundImageWithTitle = () => {
  const items = [
    {
      id: 1,
      image:
        "https://cdn.logojoy.com/wp-content/uploads/2018/05/30143359/2_big1.png",
      title: "Addidas",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSelQboXpbaGVy8345_fFs0_iADk3xmTcRcT7oQcqZNfA&s",
      title: "Jupiner",
    },
    {
      id: 3,
      image:
        "https://cdn.logojoy.com/wp-content/uploads/2018/05/30143407/512.png",
      title: "D&G",
    },
    {
      id: 4,
      image:
        "https://cdn.logojoy.com/wp-content/uploads/2018/05/30143313/511.png",
      title: "Red Wood",
    },
    {
      id: 5,
      image:
        "https://thumbs.dreamstime.com/b/snapdeal-logo-192331085.jpg",
      title: "Gucci ",
    },
    {
      id: 6,
      image:
        "https://images.thenorthface.com/is/image/TheNorthFaceEU/SS22_AboutUs_TNF-Logo?$SCALE-ORIGINAL$",
      title: "The North Face",
    },
  ];

  return (
    <>
      <h2 className="font-bold text-4xl w-11/12 text-green-900 mb-[-20px] p-4 my-8 mx-auto">
        Trending Brands
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 w-11/12 h-[300px]  my-4 mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative w-12/12 h-full bg-cover bg-center shadow-blur-green"
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
