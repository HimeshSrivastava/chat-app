import { useEffect, useState } from "react";
import LogoutButton from "../LogoutButton";
import Conversation from "./Conversation";
import { useAuthContex } from "../contex/AuthContex";
import axios from "axios";

const Sidebar = () => {
  const { authUser } = useAuthContex();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
      
        const user = JSON.parse(localStorage.getItem("chat-User"));

        if (!user || !user.token) {
          console.error("No token found");
          return;
        }

        const token = user.token;

       
        const res = await axios.get(`http://localhost:4000/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        const result = res.data;

        if (result.error) {
          throw new Error("Error in fetching users");
        }

        setUsers(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getAllUsers();
  }, [authUser]);

  return (
    <div className="flex flex-col w-full max-w-xs h-screen bg-slate-400 p-4 space-y-4">
      {/* Search Bar */}
      <div className="flex items-center bg-white p-2 rounded-lg shadow">
        <input
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
            <Conversation key={user._id} name={user.name} user={user} />
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
