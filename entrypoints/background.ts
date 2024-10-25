export default defineBackground({
  main() {
    // match pattern
    // const urlPattern = '*://*/backend-anon/conversation*'
    const urlPattern = '*://*/backend-*/conversation*'

    // listen to web requests
    chrome.webRequest.onBeforeRequest.addListener(
      (details) => {
        console.log('Request started:', details);
        return { cancel: false }
      },
      { urls: [urlPattern] },
      ['requestBody']
    )

    // Listen to completed response
    chrome.webRequest.onCompleted.addListener(
      (details) => {
        console.log('Response completed:', details);

        // send msg to content-script
        if (details.tabId > 0) {
          chrome.tabs.sendMessage(details.tabId, {
            type: "API_RESPONSE",
            data: {
              url: details.url,
              statusCode: details.statusCode,
              timeStamp: details.timeStamp,
              method: details.method
            }
          })
        }
      },
      { urls: [urlPattern] }
    )

    // Listen to errors
    chrome.webRequest.onErrorOccurred.addListener(
      (details) => {
        console.error('Request failed:', details)

        if (details.tabId > 0) {
          chrome.tabs.sendMessage(details.tabId, {
            type: 'API_ERROR',
            data: {
              url: details.url,
              error: details.error,
              timeStamp: details.timeStamp
            }
          })
        }
      },
      { urls: [urlPattern] }
    )

  },
});
