import axios from "axios";
import { useRef } from "react"
import { Link } from "react-router-dom"
import { useAuthContex } from "./contex/AuthContex";


const Login = () => {

  const {setAuthUser}=useAuthContex();
  const emailref=useRef(null);
  const passwordref=useRef(null);

  const handleLoginbackend =async ()=>{
    try {
        const loginUser ={
          email:emailref.current.value,
          password:passwordref.current.value,
        }

      const result=await axios.post("http://localhost:4000/api/auth/login",loginUser);
        localStorage.setItem("chat-User",JSON.stringify(result.data));
        setAuthUser(result.data);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <div className="bg-[url('https://img.freepik.com/free-vector/medical-healthcare-blue-background-with-cardiograph_1017-17391.jpg?size=626&ext=jpg')] pt-8 bg-cover h-screen">
      
      <div className="flex flex-col-reverse md:flex-row h-full w-full md:w-[900px] md:h-[400px] gap-16 items-start m-auto border-s-violet-950 bg-white pl-5">
      <div className="flex flex-col w-1/2 h-1/2 gap-3 md:p-5">
      <h1 className="font-bold text-xl md:text-2xl text-blue-900 ">Login to your account</h1>
      <h3 className="font-bold text-sm md:text-xl text-blue-900">E-mail</h3>
      <input ref={emailref} type="email" name="email" className="bg-slate-200 w-full" placeholder="Enter your email" required/>
      <h3 className="font-bold text-xl text-blue-900">Password</h3>
      <input ref={passwordref} type="text" className="bg-slate-200" name="password" placeholder="Enter your password" required/>
      <p>I agree to the processing of personal data</p>
      
      <button type="submit" className="bg-blue-700 w-28 h-8 text-lg rounded-sm" onClick={handleLoginbackend}>LOGIN</button>
      <p>New to this site? <Link to="/signup">Registration</Link></p>
      </div>
       <div className="w-1/2 pt-2 h-1/2">
               <img className="w-96 h-96" src="https://t3.ftcdn.net/jpg/00/63/74/62/360_F_63746248_ikHL5mQRmKXeWumLZk7ABJ9PT80VXjW5.jpg" alt=""/>
             </div>
      </div>
          </div>
        
         
    </div>
  )
}

export default Login
