import { apiGetUserById } from "@/api/api";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const userId = useSelector((state) => state.user.userInfo.id);
  const [newConversation, setNewConversation] = useState({});
    const { _id, userName,avatar } = newConversation;
  const { members } = conversation;
  const otherMembers = members.filter((member) => member !== userId);
  // Giả sử bạn chỉ muốn lấy ID của thành viên còn lại
  // const otherMemberId = otherMembers.length > 0 ? otherMembers[0].id : null;
  console.log("otherMembers", otherMembers);
  console.log("member", members);
  console.log("conversation", conversation);
  console.log("newConversation", newConversation);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiGetUserById(otherMembers[0]);
        console.log("fetch", data.data.user);
        setNewConversation(data.data.user);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchUser();
  }, []);
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === newConversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(newConversation._id);
  return (
    <>
      <div
        className={`user-card ${isSelected ? "active" : ""}`}
        onClick={() => setSelectedConversation(newConversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                avatar ||
                "https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png"
              }
              alt="user avatar"
            />
          </div>
        </div>
        <div className="user-details">
          <div className="user-info">
            <p className="user-name">{userName}</p>
            <span className="user-emoji">{emoji}</span>
          </div>
        </div>
      </div>
      {lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;
