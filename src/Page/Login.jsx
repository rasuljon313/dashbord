import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import tree from "../assets/2025-01-28 15.42.39.jpg";
import logo from "../assets/Chinar Mebel (1).png";

const Login = () => {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setLoading(true);
  
    axios.post("https://mebelbot.limsa.uz/auth/login", {
      username: number,
      password: password,
    })
    .then((response) => {
      const status = response?.status;
      const accessToken = response?.data?.access_token;
      
      
      if (status === 200 || status === 201) {
  
        if (accessToken ) {
                    localStorage.setItem('token', accessToken);
                    navigate("/"); 
            } else {
          console.error("No access token found in the response");
        }
      } else {
        toast.error(response?.data?.message || "Username or password is wrong");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Error occurred while logging in");
    })
    .finally(() => {
      setLoading(false);
      setNumber('');
      setPassword('');
    });
  }
  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col bg-gray-200">
        <img src={tree} alt="Tree" className="w-[80px] h-full select-none" />
        <img src={logo} alt="Logo" className="w-[250px] h-full mb-10 mt-5 select-none" />
        <div className="w-full max-w-md bg-gray-300 rounded-2xl shadow-lg shadow-gray-400 p-8">
          <form onSubmit={submit} className="space-y-6">
            <div>
              <input
               className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-100 select-none placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 border-gray-300 transition-all duration-300 ease-in-out"
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div>
              <input
                className="w-full px-4 py-3 border rounded-lg shadow-sm bg-gray-100 select-none placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 border-gray-300 transition-all duration-300 ease-in-out"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div>
              <button
                className={`w-full py-3 select-none text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
