import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name:"Better GPT",
    permissions: ["webRequest"],
    host_permissions:["https://chatgpt.com/*"],
    version:"1.0.0",
    version_name:"1.0.0-beta1",
    author:{email:"boussakssoudev@gmail.com"},
    description:'BetterGPT enhances the ChatGPT interface by providing improved message organization and navigation features through a custom sidebar, making conversations more manageable and easier to reference.',
  },
});
