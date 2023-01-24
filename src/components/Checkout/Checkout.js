// import classes from "./Cart.module.css";
import { useState } from "react";
import useValidate from "../../hooks/use-validate";

import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const fname = useValidate(formValidationHandler);
  const lname = useValidate(formValidationHandler);
  const addr1 = useValidate(formValidationHandler);
  const addr2 = useValidate(formValidationHandler);
  const city = useValidate(formValidationHandler);
  const zip = useValidate(formValidationHandler);
  const province = useValidate(formValidationHandler);
  const phone = useValidate(formValidationHandler);

  const [formValid, setFormValid] = useState(false);

  function formValidationHandler() {
    if (
      fname.inputValid &&
      lname.inputValid &&
      addr1.inputValid &&
      addr2.inputValid &&
      city.inputValid &&
      province.inputValid &&
      zip.inputValid &&
      phone.inputValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formValid) {
      return;
    }

    const orderDetails = [...event.target]
      .map((field) => field.value)
      .filter((field) => field !== "");

    props.onSubmit(orderDetails);
  };

  const submitBtnClasses =
    formValid === false
      ? `${classes.submit} ${classes.invalid}`
      : classes.submit;

  return (
    <div>
      <h3>Enter your Details to Place Order:</h3>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <div className={classes.control}>
          <input
            className={classes.input}
            placeholder="First Name"
            id="fname"
            name="fname"
            type="text"
            onChange={fname.inputUpdateHandler}
            onBlur={fname.inputBlurHandler}
            value={fname.input}
          />
          <input
            className={classes.input}
            placeholder="Last Name"
            id="lname"
            name="lname"
            type="text"
            onChange={lname.inputUpdateHandler}
            onBlur={lname.inputBlurHandler}
            value={lname.input}
          />
          {!fname.inputValid && fname.inputTouched && (
            <span>First Name cannot be empty |</span>
          )}
          {!lname.inputValid && lname.inputTouched && (
            <span>| Last Name cannot be empty</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={classes.inputfw}
            placeholder="Street Address, Line1"
            id="addr1"
            name="addr1"
            type="text"
            onChange={addr1.inputUpdateHandler}
            onBlur={addr1.inputBlurHandler}
            value={addr1.input}
          />
          {!addr1.inputValid && addr1.inputTouched && (
            <span>Street Name cannot be blank</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={classes.inputfw}
            placeholder="Postal Address, Line2"
            id="add2"
            name="add2"
            type="text"
            onChange={addr2.inputUpdateHandler}
            onBlur={addr2.inputBlurHandler}
            value={addr2.input}
          />
          {!addr2.inputValid && addr2.inputTouched && (
            <span>Postal Address cannot be blank</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={classes.input}
            placeholder="City"
            id="city"
            name="city"
            onChange={city.inputUpdateHandler}
            onBlur={city.inputBlurHandler}
            value={city.input}
          />
          <input
            className={classes.input}
            placeholder="Province"
            id="province"
            name="province"
            type="text"
            onChange={province.inputUpdateHandler}
            onBlur={province.inputBlurHandler}
            value={province.input}
          />
          {!city.inputValid && city.inputTouched && (
            <span>City cannot be blank |</span>
          )}
          {!province.inputValid && province.inputTouched && (
            <span>| Province cannot be blank</span>
          )}
        </div>
        <div className={classes.control}>
          <input
            className={classes.input}
            placeholder="Zip Code"
            id="zip"
            name="zip"
            onChange={zip.inputUpdateHandler}
            onBlur={zip.inputBlurHandler}
            value={zip.input}
          />
          <input
            className={classes.input}
            placeholder="Phone Number"
            id="phone"
            name="phone"
            type="text"
            onChange={phone.inputUpdateHandler}
            onBlur={phone.inputBlurHandler}
            value={phone.input}
          />
          {!zip.inputValid && zip.inputTouched && (
            <span>Zip-Code cannot be blank |</span>
          )}
          {!phone.inputValid && phone.inputTouched && (
            <span>| Phone Number cannot be blank</span>
          )}
        </div>
        <div className={classes.actions}>
          <button onClick={props.onClose}>⬅️ Back to Cart</button>
          <button disabled={!formValid} className={submitBtnClasses}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
