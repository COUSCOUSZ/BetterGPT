import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";

interface Props {
  sidebar: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ sidebar, toggleSidebar }: Props) => {
  return (
    <div className={`${sidebar ? "w-[20rem]" : "w-0"} relative h-screen overflow-y-auto bg-token-sidebar-surface-primary`}>
      <div className="mb-[3.25rem]">
        <Header toggleSidebar={toggleSidebar} />
        <Messages />
      </div>
      <Footer/>
    </div>
  )
}
export default Sidebar