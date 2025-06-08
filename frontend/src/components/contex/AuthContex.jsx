import { useState, createContext, useContext } from "react";


export const AuthContex=createContext(); // firstly here you have created the contex

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContex=()=>{
    return useContext(AuthContex);
}

// eslint-disable-next-line react/prop-types
export const AuthContexProvider=({children})=>{
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem("chat-User");
        return user ? JSON.parse(user) : null; 
      });
    return <AuthContex.Provider value={{authUser,setAuthUser}}>
     {children}
    </AuthContex.Provider>;
}