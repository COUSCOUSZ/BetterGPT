import { X } from "lucide-react"
import { Target } from "../targets";

interface Props {
    toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: Props) => {
    return (
        <div className="flex gap-1 justify-between items-center px-5 py-3  border-b text-token-text-secondary border-[#ffffff1a]">
            <span className="font-medium">Message overview</span>
            <div className="cursor-pointer hover:bg-token-main-surface-secondary p-1 rounded" >
                <X onClick={toggleSidebar} className="w-6" />
            </div>
        </div>
    )
}
export default Header