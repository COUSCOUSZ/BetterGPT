import { APIResponse } from "../types/Api";
import Header from "./Header";
import Messages from "./Messages";

interface Props {
  sidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebar, toggleSidebar }: Props) => {
  return (
    <div className={`absolute right-0 top-0 ${sidebar ? "w-[20rem]" : "w-0"} h-screen overflow-y-auto bg-token-sidebar-surface-primary`}>
      <Header />
      <Messages /> 
    </div>
  )
}
export default Sidebar