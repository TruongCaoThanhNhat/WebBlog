import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SearchInput />
      <div className="divider"></div>
      <Conversations />
    </div>
  );
};

export default Sidebar;
