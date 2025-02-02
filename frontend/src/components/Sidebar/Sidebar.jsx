import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constant/Api";
import SidebarUsers from "./SidebarUsers";
import LogoutButton from "../LogoutButton";
import debounce from "lodash.debounce";
import { useAuthContex } from "../contex/AuthContex";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

        const result = await req(null, `${BACKEND_URL}/api/user`, "GET", token);

        if (Array.isArray(result)) {
          setUsers(result);
          setFilteredUsers(result); 
        } else if (result && Array.isArray(result.data)) {
          setUsers(result.data);
          setFilteredUsers(result.data); 
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]); // Reset filtered users in case of error
      }
    };

    getAllUsers();
  }, []);
  
  const debouncedSearch = debounce((term) => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, 300); 

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setFilteredUsers(users);
    }

    return () => {
      debouncedSearch.cancel(); 
    };
  }, [searchTerm, users]);

  return (
    <div className="flex flex-col m-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 bg-slate-400 p-4 space-y-4">
      <div className="flex items-center bg-white p-2 rounded-lg shadow">
        <input
          className="flex-1 px-2 py-1 text-sm border-none outline-none"
          placeholder="Search"
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
        />
        <img
          className="w-6 h-6 ml-2"
          src="https://icons.iconarchive.com/icons/mazenl77/I-like-buttons-3a/512/Perspective-Button-Search-icon.png"
          alt="Search Icon"
        />
      </div>

      <div className="flex-1 overflow-y-auto h-screen">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
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
