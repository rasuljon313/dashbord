import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";
import toast from "react-hot-toast";

const Modal = () => {
  const { toggleIsOpen, setEditMode,
     editMode, selectednameUz,setSizes,sizes,setMultiple,multiple, setSelectednameRu, selectednameRu, desUz, desRu, desEn, editPrice, editSize, selectednameEn, editCategory, setSelectednameUz, editIdUrl, setSelectednameEn, setSelecteddescrUz, setSelecteddescrRU, setSelecteddescrEN, setSelectedPrice, setSelectedSize, setSelectedCategory, setselectchair, setselecttable, table, chair, setGetimg, getImg,
      serResponse, res,
      setSelect,select
  } = create();

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");  
  const handleAddSize = () => {
    if (!editPrice?.trim()) {
      toast.error("Iltimos, o‘lchamni (size) kiriting!",{
        duration: 5000,
      });
      return;
    }
  
    const newSize = {
      size: editSize,
      chair: chair ? +chair : 0,
      table: table ? +table : 0,
      price: editPrice.trim() ? +editPrice.trim() : 0,
    };
    setSizes([...sizes, newSize]);
    setSelectedSize("");
    setselectchair("");
    setselecttable("");
    setSelectedPrice("");
  }; 
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
        sizes: sizes,
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
        toast.success('Muvaffaqiyatli bajarildi! 🎉',{
          duration: 5000,
        });
      } else {
        const updatedProducts = res.map(product => 
          product.id === response.data.data.id ? response.data.data : product
        );
        serResponse(updatedProducts);
        toast.success('Qayta yangilanish muvaffaqiyatli bajarildi! 🎉',{
          duration: 5000,
        });
      }
    } catch (error) {
      toast.success('Qayta urining:',{
        duration: 5000,
      }, error);
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
    setGetimg("");
    setMultiple([])
    setSizes([]);
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
    setSelectedSize("");
    setSelectedCategory("");
    toggleIsOpen(false);
    setEditMode(false); 
    setSelect("")
    setSizes([])
  };  
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
      <div className="relative w-full max-w-2xl p-3 rounded-2xl shadow-xl bg-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-1 border-b border-gray-300">
          <h3 className="text-[18px] font-semibold text-gray-800">
            {loading ? "Yuklanmoqda..." : editMode ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo‘shish"}
          </h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-all">
            <IoIosCloseCircleOutline size={32} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 p-2 flex flex-col">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-[14px] font-medium text-gray-700">Nomi (UZ)</label>
                <input
                  name="Nomi (uz)"
                  value={selectednameUz || ""}
                  onChange={(e) => setSelectednameUz(e.target.value)}
                  placeholder="UZ"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Nomi (RU)</label>
                <input
                  name="Nomi (ru)"
                  value={selectednameRu || ""}
                  onChange={(e) => setSelectednameRu(e.target.value)}
                  placeholder="RU"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Nomi (en)</label>
                <input
                  name="Nomi (en)"
                  value={selectednameEn || ""}
                  onChange={(e) => setSelectednameEn(e.target.value)}
                  placeholder="EN"
                  type="text"
                  required
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Tavsif (UZ)</label>
                <textarea
                  name="Tavsif (uz)"
                  placeholder="UZ"
                  value={desUz || ""}
                  onChange={(e) => setSelecteddescrUz(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Tavsif (RU)</label>
                <textarea
                  name="Tavsif (ru)"
                  placeholder="RU"
                  value={desRu || ""}
                  onChange={(e) => setSelecteddescrRU(e.target.value)}
                  className="bg-white
                   border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Tavsif (EN)</label>
                <textarea
                  name="Tavsif (en)"
                  placeholder="EN"
                  value={desEn || ""}
                  onChange={(e) => setSelecteddescrEN(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"
                />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-3 items-start">
              <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Kategoriya</label>
              <select value={editCategory || ""} required onChange={(e) => setSelectedCategory(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]">
                <option value="" disabled hidden>Kategoriyani tanlang</option>
                {select.length > 0 ? (
                  select.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nameUz}
                    </option>
                  ))
                ) : (
                  <option disabled>Yuklanmoqda...</option>
                )}
              </select>
            </div>

                 <div className={`space-y-2  flex flex-col items-center justify-center `}>
  <label className="block text-sm font-medium text-gray-700">Asosiy rasm</label>
  <input
    type="file"
    onChange={(e) => choseSingleImg(e)}
    className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
    required={!editMode}
    />
  {editMode && getImg && (
    <div>
      <img src={getImg} alt="img" className="w-10 h-10 object-contain" />
    </div>
  )}
              </div>
              <div className="space-y-2 flex flex-col items-center justify-center ">
              <label className="block text-sm font-medium text-gray-700">Bir nechta rasm</label>
      <input
        type="file"
        onChange={choseMultipleImg}
        className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
        multiple
        disabled={editMode}
        />
      <div className="flex flex-wrap gap-2 w-[100px]">
        {editMode && multiple.map((img, index) => (<img key={index} src={img} alt={`Uploaded ${index}`} className="w-10 h-10 object-contain" />))}
    <div className="flex flex-wrap gap-2 w-full">
  </div>
              </div>
             </div>

            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">O‘lcham</label>
              <input name="size" type="text" placeholder="O‘lcham (e.g., M, L)" value={editSize || ""} 
              onChange={(e) => setSelectedSize(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Stul</label>
              <input name="chair" type="number" placeholder="Stul" value={chair || ""} onChange={(e) => setselectchair(e.target.value)} 
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
            <div className="space-y-2 flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700">Stol</label>
              <input name="table" type="number" placeholder="Stol" value={table || ""} onChange={(e) => setselecttable(e.target.value)}
              className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
            </div>
          <ul>
  {sizes.map((item, index) => (
    <li key={index} className="bg-gray-300 p-1 rounded-lg mt-1 flex justify-between">
     <span className="leading-[12px] text-[10px]">{index + 1} {item?.size} - {item?.chair || ""} - {item?.table || ""} - ${item?.price || ""}</span>
      <button
        onClick={() => {
          setSizes(sizes.filter((_, i) => i !== index))}}
        className="text-red-500 text-[8px]">
        <IoIosCloseCircleOutline size={12} />
      </button>
    </li>
  ))}
</ul>
            <div className="space-y-2 flex flex-col items-center justify-center">
                <label className="block text-sm font-medium text-gray-700">Narx</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Narx"
                  value={editPrice || ""}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"/>
              </div>
              <input
    type="file"
    onChange={(e) => choseSingleImg(e)}
    className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
    required
    />
          </div>
          {/* <button
            type="submit"
            className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center">
            {loading ? "Loading..." : editMode ? "Update Product" : "Add Product"}
          </button> */}
          <div className=" flex items-center justify-center">
          <button
          
  type="button"
  required
  onClick={handleAddSize}
  className="transition-all duration-600 max-h-[50px] w-[200px] bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center">
  O‘lcham qo‘shish
</button>
          </div>
<button
      type="submit"
      disabled={sizes.length === 0}
      className={`transition-all duration-600 text-white px-[15px] py-[8px] shadow-2xl 
        ${sizes.length === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-500 cursor-pointer"} 
        rounded-lg flex items-center justify-center`}>
{loading ? "Yuklanmoqda..." : editMode ? "Mahsulotni yangilash" : "Yangi mahsulot yaratish"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
