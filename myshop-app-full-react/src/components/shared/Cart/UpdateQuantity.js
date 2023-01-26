import React, { useState, useContext } from "react";
import fetchUrls from '../../../config/config.json'
import { CartQuantityContext } from '../ReducerContextUtility/ReducerContextUtility';

const UpdateQuantity = (props) => {
    let [quantity, setQuantity] = useState(0); // hooks
    let cartCount = 0; // counter to check the items in the cartItemsApi
    const cartItemsUrl = `${fetchUrls.cartItemsApi}/${props.product.id}`;
    let cartItemsData = null; // products in the cartItemsApi

    const updateCartBackend = (url, method, cartCount) => {
        let postData = {
            thumbnail: props.product.imageURLs[0].thumbnail,
            productName: props.product.productName,
            price: props.product.price,
            quantity: cartCount,
            id: props.product.id
        };
        fetch(url, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log("Update cart fetch hit.");
        });
    }

    let handleIncrementQty = () => {
        fetch(fetchUrls.cartItemsApi).then((res) => {
            return res.json();
        }).then((jsonRes) => {
            cartItemsData = jsonRes;
            setQuantity(quantity => quantity + 1);  //using hooks to increase quantity by 1
            Object.entries(cartItemsData).map(([key]) => {
                if (cartItemsData[key].productName === props.product.productName) {
                    cartCount = cartCount + parseInt(cartItemsData[key].quantity);
                }
                return <></>;
            })
            if (cartCount !== 0) {
                cartCount = cartCount + 1;
                updateCartBackend(cartItemsUrl, "PATCH", cartCount);//patch
            }
            else {
                cartCount = 1;
                updateCartBackend(fetchUrls.cartItemsApi, "POST", cartCount);//post
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log("Increase button fetch hit.");
        });
    }

    let handleDecreaseQty = () => {
        if (quantity !== 0) {
            fetch(fetchUrls.cartItemsApi).then((res) => {
                return res.json();
            }).then((jsonRes) => {
                cartItemsData = jsonRes;
                setQuantity(quantity => quantity - 1);
                Object.entries(cartItemsData).map(([key]) => {
                    if (cartItemsData[key].productName === props.product.productName) {
                        cartCount = cartCount + parseInt(cartItemsData[key].quantity);
                    }
                    return <></>;
                })
                if (cartCount > 1) {
                    cartCount = cartCount - 1;
                    updateCartBackend(cartItemsUrl, "PATCH", cartCount);
                }
                else if (cartCount === 1) {
                    cartCount = cartCount - 1;
                    updateCartBackend(cartItemsUrl, "DELETE", cartCount);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    let handleOnClickIncrement = () => {
        countContext.countDispatch('increment');
        handleIncrementQty();
    }

    let handleOnClickDecrement = () => {
        countContext.countDispatch('decrement');
        handleDecreaseQty();
    }

    const countContext = useContext(CartQuantityContext)

    return (
        <div>
            <div className="minus-button" value="Decrease Value" onClick={handleOnClickDecrement}>
                -
            </div>
            <span className="input" style={{ backgroundColor: "yellow" }} >
                {quantity} in basket
            </span>
            <div className="plus-button" value="Increase Value" onClick={handleOnClickIncrement}>
                +
            </div>
        </div>
    );
}

export default UpdateQuantity; //export