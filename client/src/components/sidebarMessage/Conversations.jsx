import useGetConversations from "@/hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "@/utils/emojis";

const Conversations = () => {
const { loading, conversations } = useGetConversations();

  return (
    <div className="conversation-list">
      {conversations &&
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx}
          />
        ))}
      {loading ? <div className="loading-conversation">Loading...</div> : null}
    </div>
  );
};
export default Conversations;
