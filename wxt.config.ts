import { defineConfig } from "wxt";
import targets from "./entrypoints/content/targets";

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: "chrome",
    modules: ["@wxt-dev/module-react"],
    manifest: {
        name: "Better GPT",
        permissions: ["webRequest"],
        host_permissions: targets.map((target) => target.url),
        version: "2.0",
        version_name: "v2.0",
        author: { email: "boussakssoudev@gmail.com" },
        description:
            "BetterGPT enhances the ChatGPT interface by providing improved message organization and navigation features through a custom sidebar",
    },
});
