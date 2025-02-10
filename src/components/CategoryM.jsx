import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function CategoryM() {
  const {
    setSelectedCategnameUz,
    setSelectedCategnameRu,
    setSelectedCategnameEn,
    selectedCategnameUz,
    selectedCategnameRu,
    selectedCategnameEn,
    editModeCategory,
    toggleIsOpenCategory,
    setEditModeCategory,
    editIdUrlCateg,
    serResponseC,
    resc,
  } = create();
  const token = localStorage.getItem("token");
const [loading, setLoading] = useState(false);
  // const postData = async () => {
  //   try {
  //     const productData = {
  //       nameUz: selectedCategnameUz,
  //       nameRu: selectedCategnameRu,
  //       nameEn: selectedCategnameEn,
  //     };

  //     const url = editModeCategory
  //       ? `https://mebelbot.limsa.uz/categories/${editIdUrlCateg}`
  //       : "https://mebelbot.limsa.uz/categories";

  //     const method = editModeCategory ? "PUT" : "POST";

  //     const response = await axios({
  //       method: method,
  //       url: url,
  //       data: productData,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!editModeCategory) {
  //       serResponseC([...resc, response.data.data]);
  //     } else {
  //       const updatedProducts = resc.map(product => 
  //         product.id === response.data.data.id ? response.data.data : product
  //       );
  //       serResponseC(updatedProducts);
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   }
  // };

  const postData = async () => {
    try {
      const existingData = editModeCategory
        ? resc.find(product => product.id === editIdUrlCateg)
        : null;
  
      const productData = {
        nameUz: selectedCategnameUz || existingData?.nameUz || "",
        nameRu: selectedCategnameRu || existingData?.nameRu || "",
        nameEn: selectedCategnameEn || existingData?.nameEn || "",
      };
  
      const url = editModeCategory
        ? `https://mebelbot.limsa.uz/categories/${editIdUrlCateg}`
        : "https://mebelbot.limsa.uz/categories";
  
      const method = editModeCategory ? "PUT" : "POST";
  
      const response = await axios({
        method: method,
        url: url,
        data: productData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!editModeCategory) {
        serResponseC([...resc, response.data.data]);
        toast.success('Muvaffaqiyatli bajarildi! 🎉');
      } else {
        const updatedProducts = resc.map(product =>
          product.id === response.data.data.id ? response.data.data : product
        );
        serResponseC(updatedProducts);
        toast.success('Qayta yangilanish muvaffaqiyatli bajarildi! 🎉');
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await postData();
    setLoading(false)
    toggleIsOpenCategory(false);
    setEditModeCategory(false);
    setSelectedCategnameUz("");
    setSelectedCategnameRu("");
    setSelectedCategnameEn("");
  };

  const closeModal = () => {
    setSelectedCategnameUz("");
    setSelectedCategnameRu("");
    setSelectedCategnameEn("");
    toggleIsOpenCategory(false);
    setEditModeCategory(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
      <div className="relative w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-800">
            {loading ? "Loading..." : editModeCategory ? " Kategoriyani tahrirlash" : "Yangi kategoriya qoshish"}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 transition-all">
            <IoIosCloseCircleOutline size={32} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 py-6 flex flex-col">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nomi (UZ)
              </label>
              <input
                name="nameUz"
                value={selectedCategnameUz || ""}
                onChange={(e) => setSelectedCategnameUz(e.target.value)}
                placeholder="UZ"
                type="text"
                required
                className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
              Nomi (RU)
              </label>
              <input
                name="nameRu"
                value={selectedCategnameRu || ""}
                onChange={(e) => setSelectedCategnameRu(e.target.value)}
                placeholder="RU"
                type="text"
                required
                className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
              Nomi (EN)
              </label>
              <input
                name="nameEn"
                value={selectedCategnameEn || ""}
                onChange={(e) => setSelectedCategnameEn(e.target.value)}
                placeholder="EN"
                type="text"
                required
                className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red"
          >
            {loading ? "Loading..." : editModeCategory ? "Kategoryiyani yangilash" : "Kategoriya qo‘shish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryM;
