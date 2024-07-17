import React from "react";
import { Link } from "react-router-dom";

const CircleImageWithTitle = () => {
  const items = [
    {
      id: 1,
      image:
        "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/5/656f51fORN0158_0.jpg?rnd=20200526195200&tr=w-512",
      title: "Women",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/4b/ea/c1/4beac1a2ceb6ff197cd14c57547d5356.jpg",
      title: "Men",
    },
    {
      id: 3,
      image:
        "https://www.boden.co.uk/content/dam/boden/shops-and-categories/2024/wk17--gw-filterable-header---dresses/style/DT_ALL.jpg",
      title: "Kids",
    },
    //{id:4,image:'https://imgmedia.lbb.in/media/2023/03/641ad00f3b0e3b6d05db5675_1679478799910.jpg',title:'Home And Kitchen'},
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
      title: "Laungerie",
    },
    {
      id: 7,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Vertical_jump_measurement_test.png",
      title: "Sports & Outdoor",
    },
    {
      id: 8,
      image:
        "https://c8.alamy.com/comp/2MXP4P1/the-vertical-shot-of-a-pair-of-brown-solid-slip-shoes-before-a-leather-bag-over-the-wooden-table-2MXP4P1.jpg",
      title: "Shoes and Bags",
    },
    {
      id: 9,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO3ehkhezBI2Jf71skoQ8XClSqepmaSTOX7BKu3R_LBA&s",
      title: "Accesories & Jewellery",
    },
    {
      id: 10,
      image:
        "https://img.freepik.com/premium-photo/futuristic-gadgets-showcase-lineup-sleek-modern-technological-devices_977107-683.jpg",
      title: "Electronics",
    },
    {
      id: 11,
      image:
        "https://media.istockphoto.com/id/1288946192/photo/crop-of-cyclists-handlebars-and-front-wheel-during-sunrise.jpg?s=612x612&w=0&k=20&c=3vjUqZ_3fiEzO5Sv2auTu_sqrWHRRRzji-bKaOpFAn4=",
      title: "Bicycles",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 px-0 py-4 justify-center ">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap px-4 flex flex-col items-center w-2/12"
        >
          <div className="w-[100px]  h-[120px] bg-gray-200 rounded-full overflow-hidden">
            <img
              src={item.image}
              alt={`Item ${item.id}`}
              className="  object-contain"
            />
          </div>
          <div className="mt-2 text-center">
            <Link to={`products/${item.title}`}>
              <span className="text-lg font-semibold">{item.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CircleImageWithTitle;
