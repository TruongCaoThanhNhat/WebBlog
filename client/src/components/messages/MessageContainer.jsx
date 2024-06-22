import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useEffect } from "react";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
	return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl text-gray-500">No chat</h1>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.userName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
