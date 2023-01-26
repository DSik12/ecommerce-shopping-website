import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import PaymentCheckout from "./PaymentCheckout";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);
describe("Company Component", () => {
  it("renders app utils", () => {
    expect(PaymentCheckout).toBeTruthy();
  });
  it("check if Credit Card field exists", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("myCardNumber");
    expect(inputEl).toBeInTheDocument();
  });
  it("check if CVV field exists", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("myCvvInput");
    expect(inputEl).toBeInTheDocument();
  });
  it("check if expiry date field exists", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const inputEl = screen.getByTestId("expiryDate");
    expect(inputEl).toBeInTheDocument();
  });

  it("Correct CVV value", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const CVV = screen.getByTestId("myCvvInput");
    fireEvent.change(CVV, { target: { value: "123" } });
    expect(CVV.value).toBe("123");
  });

  it("Wrong CVV value", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const CVV = screen.getByTestId("myCvvInput");
    fireEvent.change(CVV, { target: { value: "123" } });
    expect(CVV.value).toBe("453");
  });

  it("Length of card number is less than 16", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const cardNo = screen.getByTestId("myCardNumber");
    fireEvent.change(cardNo, { target: { value: "123456" } });
    expect(
      screen.getByText("Card number should have 16 digits!")
    ).toBeInTheDocument();
  });

  it("Return '' on entering alphabets in Card Number", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const cardNo = screen.getByTestId("myCardNumber");
    fireEvent.change(cardNo, { target: { value: "scxzxc" } });
    expect(cardNo.value).toBe("");
  });

  it("Return '' on entering alphabets in CVV", () => {
    render(
      <BrowserRouter>
        <PaymentCheckout />
      </BrowserRouter>
    );
    const cvv = screen.getByTestId("myCvvInput");
    fireEvent.change(cvv, { target: { value: "abcd" } });
    expect(cvv.value).toBe("");
  });
});
