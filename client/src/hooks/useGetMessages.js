import { apiGetMessage } from "@/api/api";
import useConversation from "@/zustand/useConversation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await apiGetMessage(selectedConversation._id);
				// console.log("res", res.messages);
				setMessages(res.messages);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;
