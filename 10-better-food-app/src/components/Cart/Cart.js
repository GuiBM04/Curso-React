import classes from './Cart.module.css';

import React, { useState, useContext } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';
import Checkout from "./Checkout";

function Cart(props) {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, amount: 1});
    }

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    }

    const cartItems = <ul className={['cart-items']}>{cartCtx.items.map(item =>
        <CartItem key={item.id + Math.random()}
                  name={item.name}
                  amount={item.amount}
                  price={item.price}
                  onAdd={cartItemAddHandler.bind(null, item)}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}/>)}
    </ul>;
    
    function orderHandler() {
        setIsCheckingOut(true);
    }

    async function submitOrder(userData) {
        setIsSubmitting(true);
        const response = await fetch("https://food-order-backend-c8ef0-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}

            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
    
            {isCheckingOut && <Checkout onConfirm={submitOrder} onCancel={props.onClose}/>}
            {!isCheckingOut && modalActions}
        </React.Fragment>
    );
    
    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Success sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    );

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
}

export default Cart;