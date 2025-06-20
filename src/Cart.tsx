import React, { useState } from "react";
import {
  Alert,
  Button,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "./store/cartSlice";
import { useDispatch } from "react-redux";

type Product = {
  title: string;
  quantity: number;
  price: number;
  discountPercentage?: number;
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

  const originalTotal = products.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const discountedTotal = products.reduce(
    (total, { price, quantity, discountPercentage = 0 }) => {
      const discountedPrice = price - (price * discountPercentage) / 100;

      return total + discountedPrice * quantity;
    },
    0
  );

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{text}</p>
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.title}
              secondary={
                `Quantity: ${product.quantity}` +
                ` • Price ${product.price} ` +
                (product.discountPercentage
                  ? ` • Discount: ${product.discountPercentage}%`
                  : "")
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        <strong>Original Total:</strong> ₹{originalTotal.toFixed(2)}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        <strong>Total after Discount:</strong> ₹{discountedTotal.toFixed(2)}
      </Typography>
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
