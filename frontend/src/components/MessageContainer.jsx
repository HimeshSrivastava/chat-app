

const MessageContainer = () => {
    const notstate=false;
  return (
      <div className="flex flex-col h-screen p-4 bg-gray-100">
    
      {notstate ? <NotSelected/> : (
          <>
            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow">
              {/* Example Messages */}
              <div className="self-start max-w-xs px-4 py-2 bg-gray-200 rounded-lg">
                Hello! How can I help you today?
              </div>
              <div className="self-end max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg">
                I have a question about your services.
              </div>
              {/* Add more message bubbles here */}
            </div>
      
            {/* Input Area */}
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Send
              </button>
            </div>

        </>
    )}
    </div>
 
);
};

export default MessageContainer;

const NotSelected =()=>{
    return(
        // <div className="max-w-full max-h-full bg-slate-400 text-black font-bold m-auto">
            <div className="flex flex-col w-[300px] max-w-xs h-screen bg-slate-300 p-4 space-y-4">
             <p>Welcome new user</p>
            </div>
    )
}