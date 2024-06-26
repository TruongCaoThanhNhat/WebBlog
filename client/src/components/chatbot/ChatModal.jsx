import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import Chatbot from "./Chatbot";
import "./chatbot.scss";

const ChatModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!showModal);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="chat__modal" onClick={handleShow}>
      <div className="chat__icon">
        <FaMessage />
      </div>
      {showModal && (
        <div className="chat__content" onClick={stopPropagation}>
          <Chatbot />
        </div>
      )}
    </div>
  );
};

export default ChatModal;
