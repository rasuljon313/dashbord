import { useState } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  return (
    <div className="flex h-screen">
  <div
    className={`fixed top-0 left-0 h-full bg-gray-200 text-black transition-all duration-300 ease-in-out z-50 ${
      collapsed ? "w-16" : "w-64"}`}>
    <div className="flex justify-between items-center p-4">
      <a
        href="/category"
        className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
          collapsed ? "h-8 w-8" : "h-10 w-full bg-gray-400"
        }`}>
        <span
          className={`text-center font-bold transition-all duration-300 ${
            collapsed ? "text-xs" : "text-lg"
          }`}>
          Logo
        </span>
      </a>
    </div>

    <div className="mt-10">
      <ul className="space-y-4">
        <li
          className={`flex items-center px-4 py-2 hover:bg-gray-400 ${
            selectedKeys.includes("1") ? "bg-gray-400 transition-all duration-400 hover:bg-gray-400" : ""}`}
          onClick={() => setSelectedKeys(["1"])}>
          <MdProductionQuantityLimits className={`${collapsed ? "mx-auto" : "mr-5"}`} />
          <Link
            to="/category"
            className={`${
              collapsed ? " opacity-0 hidden" : " opacity-100 translate-x-0 block transition-all duration-300 ease-in-out"}`}>
            Product
          </Link>
        </li>
        <li
          className={`flex items-center px-4 py-2 hover:bg-gray-400 ${
            selectedKeys.includes("2") ? "bg-gray-400 transition-all duration-400 hover:bg-gray-400" : ""}`}
          onClick={() => setSelectedKeys(["2"])}>
          <BiCategory className={`${collapsed ? "mx-auto" : "mr-5"}`} />
          <Link
            to="/category"
            className={`${
              collapsed ? "opacity-0 hidden" : "opacity-100 translate-x-0 block transition-all duration-300 ease-in-out"}`}>
            Categories
          </Link>
        </li>

        <li className={`flex items-center px-4 py-2 hover:bg-gray-400 ${
            selectedKeys.includes("3") ? "bg-white" : ""}`}
          onClick={() => setSelectedKeys(["3"])}>
          <TbBrandBooking className={`${collapsed ? "mx-auto" : "mr-5"}`} />
          <Link
            to="/product"
            className={`${
              collapsed ? " opacity-0 hidden" : "opacity-100 translate-x-0 block transition-all duration-300 ease-in-out"}`}>
            Brands
          </Link>
        </li>
      </ul>
    </div>
  </div>

  <div
    className={`flex-1 transition-all p-4 duration-300 ease-in-out ${collapsed ? "ml-16" : "ml-64"}`}>
    <Product collapsed={collapsed} setCollapsed={setCollapsed} />
  </div>
</div>

  );
};

export default Sidebar;

