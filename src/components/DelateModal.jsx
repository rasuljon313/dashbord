import { IoIosCloseCircleOutline } from "react-icons/io";
import create from "../store/zustand";
function DelateModal() {
  const { delateName, setDelate } = create();

  const confirmDelate = () => {
    setDelate(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14141480] bg-opacity-50">
      <div className="relative w-full max-w-md p-4 rounded-lg shadow bg-gray-300">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-500">
          <h3> Are you sure! <span className="text-red-600">Delate</span> {delateName} ? </h3>
          <button onClick={confirmDelate} className="transition-all duration-300 hover:text-red-600 hover:bg-red-200 cursor-pointer rounded-lg w-8 h-8 flex items-center justify-center dark:hover:text-red">
            <IoIosCloseCircleOutline />
          </button>
        </div>
     <div className=" flex justify-around mt-5">
      <button className=" cursor-pointer" >delate</button>
      <button className=" cursor-pointer" >cancel</button>
     </div>
      </div>
    </div>
  );
}

export default DelateModal;
