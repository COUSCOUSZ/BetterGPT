import targets from "@/targets"

export default defineBackground({
  main() {
    // match pattern
    const urlPatterns = targets.flatMap((target)=>target.urlPatterns);

    // listen to web requests - isn't necessary
    // just logging and not blocking/modifying the request ({ cancel: false })
    // chrome.webRequest.onBeforeRequest.addListener(
    //   (details) => {
    //     console.log('Request started:', details);
    //     return { cancel: false }
    //   },
    //   { urls: [urlPattern] },
    //   ['requestBody']
    // )

    // Listen to completed response
    chrome.webRequest.onCompleted.addListener(
      (details) => {
        console.log('Response completed:', details);
        // check if the request came from a regular browser tab
        if (details.tabId > 0) {
          // Send msg to content-script
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
      { urls: urlPatterns }
    )
    
    // Listen to errors
    chrome.webRequest.onErrorOccurred.addListener(
      (details) => {
        console.error('Request failed:', details)
        // check if the request came from a regular browser tab
        if (details.tabId > 0) {
          // Send msg to content-script
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
      { urls: urlPatterns }
    )

  },
});
