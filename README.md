<div align="center">
  <img src="assets/icon.png" alt="BetterGPT Logo" width="64" />
  <h1>BetterGPT</h1>
  <p>A Chrome extension that enhances ChatGPT's UX</p>
  <img src="md/Preview.png" style="border-radius:16px" >
</div>


## NOTE : I unpublished the extension from the Chrome web store, to find out why, check out this [Issue](https://github.com/COUSCOUSZ/BetterGPT/issues/5)


- Feel free to contribute. 

- BetterGPT is a chrome extension that aims to UX features to chatGPT.

- The main feature is a message list that allows quick scrolling between messages in the current chat, eliminating the need for manual scrolling.

- Other features are planned : Bookmarking messages & chats , maybe support for other chatbots like claude , gemini ... Check `todo.md`

- I'm using [wxt](https://wxt.dev/) library.

## Features

- 📜 Message List: Quick navigation through chat messages without manual scrolling
- 🎯 Instant Scroll: Jump to any message with a single click
- 🔃 Scroll indicator (In progress).


## Contributing

Contributions are welcome! Feel free to:
- Report bugs & Issues
- Suggest features
- Submit pull requests

## Run the project 

- Run the command `npm install` to download & install the dependencies.
- Run the command `npm run dev` to start the development server with hot reload.
### Building the project
- Run the command `npm run build` to generate the build in the `.output/chrome-mv3` folder.
- Open Chrome or Edge and navigate to `chrome://extensions`. Make sure to turn on the developer mode switch.
	<table>
	<tr>
		<th>Chrome top right</th>
		<th>Edge on the right sidebar</th>
	</tr>
	<tr>
		<td><img src="md/devmode%20chrome.png" alt="Chrome developer mode switch" /></td>
		<td><img src="md/devmode%20edge.png" alt="Edge developer mode switch" /></td>
	</tr>
	</table>

- Drag the `chrome-mv3` folder into the Extensions Dashboard to install it or click load unpacked button. And done! You can see the messages on the togglable sidebar.
<img src="md/Preview.png" >
