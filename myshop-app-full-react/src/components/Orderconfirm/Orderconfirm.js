import React from "react";
import "./OrderConfirm.scss";
import { NavLink } from "react-router-dom";

const OrderConfirm = () => {
  return (
    <main>
      <section className="orderComplete">
        <h1>Your Order Complete!</h1>
        <p id="order">
          Your order is placed .Thank you for completing order.
        </p>
        <div id="orderDelivery">
          <p>Order ID: {window.location.href.split("=")[1]}</p>
          <p>Order Date: {new Date().toDateString()}</p>
          <NavLink to="#">Contact Support</NavLink>
        </div>
      </section>
    </main>
  );
};

export default OrderConfirm;