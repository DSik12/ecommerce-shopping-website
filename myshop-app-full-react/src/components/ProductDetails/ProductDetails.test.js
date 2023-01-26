import React from "react";
import ReactDOM from "react-dom";
import ProductDetails from "./ProductDetail";
import renderer from "react-test-renderer";

describe("Productdetails Component", () => {
  it("renders product details component successfully", () => {
    const divEl = document.createElement("div");
    ReactDOM.render(<ProductDetails />, divEl);
  });

  it("should have right component snapshot", () => {
    const tree = renderer.create(<ProductDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
