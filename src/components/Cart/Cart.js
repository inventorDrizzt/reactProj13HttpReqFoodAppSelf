import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "../Checkout/Checkout";
import useSubmit from "../../hooks/use-submit";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const {
    showCheckout,
    orderStatus,
    showCheckoutHandler,
    checkoutSubmitHandler,
  } = useSubmit(cartCtx.items, cartCtx.emptyCart);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {orderStatus.status && (
        <p className={classes["order-success"]}>
          Order Success, Thank you!{" "}
          <span>Order No: {orderStatus.orderNum}</span>
        </p>
      )}
      {showCheckout && !orderStatus.status && (
        <Checkout
          onClose={showCheckoutHandler}
          onSubmit={checkoutSubmitHandler}
        />
      )}
      {!showCheckout && cartItems}
      {!orderStatus.status && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      <div className={classes.actions}>
        {!showCheckout && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {orderStatus.status && (
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
        )}
        {!showCheckout && hasItems && (
          <button onClick={showCheckoutHandler} className={classes.button}>
            Go To Checkout
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
