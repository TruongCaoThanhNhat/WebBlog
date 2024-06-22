import useSendMessage from "@/hooks/useSendMessage";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage({ message });
    setMessage("");
  };
  return (
    <form className="form__mess" onSubmit={handleSubmit}>
      <div className="input__send">
        <input
          type="text"
          className=""
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn-send d-flex align-items-center justify-content-center">
          {loading ? <div className="loading"></div> : <IoIosSend />}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
