import axios from "axios";
import { useRef } from "react"
import { Link } from "react-router-dom";
import { useAuthContex } from "./contex/AuthContex";
import { FRONTEND_URL } from "./constant/Api";


const Registeration = () => {
  const nameref =useRef(null);
  const emailref =useRef(null);
  const passwordref =useRef(null);
  const confirmpasswordref =useRef(null);
  const genderref =useRef(null);

  const {setAuthUser}=useAuthContex();
  
  const handlebackend = async () => {
    try {
      const user = {
        name: nameref.current.value,
        email: emailref.current.value,
        password: passwordref.current.value,
        ConfirmPassword: confirmpasswordref.current.value,
        gender: genderref.current.value,
      };

      // eslint-disable-next-line no-undef
      const result = await axios.post(`${FRONTEND_URL}/api/auth/signup`, user); 
      if (result.data && typeof result.data === 'object') {
        localStorage.setItem("chat-User",JSON.stringify(result.data));
        setAuthUser(result.data);
      } else {
        console.error("Unexpected data format received from server");
      }
  
    }
     catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };
  return (
    <div>
       <div className="bg-[url('https://img.freepik.com/free-vector/medical-healthcare-blue-background-with-cardiograph_1017-17391.jpg?size=626&ext=jpg')] pt-8 bg-cover h-[1000px]">
      
      <div className="flex flex-col-reverse md:flex-row h-full w-full md:w-[900px] md:h-[900px] gap-16 items-start m-auto border-s-violet-950 bg-white pl-5">
      <div className="flex flex-col w-1/2 h-1/2 gap-3 md:p-5">
      <h1 className="font-bold text-2xl text-blue-900 ">Create a account</h1>
      <h3 className="font-bold text-xl text-blue-900">Name</h3>
      <input ref={nameref} type="text" name="name" className="bg-slate-200" placeholder="Enter your firstname and lastname" required/>
      <h3 className="font-bold text-xl text-blue-900">E-mail</h3>
      <input ref={emailref} type="email" name="email" className="bg-slate-200" placeholder="Enter your email" required/>
      <h3 className="font-bold text-xl text-blue-900">Password</h3>
      <input ref={passwordref} type="text" className="bg-slate-200" name="password" placeholder="Enter your password" required/>
      <h3 className="font-bold text-xl text-blue-900">Confirm Password</h3>
            <input ref={confirmpasswordref} type="password" name="ConfirmPassword" className="bg-slate-200 p-2 rounded" placeholder="Confirm your password" required/>

            <h3 className="font-bold text-xl text-blue-900">Gender</h3>
            <select ref={genderref} className="bg-slate-200 p-2 rounded" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

      <p>I agree to the processing of personal data</p>
      
      <button type="submit" className="bg-blue-700 w-28 h-8 text-xl" onClick={handlebackend} >Create</button>
      <p>Already have an account?<Link to="/login">Login</Link></p>
      </div>
       <div className="w-1/2 pt-2 h-1/2">
               <img className="w-96 h-96 " src="https://cdn.pixabay.com/photo/2019/10/02/04/40/registration-4519979_640.jpg" alt=""/>
             </div>
      </div>
          </div>
    </div>
  )
}

export default Registeration

