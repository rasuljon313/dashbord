import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";

function DelateModal() {
  const { delateName, setDelate } = create();

  const shortname = (name) => {
    const firstTwoWords = name.split(' ').slice(0, 2).join(' ');
    return `${firstTwoWords}`;
  };

  const confirmDelate = () => {
    setDelate(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14141480] bg-opacity-50">
    <div className="relative w-full flex flex-col items-center max-w-md p-4 rounded-lg shadow bg-gray-300">
      <div className="flex items-center justify-between w-[350px] p-4 border-b dark:border-gray-500">
        <h3 className="truncate">Are you sure! You want to <span className="text-red-600">Delete</span> {shortname(delateName)}?</h3>
        <button onClick={confirmDelate} className="transition-all duration-300 hover:text-red-600 hover:bg-red-200 cursor-pointer rounded-lg w-8 h-8 flex items-center justify-center dark:hover:text-red absolute top-2 right-2">
          <IoIosCloseCircleOutline className="w-5 h-5" />
        </button>
      </div>
      <div className="flex justify-around w-full mt-5">
      <button className="transition-all duration-600 bg-gray-400 text-white px-[15px] py-[8px] shadow-2xl hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] hover:bg-gray-500 cursor-pointer rounded-lg flex items-center justify-center dark:hover:text-red">
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
