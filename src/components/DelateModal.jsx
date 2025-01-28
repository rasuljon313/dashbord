import create  from "../store/zustand";
function DelateModal() {
    const {delateNamet} = create();
    console.log(delateNamet);
    
  return (
    <div>
      <h1>Are you sshure delate thi{delateNamet}</h1>
    </div>
  )
}

export default DelateModal
