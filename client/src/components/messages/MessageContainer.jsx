import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import "./message.scss"
import { useEffect } from "react";
import Messages from "./Messages";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
	return (
    <div className="message__content">
      {!selectedConversation ? (
        <div className="">
          <h1 className="">No chat</h1>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="label-text">
            <span className="">To:</span>{" "}
            <span className="">{selectedConversation.userName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
