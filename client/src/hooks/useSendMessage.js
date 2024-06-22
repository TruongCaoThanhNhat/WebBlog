import { apiSendMessage } from "@/api/api";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { toast } from "react-toastify";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
//   console.log("res", selectedConversation);
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await apiSendMessage(selectedConversation._id, message);
      console.log("res", res.data.message);

      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
