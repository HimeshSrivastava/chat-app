
import { create } from 'zustand'

const useConversation = create((set) => ({
      seletedConversation:null,
      // always check splelling mistake also after all other approach are correct
      setSelectedConversation: (conversation)=>set({ selectedConversation: conversation}),
      messages:[],
      setMessages:(messages)=>set({messages}),

}));

export default useConversation;