import { useEffect, useRef } from "react";

const MessagesBot = ({ messages }) => {
  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: "end", behavior: "smooth" });
  });
  return (
    <div className="messages">
      {messages}
      <div id={"el"} ref={el} />
    </div>
  );
};

export default MessagesBot;