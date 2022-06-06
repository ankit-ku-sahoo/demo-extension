chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender)
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request)

    // if(request.id_clicked) {
    //   localStorage['id_clicked'] = request.id_clicked
    // }
    // if (request.greeting === "hello")

    
      // chrome.runtime.sendMessage({message: 'Hello'})  // sends message to popup.js
      sendResponse({farewell: "goodbye"});
  }
);