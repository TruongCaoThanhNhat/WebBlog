import {  apiGetConversations } from "@/api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const useGetConversations = () => {
	const userId = useSelector((state) => state.user.userInfo.id);
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				// const res = await apiGetAuthor("thanhnhat1")
				const res = await apiGetConversations(userId);
				console.log("conversations", res.data);
				if (res.error) {
					throw new Error(res.error);
				}
				setConversations(res.data);
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
