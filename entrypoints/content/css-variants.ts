export const messageStyles: Record<string, string> = {
    chatgpt: "hover:bg-neutral-500/20 bg-token-sidebar-surface-secondary",
    claude: "hover:bg-bg-500 bg-bg-400",
    gemini: "dark:hover:bg-[#1f3760] dark:hover:text-[#d3e3fd] dark:bg-[#a2a9b0]/5 dark:text-[#e3e3e3]",
    // gemini: "dark:hover:bg-[#1f3760] dark:bg-[#a2a9b0]/5 dark:text-[#e3e3e3] hover:bg-[#d3e3fd] hover:text-[#0842a0] bg-[#f0f4f9] text-[#575b5f] ",
};

export const backgroundStyles: Record<string, string> = {
    chatgpt: "bg-token-sidebar-surface-primary",
    claude: "from-bg-300/70 to-bg-400/70 bg-gradient-to-b backdrop-blur",
    gemini: "dark:bg-[#282a2c] dark:text-[#a2a9b0] bg-[#f0f4f9] text-[#575b5f]",
};