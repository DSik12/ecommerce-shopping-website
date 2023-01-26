import React, { Component } from "react";
import "./Shipping.scss";
import { NavLink } from "react-router-dom";
import flipkart from "../../assets/images/flipkart.png";
import amazon from "../../assets/images/Amazon.jpg"
import fetchUrls from "../../config/config.json";
import { withRouter } from "../AddressCheckout/withRouter";
let id = 0;
class Shipping extends Component {
  constructor() {
    super();
    this.data = null;
    this.handleContBtn = this.handleConBtn.bind(this);
    this.shippingCart = React.createRef();

    this.state = {
      productList: [],
      cartItems: [],
    };
  }

  componentDidMount = () => {
    let search = window.location.href;
    console.log(search);

    // let orderId = 1;
    let orderId = search.split("=")[1];

    id = orderId;

    fetch(`${fetchUrls.orderApi}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("fetched data");

        this.setState({
          productList: data,
        });
        console.log(this.state.productList);
        let orderList = this.state.productList;

        //console.log(orderId);

        for (let i = 0; i < orderList.length; i++) {
          if (orderList[i].id == orderId) {
            this.cartNo = orderList[i].totalItems;
            console.log(this.cartNo);

            this.total = orderList[i].totalPrice;
            console.log(this.total);
          }
        }
        this.getCartItems(orderId, this.cartNo);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Completed");
      });
  };

  getCartItems = (orderId, cartNo) => {
    console.log(cartNo);
    fetch(`${fetchUrls.cartItemsApi}`)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data1) => {
        console.log(data1);
        this.setState({
          cartItems: data1,
        });
        console.log(this.state.cartItems);
        this.addCartItems(orderId, cartNo, data1);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("completed");
      });
  };

  addCartItems = (orderId, cartNo, cartItems) => {
    console.log(cartNo);
    console.log("==Inside ADD CART ITEMS===");
    // console.log(orderId);
    fetch(`${fetchUrls.orderApi}/${orderId}`, {
      method: "PATCH",
      // Adding body or contents to send
      body: JSON.stringify({ orderItems: cartItems }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        this.getProducts(cartNo, cartItems, orderId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("completed");
      });
  };

  getProducts = (cartNo, cartItems, orderId) => {
    console.log(cartNo);
    fetch(`${fetchUrls.productApi}`)
      .then((res) => {
        console.log("===Inside Get Products===");
        //console.log(res);
        return res.json();
      })
      .then((productItems) => {
        //console.log(productItems.productDescription);
        this.generateElementsShipping(cartNo, cartItems, productItems, orderId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("completed");
      });
  };

  generateElementsShipping = (cartNo, cartItems, productItems, orderId) => {
    console.log("==Inside generateElement Shipping ===");

    cartItems.reduce((acc, curr) => {
      const index = productItems.findIndex(
        (item) => item.productName === curr.productName
      );
      console.log(curr);
      console.log(productItems[index].productDescription);
      if (index > -1) {
        curr.productDescription = productItems[index].productDescription;
        curr.discountApplicable = productItems[index].discountApplicable;
        curr.discountPrice = parseInt(
          (productItems[index].discountApplicable / 100) *
          parseInt(productItems[index].price)
        );
      }

      acc.push(curr);

      return acc;
    }, []);
    this.setState({
      cartItems: cartItems,
    });

    console.log(cartItems);
  };

  handleConBtn = () => {
    this.props.navigate(`/checkout/payment/orderID=${id}`);
  };

  render() {
    let generateHtml = null;
    console.log(this.state.cartItems);
    generateHtml = this.state.cartItems.map((items, index) => {
      let dateList = [];
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      let dateIndex = getRandomInt(4);

      let date = new Date();
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthFullNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      for (let k = 3; k < 7; k++) {
        const date1 = new Date(
          monthFullNames[date.getMonth()] +
          " " +
          date.getUTCDate() +
          ", " +
          date.getFullYear()
        );
        //this.date1.setDate(date1.getDate() + k);
        dateList.push(
          days[date1.getDay()] +
          ", " +
          date1.getUTCDate() +
          monthNames[date1.getMonth()] +
          " | " +
          date1.getFullYear()
        );
      }
      console.log(dateList);
      console.log(items);

      console.log(dateList[dateIndex]);
      return (
        <div key={index}>
          <div className="firstShippingProduct">
            <div>
              <img
                src={items.thumbnail}
                alt={items.productName}
                height={100}
                width={100}
              />
            </div>
            <div className="describeFirst">
              <p className="describeItem">
                <strong>{items.productName}</strong>
              </p>
              <p className="descriptionShipping">{items.productDescription}</p>
              <div>
                <p className="sellerFirst">Seller: Flipkart</p>
                <img className="flipkart" src={flipkart} alt="flipkart-icon" />
              </div>
              <div className="firstProduct">
                <p>Rs. {items.price}</p>
                <p>
                  <strike>Rs. {items.discountPrice}</strike>
                </p>
                <p>{items.discountApplicable} % Off</p>
                <p>1 Offer Applied</p>
              </div>
            </div>
          </div>
          <p className="freeFirst">
            {dateList[dateIndex]}
            <strong className="freeGreen"> Free </strong>
            <strike>Rs. 40</strike>
          </p>
        </div>
      );
    });
    let total = this.state.cartItems.reduce(function (accumulator, item) {
      return accumulator + parseFloat(item.price);
    }, 0);
    this.shippingCart = generateHtml.join("");
    this.total = Math.round(total);

    return (
      <main>
        <section className="orderStep">
          <h1>Checkout</h1>
          <NavLink to="#" activeclassname="active" id="address-checkoutt">
            Address
          </NavLink>

          <NavLink
            to="/checkout/shipping"
            activeclassname="active"
            id="shipping-checkout"
          >
            Shipping
          </NavLink>

          <NavLink to="#" activeclassname="active" id="payment-checkoutt">
            Payment
          </NavLink>

          <NavLink to="#" activeclassname="active" id="final-checkoutt">
            FinalCheckout
          </NavLink>
        </section>
        <section className="amazon">
          <div>
            <img
              src={amazon}
              alt="Amazon Delivery Icon"
              height={100}
              width={150}
            />
          </div>
          <div>
            <p>
              Select FREE Amazon Day Delivery .
            </p>
          </div>
        </section>
        <section className="shippingCart" id="shippingCart">
          {this.state.productList && this.state.productList.length > 0 ? (
            generateHtml
          ) : (
            <div>
              <p>No Elements in the Cart!!</p>
            </div>
          )}
        </section>
        <section className="continue">
          <div>
            <button
              id="conBtn"
              className="continueButton"
              onClick={this.handleConBtn}
            >
              Continue
            </button>
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(Shipping);
