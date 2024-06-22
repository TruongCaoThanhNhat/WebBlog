import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { _id, userName } = conversation;
  console.log("conversation",conversation);

  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
      <div
        className={`user-card ${isSelected ? "active" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={
                conversation.avatar ||
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
