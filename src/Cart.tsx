import React, { useState } from "react";
import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "./store/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  title: string;
  quantity: number;
  price: number;
};

type CartProps = {
  products?: Product[];
  text?: string;
  mode?: "browse" | "confirm";
};

function Cart({
  products = [],
  text = "Browse the items in your cart and then click Checkout",
  mode = "browse",
}: CartProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirmOrder = () => {
    dispatch(clearCart());
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/products");
    }, 2000);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{text}</p>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.title}
              secondary={"Quantity: " + product.quantity}
            />
          </ListItem>
        ))}
      </List>
      <div>
        Total Price: {products.reduce((total, { price }) => total + price, 0)}
      </div>
      {mode === "browse" ? (
        <Link to="/checkout">
          <Button style={{ marginBottom: 10 }} variant="contained">
            Checkout
          </Button>
        </Link>
      ) : (
        <Button
          style={{ marginBottom: 10 }}
          onClick={handleConfirmOrder}
          variant="contained"
        >
          Confirm Order
        </Button>
      )}
      <Snackbar
        open={showSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Cart;
