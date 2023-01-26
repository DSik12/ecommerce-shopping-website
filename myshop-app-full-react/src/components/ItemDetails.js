import React from "react";
import { useEffect, useState } from "react";
import fetchUrls from "../config/config.json";
import { Outlet } from "react-router-dom";
const ItemDetails = ({}) => {
  useEffect(() => {
    fetchCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [{}]);

  const [postData, setPostData] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCall = () => {
    //effects run after every completed render,upon initial render and upon UI update as well
    //it is an alternative to componentDidMount and componentuPDATE
    //IDEAL PLACE FOR AJAX CALLS
    fetch(`${fetchUrls.cartItemsApi}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonRes) => {
        setPostData(jsonRes);
        let cartNo = postData.length;
        let total = 0;
        for (let i = 0; i < cartNo; i++) {
          let prices = postData[i].price;
          let matches = String(prices).match(/(\d+)/);
          total += parseInt(matches[0]) * postData[i].quantity;
        }
        let detailsArray = [cartNo, total];
        setOrderTotal(detailsArray[0]);
        setTotalItems(detailsArray[1]);
      })
      .catch((err) => {
        console.log(err);
      });

    return postData;
    //setTopicName(fetchData.json().title);
  };

  return (
    <>
      <section className="itemsDetails">
        <p id="totalItems">Total items: {orderTotal}</p>
        <p id="orderTotal">Order Total: Rs. {totalItems}</p>
      </section>
      <Outlet />
    </>
  );
};

export default ItemDetails;
