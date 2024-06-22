import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const user = useSelector((state) => state.user);
  const { selectedConversation } = useConversation();
  console.log("message", selectedConversation);
  const fromMe = message.senderId === user.userInfo.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-start" : "chat-end";
  const profilePic = fromMe
    ? user.userInfo.avatar
    : selectedConversation?.avatar;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <>
      {chatClassName === "chat-start" ? (
        <div className={`chat ${chatClassName}`}>
          <div className="chat-box">
            <div className={`chat-bubble ${bubbleBgColor} pb-2`}>
              {message.message}
            </div>
            <div className="chat-avatar">
              <img alt="avatar user" src={profilePic} />
            </div>
          </div>
          <div className="chat-time">{formattedTime}</div>
        </div>
      ) : (
        <div className={`chat ${chatClassName}`}>
          <div className="chat-box">
            <div className="chat-avatar">
              <img alt="avatar user" src={profilePic} />
            </div>
            <div className={`chat-bubble ${bubbleBgColor} pb-2`}>
              {message.message}
            </div>
          </div>
          <div className="chat-time">{formattedTime}</div>
        </div>
      )}
    </>
  );
};
export default Message;
