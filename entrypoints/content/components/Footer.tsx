
import Button from "./ui/Button"

const Footer = () => {
    return (
        <div className="fixed bg-token-sidebar-surface-primary w-full bottom-0 flex gap-2 items-center p-2 border-t text-token-text-secondary border-token-border-light">
            <a href="http://boussakssou.com/" target="_blank">
                <Button
                    variant="secondary"
                    size="small"
                    className="flex items-center gap-1 !text-[0.75rem]" 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#9dff04"><path d="M12 2h-1v9H2v1a10 10 0 0 0 17.07 7.07A10 10 0 0 0 12 2z"></path></svg>
                    <div>Made by boussakssou</div>
                </Button>
            </a>
        </div>
    )
}
export default Footer