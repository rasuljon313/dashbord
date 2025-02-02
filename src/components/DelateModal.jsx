import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
import axios from "axios";

function DelateModal() {
  const { delateName, setDelate,delatee } = create();
  const token = localStorage.getItem("token")
  const shortName = (name) => {
    if (!name) return "Nomsiz"; 
    const words = name.split(/\s+/); 
    return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : name;
  };
  const close = () => {
    setDelate(false);
  };

  const b = async () => {
    try {
      const response = await axios.delete(`http://178.128.204.58:8888/products/${delatee}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response){
      close()
       window.location.reload()
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }}



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="relative w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-white">
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h3 className="truncate">Are you sure! You want to <span className="text-red-600">Delete</span> {shortName(delateName)}?</h3>
        <button onClick={close} className="transition-all duration-300 hover:text-red-600 hover:bg-red-200 cursor-pointer rounded-lg w-8 h-8 flex items-center justify-center dark:hover:text-red absolute top-2 right-2">
          <IoIosCloseCircleOutline className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-around w-full mt-5">
      <button onClick={b} className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
  Delate
</button>

<button 
  onClick={() => setDelate(false)} 
  className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
  Cancel
</button>
</div>
    </div>
  </div>
  );
}

export default DelateModal;
