import { CiEdit, CiSearch } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import create from "../store/zustand";
import { useState, useEffect } from "react";
import axios from "axios";
const Category = () => {
  const { setEditModeCategory, setDelate,setDelateCateg, setDelateName,toggleIsOpenCategory,setSelectedCategnameUz,setSelectedCategnameRu,setSelectedCategnameEn,setSelectIDUrlCateg,serResponseC,resc,editModeCategory } = create();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProductDetails] = useState(null);
  const token = localStorage.getItem("token"); 
  const fetchProducts = async () => {
    try {
      // const response = await axios.get('http://178.128.204.58:8888/categories', {
        setLoading(true); 
      const response = await axios.get('https://mebelbot.limsa.uz/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      serResponseC(response.data.data); 
      // console.log(response);
      
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);
    }finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editModeCategory) {
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editModeCategory]);

  const edit = (product) => {
    setSelectIDUrlCateg(product?.id);
    setSelectedCategnameUz(product?.nameUz || "");
    setSelectedCategnameRu(product?.nameRu || "");
    setSelectedCategnameEn(product?.nameEn || "");
    setEditModeCategory(true);
  };

  const handDElate = (id, name) => {
    setDelateCateg(id)
    console.log(id);
    setDelateName(name);
    setDelate(true);
  };


  const openModal = (product) => {
    console.log(product);
    
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

  const createProduct = () => {
    toggleIsOpenCategory(true)
  }
  return (
    <>
      <div className="relative px-4">
        <div className=" flex gap-[50px] mb-[15px]">
        <div className="ml-auto relative">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-200 border-0 rounded-lg outline-none px-3 py-2 text-sm w-64 pr-10"
        />
        <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
      </div>
           <button
      onClick={createProduct}
      className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500">
      Add New Product
    </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-white-700 dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">NameUZ</th>
              <th scope="col" className="px-6 py-3">NameRU</th>
              <th scope="col" className="px-6 py-3">NameEN</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
      <tr>
        <td colSpan="10" className="text-center py-4 text-lg font-semibold">Loading...</td>
      </tr>
    ) : resc?.map((product,index) => (            
  <tr
    key={product.id}
    className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer`}
    onClick={() => openModal(product)}>
    <th scope="row" className="px-6 py-2 font-medium text-black">{product?.nameUz}</th>
    <td className="p-2 text-black">{product.nameRu}</td>
    <td className="p-2 text-black">{product.nameEn}</td>
    <td className="p-2">
      <div className="flex items-center gap-2">
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
            handDElate(product?.id, product?.name);
          }}
          className="w-[50px] h-10 flex justify-center items-center cursor-pointer dark:text-red-600"
        >
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
            <h2 className="text-xl font-bold mb-4"><strong>NameUz: </strong>{selectedProduct.nameUz}</h2>
            <p><strong>NameRu: </strong> {selectedProduct.nameRu}</p>
            <p><strong>NameEN:</strong> {selectedProduct.nameEn}</p>
            <button onClick={closeModal} className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500">Close</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Category