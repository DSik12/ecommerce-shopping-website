import React from "react";
import ReactDOM from "react-dom";
import FullCart from "./FullCart";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";


describe("FullCart Component", () => {
  it("renders the component properly", () => {
    const divEl = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <FullCart />
      </BrowserRouter>,
      divEl
    );
  });

  it("should have shopping cart as text", () => {
    render(
      <BrowserRouter>
        <FullCart />
      </BrowserRouter>
    );
    const officialTxtEl = screen.getByText("Shopping Cart");
    expect(officialTxtEl).toBeInTheDocument();
  });

  it("should have view all as text", () => {
    render(
      <BrowserRouter>
        <FullCart />
      </BrowserRouter>
    );
    const officialTxtEl = screen.getByText("Total");
    expect(officialTxtEl).toBeInTheDocument();
  });

  it('should have right FullCart comp snapshot', () => {
      const tree =renderer.create(<BrowserRouter>
        <FullCart />
      </BrowserRouter>).toJSON();
      expect(tree).toMatchSnapshot();
});

});
