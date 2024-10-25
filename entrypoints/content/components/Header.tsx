import { X } from "lucide-react"

const Header = () => {
    return (
        <div className="flex gap-1 justify-between items-center p-4 border-b text-token-text-secondary border-neutral-300 dark:border-neutral-800"> 
            <span className="font-medium">Message overview</span>
            <X className="" />
        </div> 
    )
}
export default Header