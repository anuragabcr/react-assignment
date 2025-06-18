import React from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";

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
        <Button
          style={{ marginBottom: 10 }}
          href={"/checkout"}
          variant="contained"
        >
          Checkout
        </Button>
      ) : (
        <Button
          style={{ marginBottom: 10 }}
          href={"/checkout"}
          variant="contained"
        >
          Confirm Order
        </Button>
      )}
    </div>
  );
}

export default Cart;
