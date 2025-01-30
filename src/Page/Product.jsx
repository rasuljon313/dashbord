import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import create from "../store/zustand";
import { useState, useEffect } from "react";

const Product = () => {
  const { setEditMode, setSelectedProduct, setDelate, setDelateName } = create();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProductDetails] = useState(null);

  const products = [
    { id: "1", name: "Apple MacBook Pro 7 wxedfwef", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
    { id: "1", name: "Apple MacBook Pro 7 wxedfwef", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
    { id: "1", name: "Apple MacBook Pro 7 wxedfwef", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
    { id: "1", name: "Apple MacBook Pro 7 wxedfwef", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
    { id: "1", name: "Apple MacBook Pro 7 wxedfwef", color: "Silver", category: "Laptop", price: "$2999" },
    { id: "2", name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { id: "3", name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
    { id: "4", name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
    { id: "5", name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
  ];

  const edit = (product) => {
    setSelectedProduct(product.name);
    setEditMode(true);
  };

  const handDElate = (id, name) => {
    setDelateName(name);
    setDelate(true);
  };

  const shortname = (name) => {
    if (name.replace(/\s/g, "").length > 15) {
      return `${name.slice(0, 15)}...`;
    }
    return name;
  };

  const openModal = (product) => {
    setSelectedProductDetails(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProductDetails(null);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    
    if (modalOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen]);

  return (
    <>
      <div className="relative px-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
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
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer`}
                onClick={() => openModal(product)}>
                <th scope="row" className="px-6 py-2 font-medium w-[200px] whitespace-nowrap text-black">
                  {shortname(product?.name)}
                </th>
                <td className="px-6 py-2 text-black">{product.color}</td>
                <td className="px-6 py-2 text-black">{product.category}</td>
                <td className="px-6 py-2 text-black">{product.price}</td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation();
                        edit(product);
                      }} 
                      className="cursor-pointer dark:text-green-600 hover:underline">
                      <CiEdit />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation();
                        handDElate(product?.id, product?.name);
                      }} 
                      className="cursor-pointer dark:text-red-600 hover:underline">
                      <FaRegTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-unset bg-opacity-50" onClick={closeModal}>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
