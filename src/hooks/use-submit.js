import { useState } from "react";

const useSubmit = (cartItems, emptyCart) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderStatus, setOrderStatus] = useState({
    status: false,
    orderNum: "",
  });

  const showCheckoutHandler = () => {
    setShowCheckout((prevState) => !prevState);
  };

  const checkoutSubmitHandler = (orderDetails) => {
    const orderData = {
      ...orderDetails,
      ...cartItems,
    };
    console.log(orderData);
    submitToServerHandler(orderData);
  };

  const submitToServerHandler = async (orderData) => {
    try {
      const response = await fetch(
        "https://react-http-bd5ca-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Error contacting server");
      }
      const data = await response.json();
      setOrderStatus({ status: true, orderNum: data.name });
      // emptyCart();
    } catch (error) {
      console.log(error);
      setOrderStatus({ status: false, orderNum: "" });
    }
  };

  return {
    showCheckout,
    orderStatus,
    showCheckoutHandler,
    checkoutSubmitHandler,
  };
};

export default useSubmit;
