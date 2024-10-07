import Login from "./components/Login"
import Registeration from "./components/Registeration"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Userinterface from "./components/Userinterface";
import { useAuthContex } from "./components/contex/AuthContex";

const App = () => {
  const {authUser}=useAuthContex();
  return (
      <div>
         <Routes>
          <Route path="/" element={<Userinterface/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={authUser ? <Link to="/"/> : <Registeration/>}/>
      </Routes>

      </div>
      
     
  
  )
}

export default App
