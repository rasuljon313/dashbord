import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";

const Modal = () => {
  const { toggleIsOpen, setEditMode,
     editMode, selectednameUz,setMultiple,multiple, setSelectednameRu, selectednameRu, desUz, desRu, desEn, editPrice, editSize, selectednameEn, editCategory, setSelectednameUz, editIdUrl, setSelectednameEn, setSelecteddescrUz, setSelecteddescrRU, setSelecteddescrEN, setSelectedPrice, setSelectedSize, setSelectedCategory, setselectchair, setselecttable, table, chair, setGetimg, getImg, serResponse, res,setSelect,select
  } = create();

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
        imageUrls: multiple,
        sizes: [{
          size: editSize,
          chair: +chair,
          table: +table,
          price: +editPrice,
        }],
        categoryId: +editCategory,
      };

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

  const choseSingleImg = async (e) => {
    const selectedFile = e.target.files[0]; 
    if (!selectedFile) return;
    await uploadFile(selectedFile, setGetimg);
  };

  const choseMultipleImg = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
  
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        return await uploadFile(file);
      })
    );
  
    setMultiple([...multiple, ...uploadedImages.filter(Boolean)]);
  };



  const uploadFile = async (file, setImageState) => {
    if (!file) {
      console.error("Fayl tanlanmadi!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
      const uploadedUrl = response?.data?.data?.path;
      if (setImageState) setImageState(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("Faylni yuklashda xatolik yuz berdi:", error);
      return null;
    }
  };

  const fetchData = async () => {
    try {
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
    setLoading(true);
  
    if (!editMode && !getImg) {
      console.error("Fayl tanlanmagan!");
      setLoading(false);
      return;
    }
  
    await postData();
    setLoading(false);
    toggleIsOpen(false);
    setEditMode(false);
    setSelectednameUz("");
    setSelectednameRu("");
    setSelectednameEn("");
    setSelecteddescrUz("");
    setSelecteddescrRU("");
    setSelecteddescrEN("");
    setSelectedPrice("");
    setselectchair("");
    setselecttable("");
    setSelectedSize("");
    setSelectedCategory("");
    setGetimg(""); // Reset image URL
    setMultiple([])

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
    // setImg(null);
    setSelectedSize("");
    setSelectedCategory("");
    toggleIsOpen(false);
    setEditMode(false); 
    setSelect("")
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
              <div className="space-y-2 flex flex-col items-center justify-center">
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
              <div className="space-y-2 flex flex-col items-center justify-center">
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
              <div className="space-y-2 flex flex-col items-center justify-center">
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
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Description (UZ)</label>
                <textarea
                  name="descriptionUz"
                  placeholder="UZ"
                  value={desUz || ""}
                  onChange={(e) => setSelecteddescrUz(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center">
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
              <div className="space-y-2 flex flex-col items-center justify-center">
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

            <div className="mt-4 grid grid-cols-3 gap-6 items-start">
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={editPrice || ""}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
              </div>

                 <div className={`space-y-2  flex flex-col items-center justify-center `}>
  <label className="block text-sm font-medium text-gray-700">Image</label>
  <input
    type="file"
    onChange={(e) => choseSingleImg(e)}
    className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
    required={!editMode}
    disabled={editMode}
    />
  {editMode && getImg && (
    <div>
      <img src={getImg} alt="Current" className="w-20 h-20" />
      <p>Current Image</p>
    </div>
  )}
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center ">
              <label className="block text-sm font-medium text-gray-700">Multiple Images</label>
      <input
        type="file"
        onChange={choseMultipleImg}
        className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
        multiple
        disabled={editMode}
        />
      <div className="flex flex-wrap gap-2 w-[100px]">
        {editMode && multiple.map((img, index) => (
       <img key={index} src={img} alt={`Uploaded ${index}`} className="w-10 h-10" />
         ))}
    <div className="flex flex-wrap gap-2 w-full">
  </div>
              </div>
             </div>

            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input name="size" type="text" placeholder="Size (e.g., M, L)" value={editSize || ""} 
              onChange={(e) => setSelectedSize(e.target.value)} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Chair</label>
              <input name="chair" type="text" required placeholder="Chair" value={chair || ""} onChange={(e) => setselectchair(e.target.value)} 
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Table</label>
              <input name="table" type="text" placeholder="Tables" value={table || ""} onChange={(e) => setselecttable(e.target.value)} required
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select required onChange={(e) => setSelectedCategory(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]">
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
