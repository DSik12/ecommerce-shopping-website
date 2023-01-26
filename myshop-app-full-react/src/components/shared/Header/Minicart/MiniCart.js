import React, { useContext, useEffect, useState } from 'react'
import fetchUrls from '../../../../config/config.json';
import { Link } from 'react-router-dom';
import { CartQuantityContext } from '../../ReducerContextUtility/ReducerContextUtility';
import cartLogo from '../../../../assets/images/shopping-cart.png'
import './MiniCart.scss';

const Minicart = () => {

  const countContext = useContext(CartQuantityContext)
  const [productsList, setProductsList] = useState([]);

  const updateCartBackend = (url, method, postData) => {
    fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData), // posting or patching the stringified postData
    })
      .then((result) => {
        return result.json();
      })
      .then((resp) => {
        if (method === "GET") {
          setProductsList(resp);
        }
        else {
          handleGetCartItems();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Update cart fetch hit.");
      });
  };

  useEffect(() => {
    handleGetCartItems();
  }, [])

  // To fetch the products from cart items API
  const handleGetCartItems = () => {
    updateCartBackend(fetchUrls.cartItemsApi, "GET")
  }

  // To delete the products
  const handleDeleteItem = (id) => {
    let postData = { id: id };
    updateCartBackend(`${fetchUrls.cartItemsApi}/${id}`, 'DELETE', postData);
  }

  // To update the quantity of products in minicart
  const handleUpdateCartItemsQuantity = (event) => {

    const newQty = event.target.value;
    const inputId = event.target.id.split('-')[1];
    let postData = { quantity: newQty };
    updateCartBackend(`${fetchUrls.cartItemsApi}/${inputId}`, "PATCH", postData);
  }

  let itemsList = [];
  let finalTotal = 0;
  itemsList = productsList.map((item, index) => {

    let total = Number(item.price) * Number(item.quantity);// total price of an item
    finalTotal += total;

    return (
      <tr className="mini-cart-product" key={index}><td><img src={item.thumbnail} alt={"item" + item.id} /></td>
        <td className="mini-cart-name">{item.productName}</td>
        <td className="mini-amount" id={"miniCartProductPrice" + item.id}> {item.price} </td>
        <td className="mini-cart-qty"><input type="number" className="mini-cart-qty-input" id={"miniTotalQuantity-" + item.id} value={item.quantity} style={{ width: "60%", fontSize: 13, textAlign: "center" }} onChange={handleUpdateCartItemsQuantity} /></td>
        <td className="mini-amount" id={"miniProductAmount" + item.id}> Rs. {total}</td>
        <td> <button className="mini-remove-button" id={"miniRemoveBtn" + item.id} onClick={handleDeleteItem.bind(this, item.id)}>X</button></td>
      </tr>
    )
  })

  return (
    <span>
      <Link to="/cartItems" className="mini-cart-lnk s1" onMouseOver={handleGetCartItems}>
        <img src={cartLogo} alt="cart logo" className='cartLogo'/>
        <span className={countContext.countState>0?"totalQuantity":"emptyCart"}><sup>{countContext.countState}</sup></span>
      </Link>

      <div className="msc" id="miniCartHover1">
        <table className="mini-cart-table">
          <caption className="shopping">Shopping Cart</caption>
          <thead>
            <tr className="mini-cart-th">
              <th />
              <th>Item(s)</th>
              <th>Price</th>
              <th>Qty</th>
              <th className="total">Total</th>
            </tr>
          </thead>
          <tbody id="miniTableBody">
            {productsList.length > 0 ?
              itemsList
              :
              <tr><td>No Cart Items found</td></tr>
            }
          </tbody>
          <tbody>
            <tr className="mini-cart-subtotal">
              <td colSpan={6} className="mini-cart-sub">
                Total: Rs. <span id="miniTotalAmount" >{finalTotal}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mini-cart-w1">
          <Link to="/checkout/addresscheckout" >
            Checkout
          </Link>
        </div>
      </div>
    </span>
  )
}


export default Minicart