import React, { useEffect } from 'react'
import {redirect, useLoaderData } from 'react-router-dom'
import Navbar from '../Components/Navbar.jsx';
import LinkNavbar from '../Components/LinkNavbar.jsx';
import { useDispatch } from 'react-redux';
import { userAction } from '../store/userSlice.js';
import BannerAndSlideshow from '../Components/HomeBanner&SlideShow.jsx';
import CircleImageWithTitle from '../Components/HomeCategoryContainerDiv.jsx';
import HomeSuperDealsDiv from '../Components/HomeSuperDealsDiv.jsx';
import HomeTrendingbrands from "../Components/HomeTrendingBrandsDiv.jsx";
import HomeTrendingShops from "../Components/HomeTrendingShops.jsx";

export default function HomePage() {
  const dispatch = useDispatch()
  const fetchedUserData = useLoaderData();
  useEffect( () => {
    dispatch(userAction.setUserstate(fetchedUserData))
  },[dispatch,fetchedUserData])  
  
  return (
    <div className=''>
  
      <BannerAndSlideshow/>
      <CircleImageWithTitle/>
      <HomeSuperDealsDiv/>
      <HomeTrendingbrands/>
      <HomeTrendingShops/>
    </div>
  )
}

export const homeLoader = async ({ request, params }) => {
  let response = await fetch("https://52.70.243.175:443/api/users/auth/status", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "*/*",
    },
  });
  if (response.status === 200) {
    const req = await response.json()
    return req;
  } else {
    return redirect("/login");
  }
};


export const homeLogOutAction = async ({request,params}) => {
  const sendLogoutRequest = await fetch("https://52.70.243.175:443/api/users/auth/logout",{
    method:request.method,
    credentials:'include',
    headers:{
      Accept: "*/*",
    }
  })
  if(sendLogoutRequest.status === 200){
    return redirect('/login')
  }
  else {
    const responseData = await sendLogoutRequest.json();
    //console.log(responseData)
  }
  return null
}
