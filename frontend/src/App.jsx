import Login from "./components/Login"
import Registeration from "./components/Registeration"
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Userinterface from "./components/Userinterface";
import { useAuthContex } from "./components/contex/AuthContex";
import '@fontsource/roboto'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue (default primary color)
    },
    secondary: {
      main: '#dc004e', // Pink
    },
  },
});
const App = () => {
  const {authUser}=useAuthContex();
  return (
    <ThemeProvider theme={theme}>
      <div>
         <Routes>
          <Route path="/" element={authUser ? <Userinterface/> :  <Navigate to="/login"/> }/>
          <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Registeration/>}/>
      </Routes>

      </div>
      
      </ThemeProvider>
  
  )
}

export default App
