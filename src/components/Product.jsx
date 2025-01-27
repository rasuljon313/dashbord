/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";

const Product = ({ collapsed, setCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
    { id: "1", name: "Apple MacBook Pro 17", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
  ];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative ">
        <div className="flex justify-between bg-gray-50 items-center mb-4 ">
          <button
            className="p-2 w-10 h-10 bg-gray-400 text-white rounded transition-all duration-400 hover:bg-gray-500"
            onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? (
              <AiOutlineMenuUnfold className="w-6 h-6" />
            ) : (
              <AiOutlineMenuFold className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm bg-gray-400 text-white rounded transition-all duration-400 hover:bg-gray-500">
            Add New Product
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
  <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-white-700 dark:text-black">
    <tr>
      <th scope="col" className="px-6 py-3">Product name</th>
      <th scope="col" className="px-6 py-3">Color</th>
      <th scope="col" className="px-6 py-3">Category</th>
      <th scope="col" className="px-6 py-3">Price</th>
      <th scope="col" className="px-6 py-3">Action</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product, index) => (
      <tr
        key={product.id}
        className={`${
          index % 2 === 0 ? "bg-gray-200" : "bg-white"
        } border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg`}>
        <th
          scope="row"
          className="px-6 py-2 font-medium whitespace-nowrap text-black">
          {product.name}
        </th>
        <td className="px-6 py-2 text-black">{product.color}</td>
        <td className="px-6 py-2 text-black">{product.category}</td>
        <td className="px-6 py-2 text-black">{product.price}</td>
        <td className="px-6 py-2">
          <div className=" flex items-center gap-5">
          <button
            onClick={() => handleEdit(product)}
            className="  dark:text-green-600 hover:underline">
            <CiEdit />
          </button>
          <button
            onClick={() => handleEdit(product)}
            className="  dark:text-red-600 hover:underline">
            <FaRegTrashCan />
          </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        <Modal isOpen={isOpen} onClose={handleClose} productData={selectedProduct} />
      </div>
    </>
  );
};

export default Product;

  
