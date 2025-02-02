import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import create  from "../store/zustand";
import Modal from "../components/Modal"
import DelateModal from "../components/DelateModal";
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); 
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const {isOpen,editMode, delate } = create()
  const navigate = useNavigate("")
const  delatetoken = (e) => {
  e.preventDefault();
   localStorage.removeItem("token")
    navigate("/login")
  window.location.reload();
}
  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-gray-200 text-black transition-all duration-300 ease-in-out z-50 ${
          collapsed ? "w-16" : "w-64"}`}>
        <div className="flex justify-between items-center p-4 bg-gray-200">
          <Link
            to="/"
            className={`flex items-center justify-center transition-all duration-300 ease-in-out ${collapsed ? "h-8 w-8" : "h-10 w-full bg-gray-300"}`}>
            <span
              className={`text-center font-bold transition-all duration-300 ${collapsed ? "text-xs" : "text-lg"}`}>
              Logo
            </span>
          </Link>
        </div>

        <div className="mt-10">
          <ul className="space-y-4">
<Link
  to="/"
  className="w-full"
  onClick={() => setSelectedKeys(["1"])}>
  <li
    className={`flex items-center px-4 py-2 mb-[10px] transition-all duration-300 ${
      selectedKeys.includes("1") ? "bg-gray-300" : "hover:bg-gray-300"
    }`}>
    <MdProductionQuantityLimits className={`${collapsed ? "mx-auto" : "mr-5"}`} />
    <span
      className={`transition-opacity duration-300 ${
        collapsed
          ? "opacity-0 hidden"
          : "opacity-100 block"
      }`}>
      Product
    </span>
  </li>
</Link>

<Link
  to="/category"
  className="w-full"
  onClick={() => setSelectedKeys(["2"])}>
  <li
    className={`flex items-center px-4 py-2 transition-all duration-300 ${
      selectedKeys.includes("2") ? "bg-gray-300" : "hover:bg-gray-300"
    }`}>
    <BiCategory className={`${collapsed ? "mx-auto" : "mr-5"}`} />
    <span
      className={`transition-opacity duration-300 ${
        collapsed
          ? "opacity-0 hidden"
          : "opacity-100 block"
      }`}>
      Categories
    </span>
  </li>
</Link>
          </ul>
        </div>
      </div>

<div
  className={`flex-1 transition-all duration-300 ease-in-out  ${collapsed ? "ml-16" : "ml-64"}`}>
  <div
    className="flex justify-between bg-gray-200 items-center mb-4 p-4 shadow sticky top-0 z-10"
  >
    <button
      className="p-2 w-10 h-10 bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? (
        <AiOutlineMenuUnfold className="w-6 h-6" />
      ) : (
        <AiOutlineMenuFold className="w-6 h-6" />
      )}
    </button>
    <button
      onClick={(e)=>delatetoken(e)}
      className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500">
      log out
    </button>
  </div>

        <Outlet />
        { isOpen &&  <Modal/> }
        { editMode &&  <Modal/> }
        { delate && <DelateModal/>}
      </div>
    </div>
  );
};

export default Sidebar;
