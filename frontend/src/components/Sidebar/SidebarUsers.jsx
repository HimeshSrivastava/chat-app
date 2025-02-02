/* eslint-disable react/prop-types */
import useConversation from "../zustand/useConversation"



const SidebarUsers = ({name,user}) => {
  const {selectedConversation,setSelectedConversation}=useConversation();

  
  const isSelected = selectedConversation?._id === user?._id;
  // console.log(user);
  return (
    <div 
     className={`flex items-center p-2 rounded-lg cursor-pointer ${isSelected ? "bg-sky-400" : ""} transition-all ease-in-out duration-200 hover:bg-sky-200`}
      onClick={() => setSelectedConversation(user)} // Call setSelectedConversation on click
    >   <img className="w-14 h-14 ml-2" src="https://clipart-library.com/images/8i6oer5KT.png" alt="name" />
      <h3>{name}</h3>
    </div>
  )
}

export default SidebarUsers

