// import libraries
import React from "react";
import { Route, Routes } from "react-router-dom";
// import files links for routes
import Home from "../components/Home/Home";
import ProductList from "../components/ProductList/ProductList";
import AddressCheckout from "../containers/AddressCheckout/AddressCheckout";
import FinalCheckout from "../containers/FinalCheckout/FinalCheckout";
import Payment from "../containers/Payment/PaymentCheckout";
import Shipping from "../containers/Shipping/ShippingProducts";
import OrderConfirm from "../components/Orderconfirm/Orderconfirm";
import ProductDetails from "../components/ProductDetails/ProductDetail";
import FullCart from "../components/FullCart/FullCart";
import ItemDetails from "../components/ItemDetails";
export const routes = (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/products" element={<ProductList />}></Route>
    {/* your routes come here */}
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/cartItems" element={<FullCart />} />
    <Route path="checkout" element={<ItemDetails />}>
      <Route path="addresscheckout" element={<AddressCheckout />} />
      <Route path="shipping/orderID=:id" element={<Shipping />} />
      <Route path="payment/orderID=:id" element={<Payment />} />
      <Route path="finalcheckout/orderID=:id" element={<FinalCheckout />} />
    </Route>
    <Route
      path="/checkout/orderconfirm/orderID=:id"
      element={<OrderConfirm />}
    />
  </Routes>
);
