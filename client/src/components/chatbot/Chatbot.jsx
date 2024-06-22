import { useState, useEffect } from "react";

import "./chatbot.scss";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import HeaderChat from "./HeaderChat";
import MessagesBot from "./MessagesBot";
import InputChat from "./InputChat";
import API from "./ChatBotAPI";

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
  }, []);

  const processMessageChatGPT = async (message) => {
    console.log("Message received: ", message);
    let apiMessage = message.map((mess) => {
      let role = "";
      if (message.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: mess.message,
      };
    });

    const systemMessage = {
      role: "system",
      content: "Executing the command...",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo-16k",
      messages: [systemMessage, ...apiMessage],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          "sk-proj-tQrczjteugB44w6aIVOuT3BlbkFJXFn4A1q763lLv0wj74ka",
        // Authorization: "Bearer " + import.meta.env.API_KEY_GPT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const send = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await processMessageChatGPT(newMessages)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <HeaderChat />
      <MessagesBot messages={messages} />
      <InputChat onSend={send} />
    </div>
  );
};

export default Chatbot;
