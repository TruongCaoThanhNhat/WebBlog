import MessageContainer from "@/components/messages/MessageContainer";
import Sidebar from "@/components/sidebarMessage/Sidebar";
import "./message.scss";

const MessagePage = () => {
    return (
      <div className="message__container">
        <Sidebar />
        <MessageContainer />
      </div>
    );
};

export default MessagePage;

