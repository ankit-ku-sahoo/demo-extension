let notificationBtn = document.getElementById("notification-btn");
let bubbleClicked = document.getElementById("bubble-clicked")

notificationBtn.style.cursor = "pointer"

window.onload = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { // sending message/order to content.js
    action: 'populateBubbles', tabId: tab.id
  }, function (response) {
    console.log(response.message)
  })
  
  // chrome.scripting.executeScript({
  //     target: { tabId: tab.id },
  //     function: addYellowDot,
  // });
}

window.onbeforeunload = () => {
  chrome.tabs.sendMessage(tab.id, { // sending message/order to content.js
    action: 'unPopulateBubbles', tabId: tab.id
  }, function (response) {
    console.log(response.message)
  })
}

// notificationBtn.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     // chrome.tabs.sendMessage(tab.id, { // sending message/order to content.js
//     //   action: 'printInConsole', tabId: tab.id
//     // }, function (response) {
//     //   console.log(response.message)
//     // })
// })

// function addYellowDot() {
//     console.log(document.body)
//         const queries = document.body.querySelectorAll('*')

//       for(let i=0;i<queries.length;i++){
//           // console.log(getEventListners(queries[i]))
//           if(typeof(queries[i].onclick)==='function' || typeof(queries[i].onchange)==='function' || queries[i].localName === 'a' || queries[i].localName === 'button'
//           )
//           {
//               const div = document.createElement('div')
//               div.style.position = 'absolute'
//               div.style.backgroundColor = 'yellow'
//               div.style.width = '8px'
//               div.style.height = '8px'
//               div.style.borderRadius = '10px'

//               div.onclick = (e) => {
//                 e.stopPropagation()
//                 e.preventDefault()
//                 // chrome.runtime.sendMessage({message: queries[i].classList})
//                 console.log(queries[i])
//             }
              
//               queries[i].appendChild(div)
//           }
//       }
//      }




chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { // listens message from content.js/background.js
  // const { action, projectId, query } = request;
  // if(action == 'printInExtensionConsole') {
  //   console.log('Printing due to request from popup.js : ')
  // }
  console.log(request.classList)
  bubbleClicked.innerHTML = request.classList[0]
})

// chrome.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
//   console.log(message)
// });