import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar/Sidebar"


const Userinterface = () => {
  return (
    <div className="flex flex-col align-middle justify-center md:flex-row">
         <Sidebar/>
         <MessageContainer/>
    </div>
  )
}

export default Userinterface

