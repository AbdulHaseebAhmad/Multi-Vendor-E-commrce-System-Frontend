import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { loginAction, loginLoader } from "./Pages/Loginpage";
import SignupPage, { signupAction, signupLoader } from "./Pages/SignupPage";
import RootElement, { authCechkLoader } from "./Pages/RootElement";
import HomePage, { homeLogOutAction, homeLoader } from "./Pages/HomePage";
import ProductsPage, { productsLoader } from "./Pages/Products";
import ProductDetailPage, {
  prdouctDetailLoader,
} from "./Pages/ProductDetailsPage";
import ProfilePage, { profileloder } from "./Pages/ProfilePage";
import CartPage, { placeOrderAction } from "./Pages/CartPage";
import ShopHomePage from "./Pages/ShopHomePage";
import ShopAddProduct, { addProductAction } from "./Pages/ShopAddProduct";
import ShopRoot, { shophomeloader } from "./Pages/ShopRoot";
import ShopLoginPage, {
  shoploginAction,
  shoploginLoader,
} from "./Pages/ShopLogin";
import ShopSetting from "./Pages/ShopSettings";
import EditProduct, {
  editproductloader,
  editproductaction,
} from "./Pages/EditProduct";
import ShopOrders from "./Pages/ShopOrders";
import OrderDetails, {
  orderCompleteRequest,
  orderDetailsLoader,
} from "./Pages/OrderDetails ";
import UserRooot from "./Pages/UserRoot";
import ViewProductDetails from "./Pages/ViewProductDetails";
import ShopSignUp, {shopSignupAction, shopSignupLoader} from "./Pages/ShopSignUp";
import SearchProduct from "./Pages/SearchProduct";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <RootElement />, loader: authCechkLoader },
        {
          path: "/login",
          element: <LoginPage />,
          action: loginAction,
          loader: shoploginLoader,
        },
        {
          path: "/shoplogin",
          element: <ShopLoginPage />,
          action: shoploginAction,
          loader: shoploginLoader,
        },
        {
          path: "/signup",
          element: <SignupPage />,
          action: signupAction,
          loader: signupLoader,
        },{
          path: "/shopsignup",
          element: <ShopSignUp />,
          action: shopSignupAction,
          loader: shopSignupLoader,
        },
        {
          path: "/user",
          element: <UserRooot />,
          action: homeLogOutAction,
          loader: homeLoader,
          children: [
            {
              index: true,
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: "products/:categoryname",
              children: [
                {
                  index: true,
                  element: <ProductsPage />,
                  action: "homeLogOutAction",
                  loader: productsLoader,
                },
                {
                  path: ":productId",
                  element: <ProductDetailPage />,
                  loader: prdouctDetailLoader,
                },
                {
                  path:'superdeal',
                  element:<ProductsPage/>,
                  loader:productsLoader
                }
              ],
            },
            {
              path: "profile",
              children: [
                {
                  index: true,
                  element: <ProfilePage />,
                  loader: profileloder,
                },
              ],
            },
            {
              path: "cart",
              element: <CartPage />,
              action: placeOrderAction,
            },
          ],
        },

        {
          path: "/shop",
          id: "shophome",
          element: <ShopRoot />,
          loader: shophomeloader,
          children: [
            {
              index: true,
              element: <ShopHomePage />,
            },
            {
              path: "addproduct",
              element: <ShopAddProduct />,
              action: addProductAction,
            },
            {
              path: "settings",
              element: <ShopSetting />,
              children: [
                {
                  path: "userdetails",
                  element: <ShopSetting />,
                },
                {
                  path: "usersecurity",
                  element: <ShopSetting />,
                },
              ],
            },
            {
              path: "editproduct",
              children: [
                {
                  path: ":productid",
                  element: <EditProduct />,
                  loader: editproductloader,
                  action: editproductaction,
                },
              ],
            },
            {
              path: "orders",
              children: [
                {
                  path: "pendingorders",
                  action: orderCompleteRequest,
                  children: [
                    {
                      index: true,
                      element: <ShopOrders />,
                    },
                    {
                      path: ":orderid",
                      element: <OrderDetails />,
                      loader: orderDetailsLoader,
                    },
                  ],
                },
                {
                  path: "completedorders",
                  children: [
                    {
                      index: true,
                      element: <ShopOrders />,
                    },
                    {
                      path: ":orderid",
                      element: <OrderDetails />,
                      loader: orderDetailsLoader,
                    },
                  ],
                },
              ],
            },
            {
              path: "vieproducts",
              children: [
                {
                  path: ":productId",
                  element: <ViewProductDetails/>,
                  loader: prdouctDetailLoader,
                },
              ],
            },
            {
              path:'searchproduct',
              element:<SearchProduct/>
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

/**import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { loginAction, loginLoader } from "./Pages/Loginpage";
import SignupPage, { signupAction, signupLoader } from "./Pages/SignupPage";
import RootElement, { authCechkLoader } from "./Pages/RootElement";
import HomePage, { homeLogOutAction, homeLoader } from "./Pages/HomePage";
import ProductsPage, { productsLoader } from "./Pages/Products";
import ProductDetailPage, {
  prdouctDetailLoader,
} from "./Pages/ProductDetailsPage";
import ProfilePage, { profileloder } from "./Pages/ProfilePage";
import CartPage, {placeOrderAction} from "./Pages/CartPage";
import ShopHomePage from "./Pages/ShopHomePage";
import ShopAddProduct, {addProductAction} from "./Pages/ShopAddProduct";
import ShopRoot , { shophomeloader } from "./Pages/ShopRoot";
import ShopLoginPage, {shoploginAction,shoploginLoader} from "./Pages/ShopLogin";
import ShopSetting from "./Pages/ShopSettings";
import EditProduct,{editproductloader, editproductaction} from "./Pages/EditProduct"
import ShopOrders from "./Pages/ShopOrders";
import OrderDetails from "./Pages/OrderDetails ";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <RootElement />, loader: authCechkLoader },
        {
          path: "/login",
          element: <LoginPage />,
          action: loginAction,
          loader: shoploginLoader,
        },
        {
          path: "/shoplogin",
          element: <ShopLoginPage />,
          action: shoploginAction,
          loader: shoploginLoader,
        },
        {
          path: "/signup",
          element: <SignupPage />,
          action: signupAction,
          loader: signupLoader,
        },
        {
          path: "/home",
          element: <HomePage />,
          action: homeLogOutAction,
          loader: homeLoader
        },
        {
          path: "/products",
          children: [
            {
              index: true,
              element: <ProductsPage />,
              action: "homeLogOutAction",
              loader: productsLoader,
            },
            {
              path: ":productId",
              element: <ProductDetailPage />,
              loader: prdouctDetailLoader,
            },
          ],
        },
        {
          path: "/profile",
          children: [
            {
              index: true,
              element: <ProfilePage />,
              loader:profileloder
            },
          ],
        },
        {
          path:'/cart',
          element:<CartPage/>,
          action:placeOrderAction
        },
        {
          path:"/shop",
          id: "shophome",
          element: <ShopRoot />,
          loader: shophomeloader,
          children: [
            {
              index:true,
              element: <ShopHomePage />,
             
            },
            {
              path: "addproduct",
              element: <ShopAddProduct />,
              action: addProductAction,
            },
            {
              path:"settings",
              element: <ShopSetting />,
              children: [
                {
                  path:"userdetails",
                  element: <ShopSetting />,
                },
                {
                  path:"usersecurity",
                  element: <ShopSetting />,
                },
              ],
            },
            {
              path:"editproduct",
              children: [
                {
                  path:":productid",
                  element: <EditProduct />,
                  loader: editproductloader,
                  action: editproductaction,
                },
              ],
            },
            {
              path:"orders",
              children: [
                {
                  path: "pendingorders",
                  children:[
                    {
                      index:true,
                      element: <ShopOrders/>,

                    },
                    {
                      path:':orderid',
                      element:<OrderDetails/>
                    }
                  ]
                },
                {
                  path: "completedorders",
                  children:[
                    {
                      index:true,
                      element: <ShopOrders/>,

                    },
                    {
                      path:':orderid',
                      element:<OrderDetails/>
                    }
                  ]
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
 */
