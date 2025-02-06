import { CiEdit, CiSearch } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import useSidebarStore from "../store/zustand";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineFieldNumber } from "react-icons/ai";

const Product = () => {
  const {
    setEditMode,
    editMode,
    setMultiple,
    setMultipleImages,
    setSelectednameUz,
    setGetimg,
    setSelectednameEn,
    setSelectIDUrl,
    setSelectednameRu,
    setSelecteddescrUz,
    setSelecteddescrRU,
    setSelecteddescrEN,
    setSelectedPrice,
    setDelate,
    setDelateName,
    setSelectedSize,
    setSelectedCategory,
    setselectchair,
    setselecttable,
    seta,
    serResponse,
    res,
    setDelatee,
    toggleIsOpen,
  } = useSidebarStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProductDetails] = useState(null);
  const [loding, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [a, setA] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://mebelbot.limsa.uz/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      serResponse(response.data.data);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductss = async () => {
    try {
      const response = await axios.get("https://mebelbot.limsa.uz/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setA(response.data.data);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      setA([]);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    if (!categoryId) return;
    try {
      const response = await axios.get(
        `https://mebelbot.limsa.uz/products/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Mahsulotlarni yuklashda xatolik:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId);
    } else {
      fetchProducts(); // Fetch default products when no category is selected
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId]);

  useEffect(() => {
    fetchProductss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editMode) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const edit = (product) => {
    console.log(product);
    setSelectIDUrl(product?.id);
    setSelectednameUz(product?.nameUz);
    setSelectednameRu(product?.nameRu);
    setSelectednameEn(product?.nameEn);
    setSelecteddescrUz(product?.descriptionUz);
    setSelecteddescrRU(product?.descriptionRu);
    setSelecteddescrEN(product?.descriptionEn);
    setSelectedSize(product?.sizes?.[0]?.size);
    setSelectedPrice(product?.sizes?.[0]?.price);
    setselectchair(product?.sizes?.[0]?.chair);
    setselecttable(product?.sizes?.[0]?.table);
    setSelectedCategory(product?.category?.id);
    setGetimg(product?.imageUrl);
    setMultipleImages(product?.imageUrls?.map((i) => setMultiple(i)));
    setEditMode(true);
    seta(product);
  };

  const handDElate = (id, name) => {
    setDelatee(id);
    setDelateName(name);
    setDelate(true);
  };

  const shortDescription = (descr) => {
    const words = descr.split(/\s+/);
    if (words.length > 10) {
      return `${words.slice(0, 18).join(" ")}...`;
    }
    return descr;
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
        setIsOpen(false);
      }
    };

    if (modalOpen || isOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [modalOpen, isOpen]);

  const createProduct = () => {
    toggleIsOpen(true);
  };

  const handleCategoryChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoryId(selectedId);
    console.log("Tanlangan kategoriya ID:", selectedId);
  };

  const filteredProducts = (selectedCategoryId ? products : res || []).filter((product) => {
    return (
      product.nameUz.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descriptionUz.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="relative px-4">
        <div className="flex gap-[50px] mb-[15px]">
          <select
            className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
          >
            <option value="">Choose category</option>
            {a.length > 0 ? (
              a.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameUz}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
          <div className="ml-auto relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 border-0 rounded-lg outline-none px-3 py-2 text-sm w-64 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
          </div>
          <button
            onClick={createProduct}
            className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500"
          >
            Add New Product
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-white-700 dark:text-black">
            <tr>
              <th scope="col" className="px-3 py-1 w-[100px] text-[10px]">
                <AiOutlineFieldNumber className="text-[16px] font-bold" />
              </th>
              <th scope="col" className="px-2 py-3 w-[180px] text-[10px]">
                Name
              </th>
              <th scope="col" className="px-2 py-3 w-[200px] text-[10px]">
                Description
              </th>
              <th scope="col" className="px-2 py-3 text-[10px]">
                Category
              </th>
              <th scope="col" className="px-2 py-3 w-[150px] text-[10px]">
                Base Img
              </th>
              <th scope="col" className="px-2 py-3 w-[150px] text-[10px]">
                Option Img
              </th>
              <th scope="col" className="px-2 py-3 w-[120px] text-[10px]">
                Size
              </th>
              <th scope="col" className="px-2 py-3 w-[100px] text-[10px]">
                Table
              </th>
              <th scope="col" className="px-2 py-3 w-[100px] text-[10px]">
                Chair
              </th>
              <th scope="col" className="px-2 py-3 text-[10px]">
                Price
              </th>
              <th scope="col" className="px-2 py-3 text-[10px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loding ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-lg font-semibold">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product?.id}
                  onClick={() => openModal(product)}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg cursor-pointer`}
                >
                  <td className="px-4 py-1 w-[100px] text-black leading-[10px] text-[10px]">{index + 1}</td>
                  <td className="px-2 py-1 w-[180px] text-black leading-[10px] text-[10px]">{product?.nameUz}</td>
                  <td className="px-2 py-1 text-black w-[200px] text-[10px] leading-[12px]">
                    {shortDescription(product?.descriptionUz)}
                  </td>
                  <td className="px-2 py-1 text-black w-[200px] text-[10px] leading-[12px]">
                    {a.find((category) => category?.id === product?.category?.id)?.nameUz || "Unknown"}
                  </td>
                  <td className="py-1 text-black w-[100px] text-[10px]">
                    <img
                      src={product?.imageUrl || ""}
                      alt="Product Image"
                      className="border border-transparent rounded-lg outline-none w-[200px] h-[50px] object-contain"
                    />
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-[10px]">
                    <div className="flex space-x-2">
                      {product?.imageUrls?.length > 0 &&
                        product.imageUrls.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Option ${idx + 1}`}
                            className="w-[50px] h-[50px] object-contain"
                          />
                        ))}
                    </div>
                  </td>
                  <td className="px-2 py-1 text-black w-[120px] text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.size || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.table || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.chair || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[130px] text-[10px] leading-[12px]">
                    ${product?.sizes?.[0]?.price || "0"}
                  </td>
                  <td className="w-[130px]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          edit(product);
                        }}
                        className="w-[50px] h-10 flex justify-center items-center dark:text-green-600 cursor-pointer"
                      >
                        <CiEdit className="w-[20px] h-full" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handDElate(product?.id, product?.nameUz);
                        }}
                        className="w-[50px] h-10 flex justify-center items-center cursor-pointer dark:text-red-600"
                      >
                        <FaRegTrashCan className="w-[15px] h-full" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-lg font-semibold">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <p className="text-[16px] mb-4">
              <strong className="mr-1">Name:</strong>
              {selectedProduct.nameUz}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Description:</strong> {selectedProduct?.descriptionUz}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Category:</strong> {selectedProduct?.category?.nameUz}
            </p>
            <p className="text-[14px] mb-[10px]">
              <strong>Size:</strong> {selectedProduct?.sizes?.[0]?.size}
            </p>
            <p className="text-[14px] mb-[10px]">
              <strong>Table:</strong> {selectedProduct?.sizes?.[0]?.table}
            </p>
            <p className="text-[14px] mb-[10px]">
              <strong>Chair:</strong> {selectedProduct?.sizes?.[0]?.chair}
            </p>
            <p className="text-[14px] mb-[10px]">
              <strong>Price:</strong> {selectedProduct?.sizes?.[0]?.price}
            </p>
            <div className="flex gap-3 overflow-x-auto">
              {selectedProduct?.imageUrls.map((imageUrl) => (
                <div key={imageUrl} className="flex-shrink-0">
                  <p className="flex items-center gap-5 text-[18px] mb-[10px]">
                    <img
                      className="w-[150px] h-[100px] object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
                      src={imageUrl}
                      alt={`Product`}
                      onClick={() => handleImageClick(imageUrl)}
                    />
                  </p>
                </div>
              ))}
            </div>

            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                onClick={() => setIsOpen(false)}
              >
                <button
                  className="absolute top-5 right-5 cursor-pointer px-3 py-1 rounded-full text-lg shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <IoIosCloseCircleOutline className="text-red-500 w-[30px] h-[30px]" />
                </button>
                <img
                  className="max-w-[70%] max-h-[80%] object-contain rounded-lg shadow-lg"
                  src={selectedImage}
                  alt="Enlarged"
                />
              </div>
            )}
            {products.length > 0 ? (
              <ul>
                {products.map((product) => (
                  <li key={product.id}>{product.nameUz}</li>
                ))}
              </ul>
            ) : (
              <p>Mahsulotlar topilmadi.</p>
            )}

            <button
              onClick={closeModal}
              className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
