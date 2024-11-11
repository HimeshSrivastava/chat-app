// import { useEffect, useRef, useState } from "react";
// import LogoutButton from "../LogoutButton";
// import { useAuthContex } from "../contex/AuthContex";
// import axios from "axios";
// import SidebarUsers from "./SidebarUsers";
// // import useConversation from "../zustand/useConversation";
// import { BACKEND_URL } from "../constant/Api";

// const Sidebar = () => {
//   const { authUser } = useAuthContex();
//   const [users, setUsers] = useState([]);
//   const searchref=useRef(null);
//   // const {selectedConversation,setSelectedConversation}=useConversation();

 
  
//   useEffect(() => {
//     const getAllUsers = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("chat-User"));

//         if (!user || !user.token) {
//           console.error("No token found");
//           return;
//         }

//         const token = user.token;

       
//         const res = await axios.get(`${BACKEND_URL}/api/user`, {
//           headers: {
//             Authorization: `Bearer ${token}`, 
//           },
//         });

//         const result = res.data;

//         if (result.error) {
//           throw new Error("Error in fetching users");
//         }

//         setUsers(result);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     getAllUsers();
//   }, [authUser]);

//   return (
//     <div className="flex flex-col w-full max-w-xs h-screen bg-slate-400 p-4 space-y-4">
//       <div className="flex items-center bg-white p-2 rounded-lg shadow">
//         <input  ref={searchref}
//           className="flex-1 px-2 py-1 text-sm border-none outline-none"
//           placeholder="Search"
//         />
//         <img 
//           className="w-6 h-6 ml-2"
//           src="https://icons.iconarchive.com/icons/mazenl77/I-like-buttons-3a/512/Perspective-Button-Search-icon.png"
//           alt="Search Icon"
//         />
//       </div>

     
//       <div className="flex-1 overflow-y-auto">
//         {users.length > 0 ? (
//           users.map((user) => (
//             <SidebarUsers key={user._id} name={user.name} user={user} />
//           ))
//         ) : (
//           <p>No users found.</p>
//         )}
//       </div>

//       <div>
//         <LogoutButton />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { useEffect, useRef, useState } from "react";
import LogoutButton from "../LogoutButton";

import axios from "axios";
import SidebarUsers from "./SidebarUsers";
import { BACKEND_URL } from "../constant/Api";
import { useAuthContex } from "../contex/AuthContex";

// const Sidebar = () => {
//   const { authUser } = useAuthContex();
//   const [users, setUsers] = useState([]);
//   const searchRef = useRef(null);

//   async function req(postdata, endpoint, method = "POST", token = null) {
//     const instance = axios.create();
  
//     const options = {
//       url: endpoint,
//       method: method,
//       credentials: "include",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       ...(method !== "GET" && method !== "DELETE" && { data: postdata }),
//     };
  
  
//     try {
//       const response = await instance(options);
//       return response.data;
//     } catch (e) {
//       console.log("e:", e);
//       throw e;
//     }
//   }
  
//   useEffect(() => {
//     const getAllUsers = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("chat-User"));
//         if (!user || !user.token) {
//           console.error("No token found");
//           return;
//         }
  
//         const token = user.token;
//         const result = await req(null, `${BACKEND_URL}/api/user`, "GET", token);
  
//         console.log("API Response:", result);
  
//         if (!Array.isArray(result)) {
//           throw new Error("Unexpected response format");
//         }
  
//         setUsers(result);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setUsers([]);
//       }
//     };
  
//     getAllUsers();
//   }, [authUser]);
const Sidebar = () => {
  const { authUser } = useAuthContex();
  const [users, setUsers] = useState([]);
  const searchRef = useRef(null);

  async function req(postdata, endpoint, method = "POST", token = null) {
    const instance = axios.create();

    const options = {
      url: endpoint,
      method: method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(method !== "GET" && method !== "DELETE" && { data: postdata }),
    };

    try {
      const response = await instance(options);
      return response.data;
    } catch (e) {
      console.log("Error:", e);
      throw e;
    }
  }

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("chat-User"));
        if (!user || !user.token) {
          console.error("No token found");
          return;
        }

        const token = user.token;

        // Use the relative path '/api/user' since the proxy is set up
        const result = await req(null, '/api/user', "GET", token);

        console.log(result);

        if (Array.isArray(result)) {
          setUsers(result);
        } else if (result && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          throw new Error("Unexpected response format");
        }
        console.log(setUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    getAllUsers();
  }, [authUser]);

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem("chat-User"));
  //       if (!user || !user.token) {
  //         console.error("No token found");
  //         return;
  //       }
    
  //       const token = user.token;
  //       const res = await axios.get(`${BACKEND_URL}/api/user`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
    
  //       const result = res.data;
        
  //       console.log("API Response:", result);
    
  //       // Ensure result is an array
  //       if (!Array.isArray(result)) {
  //         throw new Error("Unexpected response format");
  //       }
    
  //       setUsers(result);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       // Optionally, you can set users to an empty array on error
  //       setUsers([]);
  //     }
  //   };
    
  //   getAllUsers();
  // }, [authUser]);

  return (
    <div className="flex flex-col w-full max-w-xs h-screen bg-slate-400 p-4 space-y-4">
      <div className="flex items-center bg-white p-2 rounded-lg shadow">
        <input
          ref={searchRef}
          className="flex-1 px-2 py-1 text-sm border-none outline-none"
          placeholder="Search"
        />
        <img
          className="w-6 h-6 ml-2"
          src="https://icons.iconarchive.com/icons/mazenl77/I-like-buttons-3a/512/Perspective-Button-Search-icon.png"
          alt="Search Icon"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.length > 0 ? (
          users.map((user) => (
            <SidebarUsers key={user._id} name={user.name} user={user} />
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
