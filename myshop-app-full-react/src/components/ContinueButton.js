import React from "react";
import fetchUrls from "../config/config.json";
import { useNavigate } from "react-router-dom";
const ContinueButton = ({ cardNumber, err1, cvv, err3, date, err2 }) => {
  let navigate = useNavigate();
  const postCardDetails = {
    creditCardNumber: cardNumber,
    cardExp: date,
    cvv: cvv,
  };

  const handleClick = () => {
    if (err1 || err2 || err3) {
      alert("Enter valid Card Details");
    } else {
      let search = window.location.href;
      let orderId = search.split("=")[1];
      fetch(
        `${fetchUrls.orderApi}/${orderId}`,

        {
          method: "PATCH",
          body: JSON.stringify({ paymentInfo: postCardDetails }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(() => {
          navigate(`/checkout/finalcheckout/orderID=${orderId}`);
        });
    }
  };
  return (
    <section className="continue">
      <div>
        {/* <NavLink to="/checkout/finalcheckout"><button id="conBtn" className="continueButton" onClick={postCardDetail}>Continue</button></NavLink> */}
        <button id="conBtn" className="continueButton" onClick={handleClick}>
          Continue
        </button>
      </div>
    </section>
  );
};
export default ContinueButton;
