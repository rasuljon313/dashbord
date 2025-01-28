import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Page/Login";
import Category from "../Page/Category";
import Brand from "../Page/Brand";
import Layout from "../Page/Layout";
import Product from "../Page/Product";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Product />} />
          <Route path="category" element={<Category />} />
          <Route path="brand" element={<Brand />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

