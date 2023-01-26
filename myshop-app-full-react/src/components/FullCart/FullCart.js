import React, { useEffect, useState, useContext } from "react";
import fetchUrls from "../../config/config.json";
import GetAmount from "./GetAmount"; //for total price of products
import "./FullCart.scss";
import { Link } from "react-router-dom";
import TableHead from "../shared/TableHead";
import { CartQuantityContext} from '../shared/ReducerContextUtility/ReducerContextUtility'


const Fullcart = () => {
  const [data, fetchData] = useState([]);
  let [qty, setQty] = useState();

  const countContext = useContext(CartQuantityContext);

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
          fetchData(resp);
        }
        else {
          getProducts();
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
    getProducts();
  }, []);

  //fetching the data from api
  const getProducts = () => {
    updateCartBackend(fetchUrls.cartItemsApi, "GET");
  };

  let totalPrice = 0;
  //delete the products
  const deleteProduct = (id) => {
    let postData = { id: id };
    updateCartBackend(`${fetchUrls.cartItemsApi}/${id}`, "DELETE", postData);
  };  

  //update the products
  const updateProduct = (data) => {
    let quantityList = document.querySelectorAll(".full-cart-qty-input");
    console.log(quantityList);
    for (let i = 0; i < quantityList.length; i++) {
      let qtyId = quantityList[i].id.slice(-1);
      console.log(qtyId);
      let qtyValue = quantityList[i].value;
      let postData = {quantity : qtyValue};
      updateCartBackend(`${fetchUrls.cartItemsApi}/${qtyId}`, "PATCH", postData);
    };
  }

  //This function is used to set the quantity of a to be deleted item's quantity to state variable qty
  //so that context API decrement can be called that many times to update cart count in real time.

  // It is also used to set the quantity of a to be updated item to state variable qty, so that it can be 
  // compared with current value of quantity after updating once to update cart count in real time.
  const handleSetQuantity = (event) =>{
    console.log("Inside handleSetQuantity");
    console.log(event.target.id);
    if((event.target.id) === ("fullRemoveBtn-"+event.target.id.split('-')[1])){
      const itemId=event.target.id.split('-')[1];
      const item = data.filter((obj)=>{
        return obj.id === Number(itemId)
      })
      console.log(item);
      setQty(Number(item[0].quantity))
    }else{
    setQty(event.target.value);
    }
    console.log(qty);
  }
  const checkValue = (event) => {
    if(qty>event.target.value){
      countContext.countDispatch('decrement'); 
    }
    else{
      countContext.countDispatch('increment'); 
    }

  }

  const updateCartQuantityOnDelete = () => {
    console.log("Inside updateCartQuantityOnDelete");
    for(let i=1;i<=qty;i++){
      countContext.countDispatch('decrement'); 
    }
  }

  const callTwoFunctionsDelete = (itemId) =>{
    deleteProduct(itemId);
    updateCartQuantityOnDelete();
  }

  return (
    <div className="cart-page">
      <table className="full-cart-table">
        {/* <thead></thead> */}
        <TableHead></TableHead>
        <tbody id="fullTableBody" onClick={getProducts}>
          {data.map((item, index) => {
            // total price of individual product
            const amount = Number(item.price) * Number(item.quantity);
            // total price of all product
            totalPrice = totalPrice + amount;

            return (
              <tr key={index}>
                <td>
                  <img src={item.thumbnail} alt="not load" />
                </td>
                <td>{item.productName}</td>
                <td
                  className="full-cart-price"
                  id={"fullCartProductPrice" + item.id}
                >
                  {"Rs." + item.price}
                </td>
                <td className="full-cart-qty">
                  <input
                    type="number"
                    className="full-cart-qty-input"
                    id={"fullTotalQuantity" + item.id}
                    min={1}
                    defaultValue={item.quantity}
                    onMouseOver={handleSetQuantity}// This function is used to set present quantity of a product to be updated, to state variable qty on mouse over. 
                    onChange={checkValue}// This function is used to call the context API to update the cart quantity in real time, on updating the quantity of an item.
                  />
                </td>

                <td className="full-amount" id={"fullProductAmount" + item.id}>
                  Rs. {amount}
                </td>
                <td>
                  <button
                    className="full-remove-button"
                    id={"fullRemoveBtn-" + item.id}
                    onMouseOver={handleSetQuantity}// This function is used to set the quantity of a product to be deleted, to state variable qty on mouse over it's delete button. 
                    onClick={callTwoFunctionsDelete.bind(this,item.id)}// This is used to call a function which in turn calls 2 functions in it, on click of delete button for a product
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tbody>
          <tr className="full-cart-subtotal">
            <td colSpan={6} className="full-cart-sub">
              <GetAmount price={totalPrice} />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          type="button"
          className="update"
          id="update"
          onClick={updateProduct.bind(this)}
        >
          Update
        </button>
        <Link to="/checkout/addresscheckout" className="btn">
          Checkout
        </Link>
      </div>

      <div className="total-price">
        <Link to="/checkout/addresscheckout" className="btn">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Fullcart;