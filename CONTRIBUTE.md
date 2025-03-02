# Contributing to BetterGPT

Thank you for your interest in contributing to BetterGPT! This guide will help you get started with the development process and explain how to extend the extension to support additional websites.

## Getting Started

### Setting Up Development Environment

1. Fork the repository on GitHub
2. Clone your fork: `git clone https://github.com/COUSCOUSZ/BetterGPT.git`
3. Install dependencies: `npm install`
4. Build the extension: `npm run build`
5. Load the unpacked extension in your browser:
   - Chrome/Edge: Navigate to `chrome://extensions/`, enable "Developer mode", and click "Load unpacked", then select the `.output/chrome-mv3` directory

## Project Structure

- `entrypoints/background.ts` - Background scripts that monitor API calls
- `entrypoints/content/` - Content scripts injected into webpages
  - `components/` - React components for the sidebar UI
  - `targets.json` - Configuration for supported websites
  - `css-variants.ts` - Styling configurations for each supported site

## Adding Support for a New Website

### 1. Finding URL Patterns for API Endpoints

URL patterns are used to monitor API requests to detect new messages. To find these:

1. Open the AI chat website in Chrome/Edge
2. Open DevTools (F12 or Right-click > Inspect)
3. Go to the Network tab
4. Filter for XHR/Fetch requests
5. Start a new conversation and observe network requests
6. Look for API calls that return chat messages or conversation data
7. Note the URL pattern for these requests

Example patterns:
- ChatGPT: `*://*/backend-*/conversation*` 
- Claude: `*://claude.ai/api*`

URL pattern tips:
- Use `*` for wildcards to match different subdomains or paths
- Focus on endpoints that are called when new messages appear

### 2. Finding Message Container CSS Selectors

The CSS selector helps the extension locate message elements on the page:

1. Open an existing chat or start a new one of the desired website
2. Open DevTools (F12) on the chat website
3. Use the Element Selector tool (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-left"><path d="M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"/><path d="m3 3 9 9"/><path d="M3 9V3h6"/></svg> icon)  to click on a message
4. Identify the container element that holds a certain message
5. Right-click on the element > Copy > Copy selector
6. Modify the copied selector as follows:
   1. Remove the pseudo class `nth:child` to select all messages
   2. Replace `\` with `\\` 
7. Test your selector with `document.querySelectorAll("your-selector")` in the console first.
8. Ensure it selects all the messages

Selector tips:
- Prefer class-based selectors over deeply nested ones
- Avoid selectors that might change between sessions
- Test with different UI states (dark/light mode, different window sizes)

Example:
- The copied selector might look like this: `div.composer-parent.flex.flex-col.focus-visible\:outline-0.h-full > div.flex-1.overflow-hidden.\@container\/thread.translate-y-\[2rem\].-mt-\[2rem\].pb-\[1\.5rem\] > div > div > div > article:nth-child(54) > div > div > div > div > div > div > div > div`
- Here we are going to replace `article:nth-child(54)` with `article` to select every message
- we will replace every `\` with `\\`
- at the end we will get something like `div.composer-parent.flex.flex-col.focus-visible\\:outline-0.h-full > div.flex-1.overflow-hidden.\\@container\\/thread.translate-y-\\[2rem\\].-mt-\\[2rem\\].pb-\\[1\\.5rem\\] > div > div > div > article > div > div > div > div > div > div > div > div`


### 3. Styling for the Target Website

Update `entrypoints/content/css-variants.ts` with styles that match the target website:

```typescript
export const messageStyles: Record<string, string> = {
  // Existing styles...
  newsite: "hover:bg-custom-500 bg-custom-400", // Message item background/hover
};

export const backgroundStyles: Record<string, string> = {
  // Existing styles...
  newsite: "bg-custom-primary text-custom-text", // Sidebar background and text
};
```

### Tips for Styling

1. Utilize the website's predefined classes to minimize the need for frequent style updates.
2. If the website uses session-specific classes, consider creating custom styles to ensure consistency.

### 4. Append to the `targets.json` file

Update the `targets.json` file to include the new website's configuration. This file defines the URL patterns and CSS selectors for each supported website.

Example entry for a new website:

```json
{
    "title": "Example",
    "cssKey": "example",
    "url": "https://example.com/*",
    "urlPatterns": [
        "https://*/api-*/conversation*"
    ],
    "selector": "body > div.flex.h-full.w-full.flex-col > div.whitespace-pre-wrap"
}
```

- Ensure that the `cssKey` field is unique and matches the key used in `css-variants.ts`
- The `url` field specifies the website for which the extension will have host permissions, allowing it to monitor and interact with the specified URL patterns.
- The `urlPatterns` field should list all URL patterns that the extension should monitor. 
- The `selector` field should contain the CSS selector for identifying message elements on the page. 

After updating `targets.json`, save the file and proceed to build the project.

### 5. Build the Project

After making the necessary changes to support the new website, you need to build the project to see your changes in action:

1. Run the build command: `npm run build`
2. Reload the unpacked extension in your browser:
    - Chrome/Edge: Navigate to `chrome://extensions/`, click "Reload" under the BetterGPT extension

### 6. Testing Your Changes

Ensure that your changes work as expected by testing the extension on the new website:

1. Open the target website and start a new conversation
2. Verify that the extension correctly identifies and displays messages
3. Check that the styles are applied as intended
4. Test different scenarios (e.g., different message types, UI states)

### 7. Submitting Your Changes

Once you have verified that your changes work correctly, you can submit a pull request:

1. Commit your changes: `git commit -am "Add support for [new website]"`
2. Push to your fork: `git push origin your-branch-name`
3. Open a pull request

Thank you for contributing to BetterGPT! Your efforts help make the extension more versatile and useful for everyone.

