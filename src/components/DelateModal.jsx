import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function DelateModal() {
  const { delateName, setDelate,delatee,delateCateg,delateNameCateg } = create();
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false);
  
  const shortName = (name) => {
    if (!name) return `${delateNameCateg}`; 
    const words = name.split(/\s+/); 
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : name;
  };
  const close = () => {
    setDelate(false);
  };
  const type = delatee ? "products" : "categories";
  const deleteId = delatee || delateCateg;

  const b = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://mebelbot.limsa.uz/${type}/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response) {
        close();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("Mahsulot o'chirildi",{
          duration:1000
        })
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={close}>
    <div className="relative max-w-2xl p-8 rounded-2xl shadow-xl bg-white w-[500px]" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h3 className="truncate"> {shortName(delateName)}ni <span className="text-red-600">{`O'chirishga`}</span> ishonchingiz komilmi?</h3>
        <button onClick={close} className="transition-all duration-300 hover:text-red-600 hover:bg-red-200 cursor-pointer rounded-lg w-8 h-8 flex items-center justify-center dark:hover:text-red absolute top-2 right-2">
          <IoIosCloseCircleOutline className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-around w-full mt-5">
      <button
     onClick={b}
     disabled={loading}
     className={`transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red ${
       loading ? "cursor-not-allowed opacity-50" : ""
     }`}> {loading ? "Yuklanmoqda..." : "O'chirish"}
</button>

<button 
  onClick={() => setDelate(false)} 
  className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
  Bekor qilish
</button>
</div>
    </div>
  </div>
  );
}

export default DelateModal;
