import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddressCheckout from "../container/AddressCheckout/AddressCheckout";
import FinalCheckout from "../container/FinalCheckout/FinalCheckout";
import Payment from "../container/Payment/PaymentCheckout";
import Shipping from "../container/Shipping/ShippingProducts";
import "../container/Payment/Payment.scss";
import React from "react";
import ItemDetails from "./ItemDetails";
import OrderConfirm from "./Orderconfirm/Orderconfirm";

export default function Checkout() {
  return (
    <BrowserRouter>
      <div className="App">
      
        <main>
          <Routes>
            <Route
              path="/checkout/addresscheckout"
              element={<AddressCheckout />}
            />
            <Route path="/checkout/shipping/orderID=:id" element={<Shipping />} />
            <Route path="/checkout/payment/orderID=:id" element={<Payment />} />
            <Route path="/checkout/finalcheckout/orderID=:id" element={<FinalCheckout />} />
            <Route path="/checkout/orderconfirm" element={<OrderConfirm/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
