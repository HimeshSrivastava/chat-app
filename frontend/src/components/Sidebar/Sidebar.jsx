import LogoutButton from "../LogoutButton";
import Conversation from "./Conversation";

const Sidebar = () => {
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

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        <Conversation />
      </div>

      {/* Logout Button */}
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
