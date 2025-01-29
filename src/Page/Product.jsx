import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import create from "../store/zustand";
// import { useState } from "react";
const Product = () => {
  const { setEditMode, setSelectedProduct, setDelate, setDelateName, } = create();
  // const [confirmDelate, setConfirmdelate] = useState(null)
  const products = [
    { id: "1", name: "Apple MacBook Pro 17", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
  ];

  const edit = (product) => {
    setSelectedProduct(product.name)
    setEditMode(true)
  }
  const handDElate = (id, name) => {
    // setConfirmdelate(id)
    setDelateName(name)
    setDelate(true)
  }

  return (
    <>
      <div className="relative px-4">
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
            onClick={() => edit(product)}
            className=" cursor-pointer dark:text-green-600 hover:underline">
            <CiEdit />
          </button>
          <button
            onClick={() => handDElate(product?.id , product?.name)}
            className=" cursor-pointer dark:text-red-600 hover:underline">
            <FaRegTrashCan />
          </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </>
  );
};

export default Product;

  
