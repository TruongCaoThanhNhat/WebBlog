import useGetConversations from "@/hooks/useGetConversations";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";
const SearchInput = () => {
	const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };
	return (
    <form className="search-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="search-input__input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search-input__button">
        <IoSearchSharp className="search-input__icon" />
      </button>
    </form>
  );
};
export default SearchInput;