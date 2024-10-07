import Login from "./components/Login"
import Registeration from "./components/Registeration"
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Userinterface from "./components/Userinterface";
import { useAuthContex } from "./components/contex/AuthContex";

const App = () => {
  const {authUser}=useAuthContex();
  return (
      <div>
         <Routes>
          <Route path="/" element={authUser ? <Userinterface/> :  <Navigate to="/login"/> }/>
          <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Registeration/>}/>
      </Routes>

      </div>
      
     
  
  )
}

export default App
