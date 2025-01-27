/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import create  from "../store/zustand";
const Modal = ({ productData }) => {
  const {toggleIsOpen, setEditMode} = create()
  const [formData, setFormData] = useState(
    productData || { name: "", price: "", category: "", description: "" }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const closeModal = () => {
    toggleIsOpen(false)
    setEditMode(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14141480] bg-opacity-50">
      <div className="relative w-full max-w-md p-4 rounded-lg shadow bg-gray-300">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-500">
          <h3 className="text-lg font-semibold">
            {productData ? "Edit Product" : "Create New Product"}
          </h3>
          <buttonn onClick={closeModal} className="transition-all duration-300 hover:text-red-600 hover:bg-red-200 rounded-lg w-8 h-8 flex items-center justify-center dark:hover:text-red">
            <IoIosCloseCircleOutline />
          </buttonn>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="block w-full p-2.5 text-sm border rounded-lg dark:bg-gray-200 border-none outline-none"
              required/>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Price</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              className="block w-full p-2.5 text-sm border rounded-lg dark:bg-gray-200 border-none outline-none"
              required/>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm border dark:bg-gray-200  rounded-lg border-none outline-none"
              required>
              <option>Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full p-2.5 text-sm dark:bg-gray-200 border rounded-lg border-none outline-none"></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2.5 text-sm bg-gray-400 text-white rounded transition-all duration-400 hover:bg-gray-500">
            {productData ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Modal;
