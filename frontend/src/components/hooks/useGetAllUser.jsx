import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContex } from "../contex/AuthContex";

const useGetAllUser = () => {
  const { authUser } = useAuthContex();
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getAllUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user`);

        const result = res.data;

        if (result.error) {
          throw new Error("Error in conversation");
        }

        setConversation(result);
      } catch (error) {
        console.error(error);
      }
    };

    getAllUser();
  }, [authUser]); 

  return conversation ;
};

export default useGetAllUser;
