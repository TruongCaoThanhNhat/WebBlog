import { useState, useEffect } from "react";

import "./chatbot.scss";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import HeaderChat from "./HeaderChat";
import MessagesBot from "./MessagesBot";
import InputChat from "./InputChat";
import API from "./ChatBotAPI";
import runChat from "@/config/gemini";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadWelcomeMessage() {
      setMessages([
        <BotMessage
          key="0"
          fetchMessage={async () => await API.GetChatbotResponse("hi")}
        />,
      ]);
    }
    loadWelcomeMessage();
  }, [])

  const send = async (text) => {
    const reply = await runChat(text);
    // console.log("reply", reply)
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => reply }
      />
    );
    setMessages(newMessages);
  };
  // await runChat("java là gi");
  return (
    <div className="chatbot">
      <HeaderChat />
      <MessagesBot messages={messages} />
      <InputChat onSend={send} />
    </div>
  );
};

export default Chatbot;
