<img src="assets/icon.png" alt="Chrome developer mode switch" width="64" />

<img src="md/Preview.png" >

 ## BetterGPT (WiP)
 
- Feel free to contribute. 

- BetterGPT is a chrome extension that aims to add quality of life features to chatGPT.

- The main one is the message list of current chat to scroll fast between messages without doing it manually.

- Other features are planned : Bookmarking messages & chats , maybe support for other chatbots like claude , gemini ...

- I'm using [wxt](https://wxt.dev/) library.

## Progress & features

- ✔️ Load messages
- ✔️ Scroll into message added.
- 🔃 Scroll indicator (In progress).

## Run the project 

- Run the the command `npm install` to download & install the dependencies .
- Run the the command `npm run build` , 
	> it will run generate the build which is `chrome-mv3` in the `.output` folder. 
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

- Drag the`chrome-mv3` folder into the Extensions Dashboard to install it or click load unpacked button And done! You can see the messages on the togglable sidebar.
- <img src="md/Preview.png" >
