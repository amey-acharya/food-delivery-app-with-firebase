import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onCheckout({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
    })
  };
  const nameValidClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetValidClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalValidClass = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityValidClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameValidClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetValidClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid Street</p>}
      </div>
      <div className={postalValidClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Please enter a valid Postal Code</p>}
      </div>
      <div className={cityValidClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
