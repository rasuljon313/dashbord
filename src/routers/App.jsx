import { Route, Router, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Category from "../Page/Category";
import Brand from "../Page/Brand";
import Product from "../components/Product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
