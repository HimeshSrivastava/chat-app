
import { create } from 'zustand'

const useConversation = create((set) => ({
      seletedConversation:null,
      setSeletedConversation: (seletedConversation)=>set({seletedConversation}),
      messages:[],
      setMessages:(messages)=>set({messages}),

}));

export default useConversation;