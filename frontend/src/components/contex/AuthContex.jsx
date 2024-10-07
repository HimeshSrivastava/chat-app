import { useState, createContext, useContext } from "react";


export const AuthContex=createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContex=()=>{
    return useContext(AuthContex);
}

// eslint-disable-next-line react/prop-types
export const AuthContexProvider=({children})=>{
    const [authUser, setAuthUser] = useState(() => {
        const user = localStorage.getItem("chat-User");
    
        console.log("Stored data in localStorage (before parsing):", user);
        return user ? JSON.parse(user) : null; // Default to null if no user data exists
      });
    return <AuthContex.Provider value={{authUser,setAuthUser}}>
     {children}
    </AuthContex.Provider>;
}