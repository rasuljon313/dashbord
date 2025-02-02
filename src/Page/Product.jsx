import { CiEdit, CiSearch } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import create from "../store/zustand";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const Product = () => {
  const { setEditMode, setSelectednameUz,setSelectednameEn,setSelectednameRu,setSelecteddescrUz,setSelecteddescrRU,setSelecteddescrEN,setSelectedPrice, setDelate, setDelateName,setSelectedSize,setSelectedCategory, } = create();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProductDetails] = useState(null);
  const [res, setResponse] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://178.128.204.58:8888/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResponse(response.data.data); 
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edit = (product) => {
    console.log(product);
    
    setSelectednameUz(product?.nameUz);
    setSelectednameRu(product?.nameRu);
    setSelectednameEn(product?.nameEn);
    setSelecteddescrUz(product?.descriptionUz);
    setSelecteddescrRU(product?.descriptionRu)
    setSelecteddescrEN(product?.descriptionEn)
    setSelectedSize(product?.sizes?.[0]?.size)
    setSelectedPrice(product?.sizes?.[0]?.price)
    setSelectedCategory(product?.category?.nameUz)
    setEditMode(true);
  };

  const handDElate = (id, name) => {
    console.log("Deleting product:", id, name);
    setDelateName(name);
    setDelate(true);
  };

  const shortDescription = (descr) => {
    const words = descr.split(/\s+/); 
    if (words.length > 10) {
      return `${words.slice(0, 10).join(" ")}...`; 
    }
    return descr;
  };

  const shortName = (name) => {
    if (!name) return "Nomsiz"; 
    const words = name.split(/\s+/); 
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : name;
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
        <div className="flex gap-[50px]">
          <div className="ml-auto relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 border-0 rounded-lg outline-none px-3 py-2 text-sm w-64 pr-10"
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
          </div>
          <Nav />
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-white-700 dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3 w-[180px]">Product name</th>
              <th scope="col" className="px-2 py-3 w-[200px]">Description</th>
              <th scope="col" className="px-2 py-3">Category</th>
              <th scope="col" className="px-2 py-3 w-[150px]">Base Img</th>
              <th scope="col" className="px-2 py-3 w-[150px]">Option Img</th>
              <th scope="col" className="px-2 py-3 w-[100px]">Size</th>
              <th scope="col" className="px-2 py-3 w-[100px]">Table</th>
              <th scope="col" className="px-2 py-3 w-[100px]">Chair</th>
              <th scope="col" className="px-2 py-3">Price</th>
              <th scope="col" className="px-2 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {res?.map((product, index) => (
              <tr
                key={product.id}
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer`}
                onClick={() => openModal(product)}>
                <th className="px-6 py-2 font-medium w-[180px] text-black leading-[24px]">
                  {shortName(product?.nameUz)}
                </th>
                <td className="px-2 py-2 text-black w-[200px]">{shortDescription(product?.descriptionUz)}</td>
                <td className="px-2 py-2 text-black w-[150px]">{product.category?.nameUz}</td>
                <td className="px-2 py-2 text-black w-[100px] "><img src={`https://realauto.limsa.uz/api/uploads/images/${product.imageUrl}`} alt="" /></td>
                <td className="px-2 py-2 text-black w-[100px] "><img src={`https://realauto.limsa.uz/api/uploads/images/${product.imageUrls}`} alt="" /></td>
                <td className="px-2 py-2 text-black w-[100px] ">{product.sizes?.[0]?.size}</td>
                <td className="px-2 py-2 text-black w-[100px] ">{product.sizes?.[0]?.table}</td>
                <td className="px-2 py-2 text-black w-[100px] ">{product.sizes?.[0]?.chair}</td>
                <td className="px-2 py-2 text-black w-[130px] ">$ {product.sizes?.[0]?.price}</td>
                <td className="w-[130px]">
                  <div className="flex items-center">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        edit(product);
                      }} 
                      className="w-[50px] h-10 flex justify-center items-center dark:text-green-600 cursor-pointer">
                      <CiEdit className="w-[20px] h-full" />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        handDElate(product?.id, product?.nameUz); 
                      }}
                      className="w-[50px] h-10 flex justify-center items-center cursor-pointer dark:text-red-600">
                      <FaRegTrashCan className="w-[15px] h-full" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <p className="text-xl font-bold mb-4"><strong>Name:</strong>{selectedProduct.nameUz}</p>
            <p className="text-[18px] mb-[3px]" ><strong>Description:</strong> {selectedProduct?.descriptionUz}</p>
            <p className="text-[18px] mb-[3px]" ><strong>Category:</strong> {selectedProduct?.category?.nameUz}</p>
            <p className="text-[18px] mb-[10px]" ><strong>Size:</strong> {selectedProduct?.sizes?.[0]?.size}</p>
            <p className="text-[18px] mb-[10px]" ><strong>Table:</strong> {selectedProduct?.sizes?.[0]?.table}</p>
            <p className="text-[18px] mb-[10px]" ><strong>Chair:</strong> {selectedProduct?.sizes?.[0]?.chair}</p>
            <p className="text-[18px] mb-[10px]" ><strong>Price:</strong> {selectedProduct?.sizes?.[0]?.price}</p>
            <button onClick={closeModal} className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
