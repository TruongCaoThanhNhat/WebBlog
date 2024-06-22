import {  apiGetUserMessage } from "@/api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// const res = await apiGetAuthor("thanhnhat1")
				const res = await apiGetUserMessage();
				console.log("res", res);
				if (res.error) {
					throw new Error(res.error);
				}
				setConversations(res.data.users);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
