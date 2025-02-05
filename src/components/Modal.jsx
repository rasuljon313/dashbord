import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";

const Modal = () => {
  const { toggleIsOpen, setEditMode,
    // seta,
     editMode, selectednameUz, setSelectednameRu, selectednameRu, desUz, desRu, desEn, editPrice, editSize, selectednameEn, editCategory, setSelectednameUz, editIdUrl, setSelectednameEn, setSelecteddescrUz, setSelecteddescrRU, setSelecteddescrEN, setSelectedPrice, setSelectedSize, setSelectedCategory, setselectchair, setselecttable, table, chair, setGetimg, getImg, serResponse, res,setSelect,select
  } = create();

  const [img, setImg] = useState(""); 
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); 
  
  const postData = async () => {
    try {
      const productData = {
        nameUz: selectednameUz,
        nameRu: selectednameRu,
        nameEn: selectednameEn,
        descriptionUz: desUz,
        descriptionRu: desRu,
        descriptionEn: desEn,
        imageUrl: getImg,
        imageUrls: ["frgcerge"], 
        sizes: [{
          size: editSize,
          chair: +chair,
          table: +table,
          price: +editPrice,
        }],
        categoryId: +editCategory,
      };setSelectedCategory
  
      // const url = editMode 
      //   ? `http://178.128.204.58:8888/products/${editIdUrl}` 
      //   : 'http://178.128.204.58:8888/products'; 
      const url = editMode 
        ? `https://mebelbot.limsa.uz/products/${editIdUrl}` 
        : 'https://mebelbot.limsa.uz/products'; 
  
      const method = editMode ? 'PUT' : 'POST'; 
  
      const response = await axios({
        method: method,
        url: url,
        data: productData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      // seta(response.data.data);
      if (!editMode) {
        serResponse([...res, response.data.data]);
      } else {
        const updatedProducts = res.map(product => 
          product.id === response.data.data.id ? response.data.data : product
        );
        serResponse(updatedProducts);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };  

  console.log(res);
  
// console.log(img);

  // const file = async () => {
  //   if (!img) {
  //     console.error("Fayl tanlanmagan!");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("file", img);

  //   try {
  //     const response = await axios.post(
  //       // "http://178.128.204.58:8888/file/upload",
  //       "https://mebelbot.limsa.uz/file/upload",
  //       formData,
  //       {headers: {
  //           // "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },});
          
  //         // console.log(response);
  //     setGetimg(response?.data?.data?.path);
  //   }
  //      catch (error) {
  //     console.error("Xatolik yuz berdi:", error);}};
      // console.log(getImg);
      
// console.log(img);
// console.log(getImg);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://178.128.204.58:8888/categories', {
      const response = await axios.get('https://mebelbot.limsa.uz/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }});
      setSelect(response?.data?.data || []); 
    } catch (error) {
      console.error('Xatolik yuz berdi:', error);}};

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!img) {
      console.error("Fayl tanlanmagan!");
      return;
    }
    setLoading(true);
    // await file(); 
    await postData();
    setLoading(false);
    toggleIsOpen(false)
    setEditMode(false)
    setSelectednameUz("");
    setSelectednameRu("");
    setSelectednameEn("");
    setSelecteddescrUz("");
    setSelecteddescrRU("");
    setSelecteddescrEN("");
    setSelectedPrice("");
    setselectchair("")
    setselecttable("")
    setImg(null);
    setSelectedSize("");
    setSelectedCategory("");
    // setSelect("")
  };

  const closeModal = () => {
    setSelectednameUz("");
    setSelectednameRu("");
    setSelectednameEn("");
    setSelecteddescrUz("");
    setSelecteddescrRU("");
    setSelecteddescrEN("");
    setSelectedPrice("");
    setselectchair("")
    setselecttable("")
    setImg(null);
    setSelectedSize("");
    setSelectedCategory("");
    toggleIsOpen(false);
    setEditMode(false); 
    setSelect("")
  };

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const choseImg = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
  
    setImg(selectedFile); // State-ga saqlaymiz (agar kerak bo'lsa)
    await file(selectedFile); // Faylni bevosita funksiyaga yuboramiz
  };
  
  const file = async (selectedFile) => {
    if (!selectedFile) {
      console.error("Fayl tanlanmagan!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await axios.post(
        "https://mebelbot.limsa.uz/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setGetimg(response?.data?.data?.path);
      console.log("Rasm yuklandi:", response?.data?.data?.path);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-gray-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-800">
            {loading ? "Loading..." : editMode ? "Edit Product" : "Create New Product"}
          </h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-all">
            <IoIosCloseCircleOutline size={32} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 py-6 flex flex-col">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name (UZ)</label>
                <input
                  name="nameUz"
                  value={selectednameUz || ""}
                  onChange={(e) => setSelectednameUz(e.target.value)}
                  placeholder="UZ"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name (RU)</label>
                <input
                  name="nameRu"
                  value={selectednameRu || ""}
                  onChange={(e) => setSelectednameRu(e.target.value)}
                  placeholder="RU"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name (EN)</label>
                <input
                  name="nameEn"
                  value={selectednameEn || ""}
                  onChange={(e) => setSelectednameEn(e.target.value)}
                  placeholder="EN"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description (UZ)</label>
                <textarea
                  name="descriptionUz"
                  placeholder="UZ"
                  value={desUz || ""}
                  onChange={(e) => setSelecteddescrUz(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description (RU)</label>
                <textarea
                  name="descriptionRu"
                  placeholder="RU"
                  value={desRu || ""}
                  onChange={(e) => setSelecteddescrRU(e.target.value)}
                  className="bg-white
                   border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
                <textarea
                  name="descriptionEn"
                  placeholder="EN"
                  value={desEn || ""}
                  onChange={(e) => setSelecteddescrEN(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={editPrice || ""}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(e) => choseImg(e)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input name="size" type="text" placeholder="Size (e.g., M, L)" value={editSize || ""} 
              onChange={(e) => setSelectedSize(e.target.value)} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Chair</label>
              <input name="chair" type="text" placeholder="Chair" value={chair || ""} onChange={(e) => setselectchair(e.target.value)} required
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Table</label>
              <input name="table" type="text" placeholder="Tables" value={table || ""} onChange={(e) => setselecttable(e.target.value)} required
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select value={editCategory || ""} onChange={handleSelectChange} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]">
                <option value="">Choose category</option>
                {select.length > 0 ? (
                  select.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameUz}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading...</option>
                )}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center">
            {loading ? "Loading..." : editMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
