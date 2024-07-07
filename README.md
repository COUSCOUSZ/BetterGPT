# BetterGPT (WiP) 

- BetterGPT is a chrome extension that aims to add quality of life features to chatGPT.

- The main one is the message list of current chat to scroll fast between messages without doing it manually.

- Other features are planned : Bookmarking messages & chats , maybe support for other chatbots like claude , gemini ...


## Run the project 

- The extension is built using [crxjs.dev](https://crxjs.dev/vite-plugin).
- Run the the command `npm run dev` , 
	> it will run generate the build which is in the `dist` folder. 
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

- Drag the`dist` folder into the Extensions Dashboard to install it or click load unpacked And done! You can see the messages on the togglable sidebar **(Scroll to chat message feature is still WiP)**
- <img src="md/preview1.png" >