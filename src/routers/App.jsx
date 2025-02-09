import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "../Page/Login";
import Category from "../Page/Category";
import Layout from "../Page/Layout";
import Product from "../Page/Product";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
        <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Product />} />
        <Route path="category" element={<Category />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
