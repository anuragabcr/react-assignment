import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Products from "./Products";
import Checkout from "./Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
