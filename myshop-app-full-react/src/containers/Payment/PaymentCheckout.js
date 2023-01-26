import React, { useState } from "react";
import ContinueButton from "../../components/ContinueButton";
import OrderStep from "../../components/OrderStep";
const PaymentCheckout = () => {
  const [cardNumber, setCardNumber] = useState({
    cardNumber: 0,
    cardNumberErr: "",
    errFlag1: true,
  });
  const [dateValue, setDateValue] = useState({
    dateValue: "",
    dateErr: "",
    errFlag2: true,
  });
  const [cvvValue, setCvvValue] = useState({
    cvvValue: 0,
    cvvErr: "",
    errFlag3: true,
  });

  const paymentValidation = (event) => {
    switch (event.target.name) {
      case "cardNumber":
        event.target.value.length > 16 || event.target.value.length < 16
          ? setCardNumber({
              cardNumberErr: "Card number should have 16 digits!",
              errFlag1: true,
            })
          : setCardNumber({
              cardNumberErr: "",
              cardNumber: event.target.value,
              errFlag1: false,
            });
        break;

      case "cvv":
        event.target.value.length > 3 || event.target.value.length < 3
          ? setCvvValue({
              cvvErr: "CVV should have 3 digits!",
              errFlag3: true,
            })
          : setCvvValue({
              cvvErr: "",
              cvvValue: event.target.value,
              errFlag3: false,
            });
        break;

      case "date":
        const dateObj = new Date();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const year = dateObj.getFullYear();
        const output = year + "-" + month + "-" + day;
        output > event.target.value
          ? setDateValue({
              dateErr: "Expiry date cannot be less than current date!",
              errFlag2: true,
            })
          : setDateValue({
              dateErr: "",
              dateValue: event.target.value,
              errFlag2: false,
            });
        break;

      default:
        <></>
    }
  };
  return (
    <>
      <OrderStep></OrderStep>
        <section className="paymentInformation">
          <form id="paymentForm">
            <fieldset>
              <legend>Payment Information:</legend>
              <div>
                <input id="cardNo" data-testid="myCardNumber" type="number" placeholder="Card Number" name="cardNumber" onChange={paymentValidation}/>
                {cardNumber.cardNumberErr.length > 0 ? <span id="errorMsgPayment">{cardNumber.cardNumberErr}</span> : <></>}
              </div>
              <div>
                <input id="expiry" data-testid="expiryDate" type="date" name="date" onChange={paymentValidation}/>
                {dateValue.dateErr.length > 0 ? <span id="errorMsgPayment">{dateValue.dateErr}</span>:<></>}
              </div>

              <div>
                <input id="cvvNo" data-testid="myCvvInput" type="number" placeholder="CVV" name="cvv" onChange={paymentValidation}/>
                {cvvValue.cvvErr.length > 0 ? <span id="errorMsgPayment">{cvvValue.cvvErr}</span>:<></>}
              </div>
            </fieldset>
          </form>
        </section>
        <ContinueButton cardNumber={cardNumber.cardNumber} err1={cardNumber.errFlag1} cvv={cvvValue.cvvValue} err2={cvvValue.errFlag3} date={dateValue.dateValue} err3={dateValue.errFlag2}></ContinueButton>
    </>
  );
};

export default PaymentCheckout;