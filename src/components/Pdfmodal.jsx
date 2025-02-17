import axios from "axios";
import create from "../store/zustand";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";

function Pdfmodal() {
  const token = localStorage.getItem("token");
  const { setGetPdf } = create();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async () => {
    if (!selectedFile) {
      console.error("Fayl tanlanmadi!");
      return;
    }

    setIsLoading(true); // Loading boshlanadi
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        "https://mebelbot.limsa.uz/file/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fayl muvaffaqiyatli yuklandi!");
      setGetPdf(false); // Yuklangandan keyin modal yopiladi
      toast.success("Katalog yuklandi",{
        duration:3000
      })
    } catch (error) {
      console.error("Faylni yuklashda xatolik yuz berdi:", error);
    } finally {
      setIsLoading(false); // Loading tugaydi
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setGetPdf(false)}>
      <div className="relative w-[350px] max-w-2xl p-3 rounded-2xl shadow-xl bg-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col items-center justify-center p-1 border-b border-gray-300">
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] mb-[10px]"
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
          <button 
            className="bg-gray-400 hover:bg-gray-500 transition-all duration-600 text-white px-3 py-1 rounded-lg text-sm mt-2 disabled:opacity-50"
            onClick={uploadFile}
            disabled={!selectedFile || isLoading} 
          >
            {isLoading ? "Yuklanmoqda..." : "Yuklash"}
          </button>
        </div>
        <button className="absolute top-2 right-2" onClick={() => setGetPdf(false)}>
          <IoIosCloseCircleOutline size={22} />
        </button>
      </div>
    </div>
  );
}

export default Pdfmodal;
