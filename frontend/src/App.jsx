import Login from "./components/Login"
import Registeration from "./components/Registeration"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  return (
      <Router>
      <div className='w-full max-h-max bg-slate-500 pb-4'>
            <ul className='flex text-black gap-7 font-bold text-xl md:text-2xl p-4'>
               
                <li>
                <Link to="/">Login</Link>

                </li>
                <li>

                <Link to="/registeration">Registration</Link>
                </li>
            </ul>
            </div>

         <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signin" element={<Login/>}/>
          <Route path="/registeration" element={<Registeration/>}/>
      </Routes>
      </Router>
     
  
  )
}

export default App
