import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar/Sidebar"


const Userinterface = () => {
  return (
    <div className="flex ml-72">
         <Sidebar/>
         <MessageContainer/>
    </div>
  )
}

export default Userinterface
