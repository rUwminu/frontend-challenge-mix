import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Footer } from "../components/index";
import ShopHome from "./ShopHome/ShopHome";
import SingleProduct from "./SingleProduct/SingleProduct";

const MainPage = () => {
  const baseUrl = "/sneaker";
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={`${baseUrl}/`} element={<ShopHome />} />
      </Routes>
      <Routes>
        <Route path={`${baseUrl}/product/:id`} element={<SingleProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MainPage;
