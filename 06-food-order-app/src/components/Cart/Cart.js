import classes from './Cart.module.css';

import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';

function Cart(props) {
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
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}/>)}</ul>;

    return <Modal onClose={props.onClose}>
        {cartItems}

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
}

export default Cart;