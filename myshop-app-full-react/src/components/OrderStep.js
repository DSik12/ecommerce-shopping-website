import React from "react";
import { NavLink } from "react-router-dom";
const OrderStep = () => {
  return (
    <section className="orderStep">
      <h1>Checkout</h1>
      <NavLink
        to='#'
        activeclassname="active"
        id="address-checkoutt"
      >
        Address
      </NavLink>
      <NavLink to='#' activeclassname="active" id="shipping-checkoutt">
        Shipping
      </NavLink>
      <NavLink to="#" activeclassname="active" id="payment-checkout">
        Payment
      </NavLink>
      <NavLink to='#' activeclassname="active" id="final-checkoutt">
        FinalCheckout
      </NavLink>
    </section>
  );
};

export default OrderStep;
