import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Navbar, Footer } from '../components/index'
import ShopHome from './ShopHome/ShopHome'
import SingleProduct from './SingleProduct/SingleProduct'
import SearchProduct from './SearchProduct/SearchProduct'
import TestPage from './TestPage/TestPage'

const MainPage = () => {
  const baseUrl = '/sneaker'
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={`${baseUrl}`} element={<ShopHome />} />

        <Route path={`${baseUrl}/product/:id`} element={<SingleProduct />} />

        <Route path={`${baseUrl}/search/type`} element={<SearchProduct />} />

        <Route path={`${baseUrl}/test`} element={<TestPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default MainPage
