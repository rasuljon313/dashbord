import { CiEdit, CiSearch } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaRegTrashCan } from "react-icons/fa6";
import useSidebarStore from "../store/zustand";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";

const Product = () => {
  const {
    setEditMode,
    editMode,
    setMultiple,
    setSelectednameUz,
    setGetimg,
    setSelectednameEn,
    setSelectIDUrl,
    setSelectednameRu,
    setSelecteddescrUz,
    setSelecteddescrRU,
    setSelecteddescrEN,
    setDelate,
    setDelateName,
    setSelectedCategory,
    seta,
    serResponse,
    res,
    setDelatee,
    toggleIsOpen,
    setSizes,
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
      fetchProducts();
       // Fetch default products when no category is selected
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
  }, []);

  const edit = (product) => {
    setSelectIDUrl(product?.id);
    setSelectednameUz(product?.nameUz);
    setSelectednameRu(product?.nameRu);
    setSelectednameEn(product?.nameEn);
    setSelecteddescrUz(product?.descriptionUz);
    setSelecteddescrRU(product?.descriptionRu);
    setSelecteddescrEN(product?.descriptionEn);
    setSelectedCategory(product?.category?.id);
    setGetimg(product?.imageUrl);
    setMultiple(product?.imageUrls?.map((i) =>(i)));
    setEditMode(true);
    seta(product);
    setSizes(product?.sizes)
  };

  const handDElate = (id, name) => {
    setDelatee(id);
    setDelateName(name);
    setDelate(true);
  };

  const shortDescription = (descr) => {
    if (!descr) return "N/A";
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
  };

  const filteredProducts = (selectedCategoryId ? products : res || []).filter((product) => {
    const name = product.nameUz ? product.nameUz.toLowerCase() : "";
    const description = product.descriptionUz ? product.descriptionUz.toLowerCase() : "";
    
    return name.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
  });

  const handleImageNavigation = (direction) => {
    if (!selectedProduct || !selectedProduct.imageUrls) return;

    const totalImages = selectedProduct.imageUrls.length;
    let newIndex = selectedImageIndex;

    if (direction === "prev") {
      newIndex = selectedImageIndex === 0 ? totalImages - 1 : selectedImageIndex - 1;
    } else if (direction === "next") {
      newIndex = selectedImageIndex === totalImages - 1 ? 0 : selectedImageIndex + 1;
    }
    setSelectedImage(selectedProduct.imageUrls[newIndex]);
    setSelectedImageIndex(newIndex);
    window.addEventListener("keydown", direction)
    return () => {
      window.removeEventListener("keydown", direction);
    }
   
  };

  return (
    <>
      <div className="relative px-4">
        <div className="flex gap-[50px] mb-[15px]">
<select
  className="bg-gray-200 text-gray-500 rounded-lg outline-none px-4 py-2 text-sm w-[255px] transition-all ease-in-out duration-200 appearance-none "
  value={selectedCategoryId ?? "all"}
  onChange={handleCategoryChange}
  placeholder={"Kategoriyani tanlang "}>
  <option value="">Barcha kategoriyalar</option>
  {a.length > 0 ? (
    a.map((category) => (
      <option key={category.id} value={category.id} className="bg-white text-black hover:bg-gray-200">
        {category.nameUz}
      </option>
    ))
  ) : (
    <option disabled>Yuklanmoqda...</option>
  )}
</select>

          <div className="ml-auto relative">
            <input
              type="text"
              placeholder="Qidirish..."
              className="bg-gray-200 border-0 rounded-lg outline-none px-3 py-2 text-sm w-64 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
          </div>
          <button
            onClick={createProduct}
            className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500">
            Yangi mahsulot qo‘shish
          </button>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
          <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-white-700 dark:text-black">
            <tr>
              <th scope="col" className="px-3 py-1 w-[100px] text-[10px]">
                <AiOutlineFieldNumber className="text-[16px] font-bold" />
              </th>
              <th scope="col" className="px-2 py-3 w-[180px] text-center text-[10px]">
              Nomi
              </th>
              <th scope="col" className="px-2 py-3 w-[200px] text-center text-[10px]">
              Tavsif
              </th>
              <th scope="col" className="px-2 py-3 text-center text-[10px]">
              Kategoriya
              </th>
              <th scope="col" className="px-2 py-3 w-[150px] text-center text-[10px]">
              Asosiy rasm
              </th>
              <th scope="col" className="px-2 py-3 w-[150px] text-center text-[10px]">
              Qo‘shimcha rasmlar
              </th>
              <th scope="col" className="px-2 py-3 w-[120px] text-center text-[10px]">
              O‘lcham
              </th>
              <th scope="col" className="px-2 py-3 w-[100px] text-center text-[10px]">
              Stol
              </th>
              <th scope="col" className="px-2 py-3 w-[100px] text-center text-[10px]">
              Stul
              </th>
              <th scope="col" className="px-2 py-3 text-center text-[10px]">
              Narx
              </th>
              <th scope="col" className="px-2 py-3 text-center text-[10px]">
              Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {loding ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-lg font-semibold">
                Yuklanmoqda...
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product?.id}
                  // onClick={() => openModal(product)}
                  className={`${index % 2 === 0 ? "bg-gray-200" : "bg-white"} border-b border-gray-400 hover:bg-gray-300 transition-all duration-300 hover:shadow-lg`}
                  >
                  <td className="px-4 py-1 w-[100px] text-black leading-[10px] text-[10px]">{index + 1}</td>
                  <td className="px-2 py-1 w-[180px] text-black leading-[10px] text-center text-[10px]">{product?.nameUz}</td>
                  <td className="px-2 py-1 text-black w-[200px] text-[10px] text-center leading-[12px]">
                    {shortDescription(product?.descriptionUz) || ""}
                  </td>
                  <td className="px-2 py-1 text-black w-[200px] text-[10px] text-center leading-[12px]">
                    {a.find((category) => category?.id === product?.category?.id)?.nameUz || "Unknown"}
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-[10px]">
                    <div className="flex space-x-2">
                    <img
                      src={product?.imageUrl || ""}
                      alt="Product Image"
                      className="border border-transparent rounded-lg outline-none w-[200px] h-[50px] object-contain"
                    />
                    </div>
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-[10px]">
                    <div className="flex space-x-2 items-center justify-center">
  {product?.imageUrls.length > 0 ? (
    <img className="max-h-[55px] w-[75px] object-contain" src={product?.imageUrls[0]} alt="Product img" />
  ) : (
    <span className="flex items-center justify-center text-center w-[75px] h-[55px] border border-gray-300">
      Rasm mavjud emas
    </span>
  )}
</div>

                  </td>
                  <td className="px-2 py-1 text-black w-[120px] text-center text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.size || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-center text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.table || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[100px] text-center text-[10px] leading-[12px]">
                    {product?.sizes?.[0]?.chair || "N/A"}
                  </td>
                  <td className="px-2 py-1 text-black w-[130px] text-center text-[10px] leading-[12px]">
                    ${product?.sizes?.[0]?.price || "0"}
                  </td>
                  <td className="w-[130px]">
                    <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(product)
                        }}
                        className="w-[50px] h-10 flex justify-center items-center cursor-pointer text-black">
                        <IoEyeOutline className="w-[20px] h-full" />
                      </button>
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
                        className="w-[50px] h-10 flex justify-center items-center cursor-pointer dark:text-red-600">
                        <FaRegTrashCan className="w-[15px] h-full" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4 text-lg font-semibold">
                  Mahsulot topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={closeModal}>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
            <p className="text-[16px] mb-[6px]">
              <strong className="mr-1">Nomi:</strong>
              {selectedProduct.nameUz}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Tavsif:</strong> {selectedProduct?.descriptionUz}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Kategoriya:</strong> {selectedProduct?.category?.nameUz}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>O‘lcham:</strong> {selectedProduct?.sizes?.[0]?.size}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Stol:</strong> {selectedProduct?.sizes?.[0]?.table}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Stul:</strong> {selectedProduct?.sizes?.[0]?.chair}
            </p>
            <p className="text-[14px] mb-[3px]">
              <strong>Narx:</strong> {selectedProduct?.sizes?.[0]?.price}
            </p>
            <div className="w-full flex justify-center">
            <img src={selectedProduct?.imageUrl} className="w-[200px]" alt="" />
            </div>
            <div className="flex gap-3 overflow-x-auto justify-center items-center mt-[10px]">
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
                onClick={() => setIsOpen(false)}>
                <button
                  className="absolute top-5 right-5 cursor-pointer px-3 py-1 rounded-full text-lg shadow-lg"
                  onClick={() => setIsOpen(false)}>
                  <IoIosCloseCircleOutline className="text-red-500 w-[30px] h-[30px]" />
                </button>
                <button
              onClick={(e) =>
               { e.stopPropagation()
                 handleImageNavigation("prev")}}
              className="absolute left-5 text-white text-4xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition cursor-pointer">
              <FaArrowLeft />
            </button>
                <img
                  className="max-w-[70%] max-h-[80%] object-contain rounded-lg shadow-lg"
                  src={selectedImage}
                  alt="Enlarged"/>
            <button
              onClick={(e) =>{e.stopPropagation()
                 handleImageNavigation("next")}}
              className="absolute right-5 text-white text-4xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition cursor-pointer">
              <FaArrowRight />
            </button>
              </div>
            )}
            <button
              onClick={closeModal}
              className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
