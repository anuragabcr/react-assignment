import React from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import Cart from "./Cart";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type ProductListState = {
  products: Product[];
  productsInCart: Product[];
};

class ProductList extends React.Component<{}, ProductListState> {
  state: ProductListState = {
    products: [],
    productsInCart: [],
  };

  componentDidMount() {
    axios.get("https://dummyjson.com/products?limit=20&skip=20").then((res) => {
      const products: Product[] = res.data.products;
      this.setState({ products });
    });
  }

  addToCart = (product: Product) => {
    const newProduct = { ...product, quantity: 1 };
    this.setState((prevState) => ({
      productsInCart: [...prevState.productsInCart, newProduct],
    }));
  };

  render() {
    return (
      <div>
        <Cart products={this.state.productsInCart} />
        <Divider />
        <h1>Products</h1>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {this.state.products.map((product) => (
            <Grid item key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.thumbnail}
                  alt={product.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => this.addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default ProductList;
