"use client";
import React from 'react';
import { Provider } from "react-redux";
import { store } from "../app/_redux/news/store";
import Categories from '../app/_components/home';
import Header from "../app/_components/header";

const Home = () => {
  return (
  
    <Provider store={store}>
       <div className='w-full font-poppins'>
       <Header />
       <div className="flex flex-col mx-auto lg:max-w-[1450px]  lg:mx-auto ">  <Categories/></div>
       </div>
      </Provider>
  )
}

export default Home

