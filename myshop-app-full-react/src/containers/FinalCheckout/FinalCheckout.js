import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./FinalCheckout.scss";
import ItemDetails from "../../components/ItemDetails";
import { withRouter } from "../AddressCheckout/withRouter";
import fetchUrls from "../../config/config.json";
export class FinalCheckout extends Component {
  constructor() {
    super();
    this.handlePlaceorder = this.handlePlaceorder.bind(this);
    this.state = {
      orderList: [],
      orderItemsList: [],
      itemtotal: 0,
      taxAmount: 0,
      totalPrice: 0,
      shippingCity: "",
      shippingAddress: "",
      shippingCountry: "",
      billAddress: "",
      billingCity: "",
      billingCountry: "",
      paymentDetails: {},
    };
  }

  getAddress = () => {
    let search = window.location.href;
    let orderId = search.split("=")[1];

    fetch(`${fetchUrls.orderApi}/${orderId}`)
      .then((res) => {
        // success response
        return res.json();
      })

      .then((jsonRes) => {
        const shippingCity = jsonRes.shippingAddress.city;
        const shippingCountry = jsonRes.shippingAddress.country.value;
        const shippingAddress = jsonRes.shippingAddress.address;
        const billingCity = jsonRes.billingAddress.city;
        const billingCountry = jsonRes.billingAddress.country.value;
        const billingAddress = jsonRes.billingAddress.address;

        
        const paymentInformation = jsonRes.paymentInfo;

        this.setState({
         
          shippingCity: shippingCity,
          shippingCountry: shippingCountry,
          shippingAddress: shippingAddress,
          billingCity: billingCity,
          billingCountry: billingCountry,
          billAddress: billingAddress,
          paymentDetails: paymentInformation,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Completed data fetch"); // finally block
      });
  };

  componentDidMount = () => {
    let search = window.location.href;
    let orderId = search.split("=")[1];

    fetch(`${fetchUrls.orderApi}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        this.setState({
          orderList: jsonRes,
        });

        for (let i = 0; i < this.state.orderList.length; i++) {
          if (this.state.orderList[i].id == orderId) {
            this.cartNo = this.state.orderList[i].totalItems;
            this.cartItems = this.state.orderList[i].orderItems;
            this.total = this.state.orderList[i].totalPrice;

            this.setState({
              orderItemsList: this.cartItems,
            });

            const itemTotal = this.total;
            const tax = Math.round((5 / 100) * itemTotal);
            const price = itemTotal + tax;

            this.setState({
              itemtotal: this.total,
              taxAmount: tax,
              totalPrice: price,
            });
          }
        }
      })

      .catch((error) => {
        console.log(error);
      })

      .finally(() => {
        console.log("All Details loaded!");
      });

    this.getAddress();
  };

  handlePlaceorder = () => {
    let search = window.location.href;
    let orderId = search.split("=")[1];

    fetch(`${fetchUrls.orderApi}/${orderId}`, {
      method: "PATCH",
      // Adding body or contents to send
      body: JSON.stringify({ isOrderCompleted: true }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        // success response
        return res.json();
      })
      .then((jsonRes) => {
        this.props.navigate(`/checkout/orderconfirm/orderID=${orderId}`);
      })
      .catch((err) => {
       
        console.log(err);
      })
      .finally(() => {
        console.log("Order Confirmed"); 
      });
  };

  render() {
    
    let showItemsList = null;
    showItemsList = this.state.orderItemsList.map((items, index) => {
      const pricetotal = items.price * items.quantity;

      return (
        <tr className="firstRow" key={index}>
          <td>
            <img
              src={items.thumbnail}
              alt={items.productName}
              height={100}
              width={100}
            />
            <div className="heading">
              <p className="itemName">
                <strong>{items.productName}</strong>
              </p>
              <p className="itemDescription"> {items.productName}</p>
            </div>
          </td>
          <td>
            <p>Rs. {items.price}</p>
          </td>
          <td>
            <p>{items.quantity}</p>
          </td>
          <td>
            <p>Rs. {pricetotal}</p>
          </td>
        </tr>
      );
    });

    let search = window.location.href;
    let id = search.split("=")[1];
    return (
      <main>
        <section className="orderStep">
          <h1>Checkout</h1>
          <NavLink to="#" activeclassname="active" id="address-checkoutt">
            Address
          </NavLink>
          <NavLink to="#" activeclassname="active" id="shipping-checkoutt">
            Shipping
          </NavLink>
          <NavLink to="#" activeclassname="active" id="payment-checkoutt">
            Payment
          </NavLink>
          <NavLink
            to="/finalcheckout"
            activeclassname="active"
            id="final-checkout"
          >
            FinalCheckout
          </NavLink>
        </section>

        <section className="confirmOrderDetails">
          <fieldset>
            <legend>Confirm</legend>
            <section className="editDetails">
              <div>
                <p>Shipping Address</p>
                <p>
                  {this.state.shippingCity},&nbsp;{this.state.shippingAddress}
                  ,&nbsp;{this.state.shippingCountry}
                </p>
                <NavLink
                  to={`/checkout/addresscheckout?${id}`}
                  activeclassname="active"
                  id="address-checkoutt"
                >
                  Edit
                </NavLink>
              </div>

              <div>
                <p>Billing Address</p>
                <p>
                  {this.state.billingCity},&nbsp;{this.state.billAddress}&nbsp;
                  {this.state.billingCountry}
                </p>
                <NavLink
                  to={`/checkout/addresscheckout?${id}`}
                  activeclassname="active"
                  id="billing-checkout"
                >
                  Edit
                </NavLink>
              </div>

              <div>
                <p>Shipping Duration</p>
                <p>1 Day</p>
                <p></p>
              </div>

              <div>
                <p>Payment Information</p>

                <p id="payment">
                  {this.state.paymentDetails.creditCardNumber},&nbsp;
                  {this.state.paymentDetails.cardExp}
                </p>
              </div>
            </section>
          </fieldset>
        </section>

        <section className="cartItemView">
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
              {this.state.orderItemsList &&
              this.state.orderItemsList.length > 0 ? (
                showItemsList
              ) : (
                <tr>
                  <td>Not loaded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="placeOrder">
          <div>
            <button id="orderButton" onClick={this.handlePlaceorder}>
              Place order
            </button>
          </div>

          <div id="totalMoney">
            <p id="itemTotal">Item Total Rs. {this.state.itemtotal} </p>
            <p id="tax">Tax: Rs. {this.state.taxAmount} </p>
            <p id="totalPrice">Order Total: Rs. {this.state.totalPrice} </p>
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(FinalCheckout);
