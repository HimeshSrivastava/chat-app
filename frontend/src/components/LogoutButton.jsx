import axios from "axios"
import { useAuthContex } from "./contex/AuthContex";
import { FRONTEND_URL } from "./constant/Api";



const LogoutButton = () => {
      const {setAuthUser}=useAuthContex();
  const logout =async()=>{
    try {
      // eslint-disable-next-line no-undef
      const res=await axios.post(`${FRONTEND_URL}/api/auth/logout`);
       const result=res.data;
       if(result.error){
        throw new Error(result.error);
       }
       localStorage.removeItem("chat-User");
       setAuthUser(null);

    } catch (error) {
      console.error("Error during logout:",error);
    }
  }
   
  return (
    <div>
     <img onClick={logout} className="w-10 h-10 ml-2" src="https://t3.ftcdn.net/jpg/07/02/69/52/240_F_702695255_OTZ8WcZqi89HQmzEeQjvAkXyotlJcheW.jpg" alt="logout" />
    </div>
  )
}

export default LogoutButton
