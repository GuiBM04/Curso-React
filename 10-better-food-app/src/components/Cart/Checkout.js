import classes from "./Checkout.module.css";

import { useState, useRef } from "react";

function isEmpty(prop) {
    return prop.trim() === ""
}
function isFiveChars(prop) {
    return prop.trim().length === 5
}

function Checkout(props) {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postaCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postaCode: enteredPostalCodeIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    }

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? "" : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputValidity.street ? "" : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputValidity.postaCode ? "" : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputValidity.city ? "" : classes.invalid}`;

    return <form className={classes.form} onSubmit={submitHandler}>
                <div className={nameControlClasses}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' ref={nameInputRef}/>
                    {!formInputValidity.name && <p>Please enter a valid name!</p>}
                </div>

                <div className={streetControlClasses}>
                    <label htmlFor='street'>Street</label>
                    <input type='text' id='street' ref={streetInputRef}/>
                    {!formInputValidity.street && <p>Please enter a valid street!</p>}
                </div>

                <div className={postalCodeControlClasses}>
                    <label htmlFor='postal'>Postal Code</label>
                    <input type='text' id='postal' ref={postalCodeInputRef}/>
                    {!formInputValidity.postaCode && <p>Please enter a valid posta code!</p>}
                </div>
    
                <div className={cityControlClasses}>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' ref={cityInputRef}/>
                    {!formInputValidity.city && <p>Please enter a valid city!</p>}
                </div>
    
                <div className={classes.actions}>
                    <button type='button' onClick={props.onCancel}>Cancel</button>
                    <button className={classes.submit}>Confirm</button>
                </div>
    </form>
}

export default Checkout;