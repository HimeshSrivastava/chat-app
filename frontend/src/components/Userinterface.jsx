import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar/Sidebar";

const Userinterface = () => {
  return (
    <div
      className="flex flex-col align-middle justify-center md:flex-row bg-[url('https://th.bing.com/th/id/OIP.XZk20nI3Oit9fQ-SQW33pQHaNK?w=186&h=331&c=7&r=0&o=5&dpr=1.4&pid=1.7')] 
      bg-no-repeat bg-cover bg-center min-h-screen"
    >
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Userinterface;
