import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "../Page/Login";
import Category from "../Page/Category";
import Brand from "../Page/Brand";
import Layout from "../Page/Layout";
import Product from "../Page/Product";
import { useEffect } from "react";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Product />} />
        <Route path="category" element={<Category />} />
        <Route path="brand" element={<Brand />} />
      </Route>
    </Routes>
  );
};

export default App;
