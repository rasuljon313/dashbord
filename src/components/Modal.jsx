import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import create  from "../store/zustand";
import axios from "axios";
const Modal = () => {
  const {toggleIsOpen, setEditMode,editMode,selectednameUz,selectednameRu,desUz,desRu,desEn,editPrice,editSize,selectednameEn,editCategory,setSelectednameUz,} = create()
  // const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [descrUz, setDescriptionUz] = useState("");
  const [descrRu, setDescriptionRu] = useState("");
  const [descrEn, setDescriptionEn] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [getimg, setGetimg] = useState("");
  const [size, setSize] = useState("");
  const [chair, setChair] = useState("");
  const [table, setTable] = useState("");
  // const [i, setI] = useState("");
  const [select, setSelect] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const token = localStorage.getItem("token")
  
  const postData = async () => {
    try {
        const response = await axios.post('http://178.128.204.58:8888/products', {
          nameUz: selectednameUz,
          nameRu:nameRu,
          nameEn:nameEn,
          descriptionUz:descrUz,
          descriptionRu:descrRu,
          descriptionEn:descrEn,
          imageUrl:getimg,
          imageUrls:[
            "frgcerge"
          ],
          additionalImageUrl:null,
          sizes: [{
            size: size,
            chair:+chair,
            table:+table,
            price: +price
          }],
          categoryId:+selectedId
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Server javobi:', response);
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
};
const file = async () => {
  if (!img) {
      console.error("Fayl tanlanmagan!");
      return;
  }

  const formData = new FormData();
  formData.append("file", img);

  try {
      const response = await axios.post("http://178.128.204.58:8888/file/upload",
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
              },
          }
      );
      setGetimg(response?.data?.data?.path)
  } catch (error) {
      console.error("Xatolik yuz berdi:", error);
  }
};

const fetchData = async () => {
    try {
      const response = await axios.get('http://178.128.204.58:8888/categories', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    setSelect(response?.data?.data || [])
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
};

useEffect(() => {
  fetchData()
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setNameUz("")
  //   setNameRu("")
  //   setNameEn("")
  //   setDescriptionUz("")
  //   setDescriptionRu("")
  //   setDescriptionEn("")
  //   setPrice("")
  //   setImg("")
  //   setSize("")
  //   // setDimention("")
  //   setSelectedId("")
  //   postData()
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!img) {
        console.error("Fayl tanlanmagan!");
        return;
    }

    await file();

    postData(); 
    setSelectednameUz("");
    setNameRu("");
    setNameEn("");
    setDescriptionUz("");
    setDescriptionRu("");
    setDescriptionEn("");
    setPrice("");
    setImg(null);
    setSize("");
    setSelectedId("");
};

  const closeModal = () => {
    setSelectednameUz("")
    toggleIsOpen(false)
    setEditMode(false)
  }
  const handleSelectChange = (event) => {
    setSelectedId(event.target.value); 
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="relative w-full max-w-2xl p-8 rounded-2xl shadow-xl bg-gray-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-300">
        <h3 className="text-2xl font-semibold text-gray-800">
          {editMode ? "Edit Product" : "Create New Product"}
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-red-500 transition-all">
          <IoIosCloseCircleOutline size={32} />
        </button>
      </div>
  
      <form onSubmit={handleSubmit} className="space-y-6 py-6 flex flex-col">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name (UZ)</label>
              <input name="nameUz" value={selectednameUz || "" } onChange={(e) => setSelectednameUz(e.target.value)} placeholder="UZ" type="text" required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] " />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name (RU)</label>
              <input name="nameRu" value={editMode ? selectednameRu : nameRu || ""} onChange={(e) => setNameRu(e.target.value)}  placeholder="RU" type="text" required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] " />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name (EN)</label>
              <input name="nameEn" value={editMode ? selectednameEn : nameEn || ""} onChange={(e) => setNameEn(e.target.value)} placeholder="EN" type="text" required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
          </div>
  
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description (UZ)</label>
              <textarea name="descriptionUz" placeholder="UZ" value={editMode ? desUz : descrUz || ""} required onChange={(e) => setDescriptionUz(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"></textarea>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description (RU)</label>
              <textarea name="descriptionRu"  placeholder="RU" value={editMode ? desRu : descrRu || ""} required onChange={(e) => setDescriptionRu(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"></textarea>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
              <textarea name="descriptionEn"  placeholder="EN" value={editMode ? desEn : descrEn || ""} required onChange={(e) => setDescriptionEn(e.target.value)} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px] h-24"></textarea>
            </div>
          </div>
  
          <div className="mt-4 grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input name="price"  type="number" placeholder="Price" value={editMode ? editPrice : price || ""} onChange={(e) => setPrice(e.target.value) } required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input type="file" onChange={(e) => setImg(e.target.files[0])} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
            {/* <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Optional image</label>
              <input type="file" onChange={(e) => setI(e.target.files[0])}className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div> */}
          </div>



          </div>
  
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input name="size"  type="text" placeholder="Size (e.g., M, L)" value={editMode ? editSize : size || ""} onChange={(e) => setSize(e.target.value)} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Chair</label>
              <input name="chair"  type="text" placeholder="Chair" value={chair || ""} onChange={(e) => setChair(e.target.value)} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Table</label>
              <input name="table"  type="text" placeholder="Tables" value={table || ""} onChange={(e) => setTable(e.target.value)} required className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" />
            </div>
            <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select value={ editMode ? editCategory : +selectedId || ""} onChange={handleSelectChange} className="bg-white border-0 rounded-lg outline-none px-2 py-1 text-[12px] w-[185px]" >
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
          className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
          {editMode ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  </div>
  
  
  );
};
export default Modal