import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar/Sidebar"


const Userinterface = () => {
  return (
    <div className="flex align-middle justify-center">
         <Sidebar/>
         <MessageContainer/>
    </div>
  )
}

export default Userinterface
