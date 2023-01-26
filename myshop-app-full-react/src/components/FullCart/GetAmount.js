import React from "react";

const GetAmount = ({ price }) => {
 
  return (
    <div>
      <span id="fullTotalAmount">Total: Rs.{price}</span>
    </div>
  );
};

export default GetAmount;
