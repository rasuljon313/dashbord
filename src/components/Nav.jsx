import create  from "../store/zustand";
function Nav() {
    const { toggleIsOpen } = create()
    const createProduct = () => {
      toggleIsOpen(true)
    }
  return (
    <div>
       <button
      onClick={createProduct}
      className="px-4 py-2 text-sm bg-gray-400 text-white rounded cursor-pointer transition-all duration-400 hover:bg-gray-500">
      Add New Product
    </button>
    </div>
  )
}

export default Nav
