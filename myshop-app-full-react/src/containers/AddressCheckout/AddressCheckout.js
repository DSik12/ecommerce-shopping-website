import React, { Component, useState, useEffect } from "react";
import "./AddressCheckout.scss";
import { NavLink } from "react-router-dom";
import ItemDetails from "../../components/ItemDetails";
import Select from "react-select";
import { withRouter } from "./withRouter";
import fetchUrls from "../../config/config.json";
import { useNavigate } from "react-router-dom";
import {useCallback} from "react";

const AddressCheckout = (data1) => {
  let navigate = useNavigate();
  let cartNo=0;
  let total=0;

  useEffect(() => {
    let search = window.location.search;
    if (search !== "") {
      handleContinueForExistingUsers();
    }
  }, []);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [mobilePhoneError, setMobilePhoneError] = useState("");
  const [addressContdError, setAddressContdError] = useState("");
  const [countryInputError, setCountryInputError] = useState("");
  const [stateError, setStateError] = useState("");
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingStreetAddress, setBillingStreetAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPin, setBillingPin] = useState("");
  const [billingPhoneInput, setBillingPhoneInput] = useState("");
  const [billingStreetAddressContd, setBillingStreetAddressContd] = useState("");
  const [billingCountryInput, setBillingCountryInput] = useState("");
  const [billingState, setBillingState] = useState("");
  const [shippingFirstName, setShippingFirstName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [shippingStreetAddress, setShippingStreetAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPin, setShippingPin] = useState("");
  const [shippingPhoneInput, setShippingPhoneInput] = useState("");
  const [shippingStreetAddressContd, setShippingStreetAddressContd] = useState("");
  const [shippingCountryInput, setShippingCountryInput] = useState("Country");
  const [shippingState, setShippingState] = useState("");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(false);

  const handleCheckBoxSelection = (event) => {
    const checked = event.target.value;
    if (checked) {
      setShippingFirstName(billingFirstName);
      setShippingLastName(billingLastName);
      setShippingStreetAddress(billingStreetAddress);
      setShippingStreetAddressContd(billingStreetAddressContd);
      setShippingCity(billingCity);
      setShippingPhoneInput(billingPhoneInput);
      setShippingPin(billingPin);
      setShippingCountryInput(billingCountryInput);
      setShippingState(billingState);
      setBillingSameAsShipping(true);
    }
    else {
      setShippingFirstName("");
      setShippingLastName("");
      setShippingStreetAddress("");
      setShippingStreetAddressContd("");
      setShippingCity("");
      setShippingPhoneInput("");
      setShippingPin("");
      setShippingCountryInput("");
      setShippingState("");
      setBillingSameAsShipping(false);
    }
  }

  const handleRequiredValidation = (event) => {

    let errorMessage = event.target.name;
    switch (errorMessage) {
      case "billingFirstName":
        if (event.target.value === "") {
          setFirstNameError("This Field is required");
        } else {
          setFirstNameError("");
        }
        break;
      case "billingLastName":
        if (event.target.value === "") {
          setLastNameError("This Field is required");
        } else {
          setLastNameError("");
        }
        break;
      case "billingStreetAddress":
        if (event.target.value === "") {
          setStreetAddressError("This Field is required");
        } else {
          setStreetAddressError("");
        }
        break;
      case "billingCity":
        if (event.target.value === "") {
          setCityError("This Field is required");
        } else {
          setCityError("");
        }
        break;
      case "billingPin":
        if (event.target.value === "") {
          setPinCodeError("This Field is required");
        } else {
          setPinCodeError("");
        }
        break;

      case "billingPhoneInput":
        if (event.target.value === "") {
          setMobilePhoneError("This Field is required");
        } else {
          setMobilePhoneError("");
        }
        break;
      case "billingStreetAddressContd":
        if (event.target.value === "") {
          setAddressContdError("This Field is required");
        } else {
          setAddressContdError("");
        }
        break;
      case "billingCountryInput":
        if (event.target.value === "") {
          setCountryInputError("This Field is required");
        } else {
          setCountryInputError("");
        }
        break;
      case "billingState":
        if (event.target.value === "") {
          setStateError("This Field is required");
        } else {
          setStateError("");
        }
        break;
      default:
    }

  }

  const handleNameCharValidation = (event) => {
    if (event.target.name === "billingFirstName") {
      setBillingFirstName(event.target.value);
    } else if (event.target.name === "billingLastName") {
      setBillingLastName(event.target.value);
    }
    let textElement = event.target.value;
    let pattern = /^[A-Za-z ]+$/;
    // Validate TextBox value against the Regex.
    let isValid = pattern.test(textElement);
    if (event.target.value == "") {
      handleRequiredValidation(event);
    }
    if (!isValid && event.target.name === "billingFirstName") {
      setFirstNameError("Name should only have alphabets!");
    }
    if (!isValid && event.target.name === "billingLastName") {
      setLastNameError("Name should only have alphabets!");
    }
    if (isValid) {
      if (event.target.name === "billingFirstName") {
        setFirstNameError("");
      }
      if (event.target.name === "billingLastName") {
        setLastNameError("");
      }
    }
    if (event.target.value.length >= 40) {
      setFirstNameError("Name should have less than 40 characters!");
    }
  }

  const handleAddressValidation = (event) => {
    let streetAddressName = event.target.name;
    let booleanVal = streetAddressName === "billingStreetAddress";

    if (booleanVal) {
      setBillingStreetAddress(event.target.value);

      if (event.target.value.length >= 70) {
        setStreetAddressError("Address should have less than 70 characters!");
      } else if (event.target.value.length < 70) {
        setStateError("");
      }
    }
    else {
      setBillingStreetAddressContd(event.target.value);
      if (event.target.value.length >= 70) {
        setAddressContdError("Address should have less than 70 characters!");
      } else if (event.target.value.length < 70) {
        setAddressContdError("");
      }
    }
  }

  const handleCityValidation = (event) => {
    setBillingCity(event.target.value);

    let textElement = event.target.value;
    let pattern = /^[A-Za-z ]+$/;
    // Validate TextBox value against the Regex.
    let isValid = pattern.test(textElement);

    if (!isValid) {
      setCityError("City should only have alphabets!");
    } else {
      setCityError("");
    }
    if (event.target.value.length >= 20) {
      setCityError("City should have less than 20 characters!");
    }
  }

  const handlePincodeValidation = (event) => {
    setBillingPin(event.target.value);
    var pin = "^[1-9][0-9]{4}$";

    if (event.target.value.match(pin)) {
      setPinCodeError("");
    }
    if (event.target.value.length > 6) {
      setPinCodeError("Pincode should have 6 digits!");
    }
  }

  const handlePhoneValidation = (event) => {
    setBillingPhoneInput(event.target.value);
    let phoneno = "^([0|+[0-9]{1,5})?([0-9]{11})$";

    if (event.target.value.match(phoneno)) {
      setMobilePhoneError("");
    }
    if (event.target.value.length > 13) {
      setMobilePhoneError("This number is not valid!");
      // event.preventDefault();
    }
  }


  const finalAlert = () => {
    if (
      billingFirstName !== "" &&
      billingLastName !== "" &&
      billingCity !== "" &&
      billingStreetAddress !== "" &&
      billingStreetAddressContd !== "" &&
      billingState !== "" &&
      billingCountryInput !== "" &&
      billingPhoneInput !== "" &&
      billingPin !== ""
    ) {
      return true;
    }
    alert("All fields are required");
    return false;
  }

  const handleContinue = () => {
    fetch(`${fetchUrls.cartItemsApi}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        let details = getCartDetails(data);
        cartNo = details[0];
        total = details[1];
        console.log(cartNo+" "+total);
        let search = window.location.search;
        if (search === "") {
          handleContinueForNewUsers(cartNo, total);
        }
        else {
          handleContinueForExistingUsersAfterContinue(cartNo, total);
        }
      });
     
  }

  const forContinue = (cartNo,total) => {

    let billingData = {
      firstName: billingFirstName,
      lastName: billingLastName,
      address: billingStreetAddress,
      addressContd: billingStreetAddressContd,
      city: billingCity,
      country: billingCountryInput,
      state: billingState,
      pin: billingPin,
      phone: billingPhoneInput,
    };
    let shippingData = {
      firstName: shippingFirstName,
      lastName: shippingLastName,
      address: shippingStreetAddress,
      addressContd: shippingStreetAddressContd,
      city: shippingCity,
      country: shippingCountryInput,
      state: shippingState,
      pin: shippingPin,
      phone: shippingPhoneInput,
    };
    let postData = {
      totalItems: cartNo,
      totalPrice: total,
      billingAddress: billingData,
      shippingAddress: shippingData,
      isOrderCompleted: false,
    };
    return billingData, shippingData, postData;
  }

  const fetchCall = (method,cartNo,total) => {

    if (finalAlert()) {
      let postData = forContinue(cartNo,total);
      let search = window.location.href;
      let orderId = search.split("?")[1];
      console.log(orderId+" "+method);
      postData.totalItems = cartNo;
      postData.totalPrice = total;
      let apiUrl;
     if(method==="PATCH")
     {
       apiUrl=`${fetchUrls.orderApi}/${orderId}`;
     }
     else{
       apiUrl=`${fetchUrls.orderApi}`
     }
      fetch(apiUrl, {
        method: method,
        body: JSON.stringify(postData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          navigate(`/checkout/shipping/orderID=${data.id}`);
          return data.id;
        });
    }
  }

  const handleContinueForExistingUsersAfterContinue = (cartNo, total) => {
    fetchCall("PATCH",cartNo,total);
  }

  
  const handleContinueForNewUsers = (cartNo, total) => {
    console.log(cartNo+" "+total);
    fetchCall("POST",cartNo,total);
  }
  const handleContinueForExistingUsers = () => {
    // If someone is coming from final-checkout page to edit the details
    let search = window.location.search;
    let orderId = parseInt(search.match(/(\d+)/)[0]);
    fetch(`${fetchUrls.orderApi}/${orderId}`)
      .then((res) => {
        return res.json();
      })
      .then((orderList) => {
        setBillingFirstName(orderList.billingAddress.firstName);
        setBillingLastName(orderList.billingAddress.lastName);
        setBillingStreetAddress(orderList.billingAddress.address);
        setBillingStreetAddressContd(orderList.billingAddress.addressContd);
        setBillingCity(orderList.billingAddress.city);
        setBillingPhoneInput(orderList.billingAddress.phone);
        setBillingPin(orderList.billingAddress.pin);
        setBillingCountryInput(orderList.billingAddress.country);
        setBillingState(orderList.billingAddress.state);
        setBillingSameAsShipping(false);

        setShippingFirstName(orderList.shippingAddress.firstName);
        setShippingLastName(orderList.shippingAddress.lastName);
        setShippingStreetAddress(orderList.shippingAddress.address);
        setShippingCity(orderList.shippingAddress.city);
        setShippingPhoneInput(orderList.shippingAddress.phone);
        setShippingPin(orderList.shippingAddress.pin);
        setShippingStreetAddressContd(orderList.shippingAddress.addressContd);
        setShippingCountryInput(orderList.shippingAddress.country);
        setShippingState(orderList.shippingAddress.state);
        setBillingSameAsShipping(false);

      });
  }

  const getCartDetails = (orderList) => {
    let cartNo = orderList.length;
    let total = 0;
    for (let i = 0; i < cartNo; i++) {
      let prices = orderList[i].price;
      let matches = String(prices).match(/(\d+)/);
      total += parseInt(matches[0]) * orderList[i].quantity;
    }
    let detailsArray = [cartNo, total];
    return detailsArray;
  }



  return (
    <div>
      <section className="orderStep">
        <h1>Checkout</h1>
        <NavLink
          to="/checkout/addresscheckout"
          activeClassName="active"
          id="address-checkout"
        >
          Address
        </NavLink>
        <NavLink to="#" activeclassname="active" id="shipping-checkoutt">
          Shipping
        </NavLink>
        <NavLink to="#" activeclassname="active" id="payment-checkoutt">
          Payment
        </NavLink>
        <NavLink to="#" activeclassname="active" id="final-checkoutt">
          FinalCheckout
        </NavLink>
      </section>
      <section className="formsSection">
        <form
          className="addressForm1"
          id="billingForm"
          name="billingForm"
        >
          <fieldset>
            <legend>Billing Address</legend>
            <div>
              <label htmlFor="billingFirstName" />
              <input
                type="text"
                className="focusField"
                id="billingFirstName"
                name="billingFirstName"
                data-testid="firstName"
                onChange={handleNameCharValidation}
                onBlur={handleRequiredValidation}
                required={true}
                autoFocus
                placeholder="First name"
                defaultValue={billingFirstName}
              />
              <p className="errorMessage">{firstNameError}</p>
            </div>
            <div>
              <label htmlFor="billingLastName" />
              <input
                type="text"
                className="focusField"
                id="billingLastName"
                name="billingLastName"
                onChange={handleNameCharValidation}
                required={true}
                onBlur={handleRequiredValidation}
                placeholder="Last name"
                defaultValue={billingLastName}
              />
              <p className="errorMessage">{lastNameError}</p>
            </div>
            <div>
              <label htmlFor="billingStreetAddress" />
              <input
                type="text"
                className="focusField"
                id="billingStreetAddress"
                name="billingStreetAddress"
                onChange={handleAddressValidation}
                required={true}
                onBlur={handleRequiredValidation}
                placeholder="Street Address"
                defaultValue={billingStreetAddress}
              />
              <p className="errorMessage">{streetAddressError}</p>
            </div>
            <div>
              <label htmlFor="billingStreetAddressContd" />
              <input
                type="text"
                className="focusField"
                id="billingStreetAddressContd"
                name="billingStreetAddressContd"
                onChange={handleAddressValidation}
                onBlur={handleRequiredValidation}
                placeholder="Street Address Continued"
                defaultValue={billingStreetAddressContd}
              />
              <p className="errorMessage">{addressContdError}</p>
            </div>
            <div>
              <label htmlFor="billingCity" />
              <input
                type="text"
                className="focusField"
                id="billingCity"
                name="billingCity"
                onChange={handleCityValidation}
                required={true}
                onBlur={handleRequiredValidation}
                placeholder="City"
                defaultValue={billingCity}
              />
              <p className="errorMessage">{cityError}</p>
            </div>
            <div>
              <select id="billingCountryList"
                value={billingCountryInput}
                onChange={e => setBillingCountryInput(e.target.value)}
                className="selectClass"
              >
                <option value="Ukraine">Ukraine</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Russia">Russia</option>
              </select>
              <p className="errorMessage">{countryInputError}</p>
            </div>
            <div>
              <select
                value={billingState}
                onChange={e => setBillingState(e.target.value)}
                className="selectClass"
                data-testid="state"
               >
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
              <p className="errorMessage">{stateError}</p>
            </div>
            <div>
              <label htmlFor="billingPin" />
              <input
                type="number"
                className="focusField"
                id="billingPin"
                name="billingPin"
                data-testid="pin"
                required={true}
                onChange={handlePincodeValidation}
                onBlur={handleRequiredValidation}
                placeholder="Pincode"
                defaultValue={billingPin}
              />
              <p className="errorMessage">{pinCodeError}</p>
            </div>
            <div>
              <label htmlFor="billingPhoneInput" />
              <span>
                <strong>Format:+(country-code)(phone-number)</strong>
              </span>
              <input
                type="tel"
                className="focusField"
                id="billingPhoneInput"
                name="billingPhoneInput"
                onChange={handlePhoneValidation}
                required={true}
                onBlur={handleRequiredValidation}
                placeholder="Phone Number"
                defaultValue={billingPhoneInput}
              />
              <p className="errorMessage">{mobilePhoneError}</p>
            </div>
          </fieldset>
        </form>
        <div className="addressCheckbox">
          <input type="checkbox" onClick={handleCheckBoxSelection} />
          <label htmlFor="checkboxIdMobile">
            Billing address same as shipping address.
          </label>
        </div>
        <form className="addressForm2" id="shippingForm" name="shippingForm">
          <fieldset>
            <legend>Shipping Address</legend>
            <div>
              <label htmlFor="shippingFirstName" />
              <input
                type="text"
                className="focusField"
                id="shippingFirstName"
                name="shippingFirstName"
                onChange={handleNameCharValidation}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="First name"
                defaultValue={shippingFirstName}
              />
              <span id="errorMsg" />
            </div>
            <div>
              <label htmlFor="shippingLastName" />
              <input
                type="text"
                title="Enter in valid format"
                className="focusField"
                id="shippingLastName"
                name="shippingLastName"
                onChange={handleNameCharValidation}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="Last name"
                defaultValue={shippingLastName}
              />
              <span id="errorMsg" />
            </div>
            <div>
              <label htmlFor="shippingStreetAddress" />
              <input
                type="text"
                className="focusField"
                id="shippingStreetAddress"
                name="shippingStreetAddress"
                onChange={handleAddressValidation}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="Street Address"
                defaultValue={shippingStreetAddress}
              />
              <span id="errorMsg" />
            </div>
            <div>
              <label htmlFor="shippingStreetAddressContd" />
              <input
                type="text"
                className="focusField"
                id="shippingStreetAddressContd"
                name="shippingStreetAddressContd"
                onChange={handleAddressValidation}
                placeholder="Street Address Continued"
                defaultValue={shippingStreetAddressContd}
              />
              <span id="errorMsg" />
            </div>
            <div>
              <label htmlFor="shippingCity" />
              <input
                type="text"
                className="focusField"
                id="shippingCity"
                name="shippingCity"
                onChange={handleCityValidation}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="City"
                defaultValue={shippingCity}
              />
              <span id="errorMsg" />
            </div>
            <div>
              <select
                value={shippingCountryInput}
                onChange={e => setShippingCountryInput(e.target.value)}
                className="selectClass"
                >
                <option value="Ukraine">Ukraine</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Russia">Russia</option>
              </select>
            </div>
            <div>
              <select
                value={shippingState}
                onChange={e => setShippingState(e.target.value)}
                className="selectClass"
                >
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
            <div>
              <label htmlFor="shippingPin" />
              <input
                type="number"
                className="focusField"
                id="shippingPin"
                name="shippingPin"
                onChange={handlePincodeValidation}
                defaultValue={shippingPin}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="Pincode"
              />
              <span id="errorMsg" />
            </div>
            <div>
              <label htmlFor="shippingPhoneInput" />
              <span>
                <strong>Format:+(country-code)(phone-number)</strong>
              </span>
              <input
                type="tel"
                className="focusField"
                id="shippingPhoneInput"
                name="shippingPhoneInput"
                onChange={handlePhoneValidation}
                defaultValue={shippingPhoneInput}
                required={true}
                disabled={billingSameAsShipping}
                placeholder="Phone Number"
              />
              <span id="errorMsg" />
            </div>
          </fieldset>
        </form>
      </section>
      <section className="continue">
        <div className="addressCheckbox">
          <input
            type="checkbox"
            onClick={handleCheckBoxSelection}
            id="checkboxIdDesktop"
          />
          <label htmlFor="checkboxIdDesktop">
            Billing address same as shipping address.
          </label>
        </div>
        <div>
          <button
            id="conBtn"
            className="continueButton"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </section>
    </div>
  );

}

export default AddressCheckout;