const data = document.body

let tabID = 0

const div = document.createElement('div')
div.style.position = 'absolute'
div.style.backgroundColor = 'yellow'

div.innerHTML = 'Hello'
div.setAttribute('id', 'random-div2')
div.onclick = () => {
  chrome.runtime.sendMessage({id_clicked: div.id}, function(response) { // sends message to background.js
    console.log(div.parentNode.nodeName, div.id, window);
    chrome.runtime.sendMessage({message: 'Hello'})  // sends message to popup.js
  });
}

// document.appendChild(div)

// chrome.runtime.sendMessage({doc: document}, function(response) {  // sends message to background.js
//   console.log(response.farewell);
// });


// chrome.runtime.sendMessage({action: 'printInExtensionConsole'}, function(response) {
//   console.log(response);
// });


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) { // listens message from popup.js
  const { action, projectId, query, tabId } = request;
  if(action == 'printInConsole') {
    document.body.appendChild(div)
    tabID = tabId
    console.log('Printing due to request from popup.js : ', tabId)
  }
  else if(action == 'populateBubbles') {
    populateBubbles()
  }
  // else if(action == 'unPopulateBubbles') {
  //   unPopulateBubbles()
  // }
  sendResponse({ message: 'Printed on console successfully'})
})

// populateBubbles()


function populateBubbles () {
  console.log(document.body)
      const queries = document.body.querySelectorAll('*')

    for(let i=0;i<queries.length;i++){
        // console.log(getEventListners(queries[i]))
        if(typeof(queries[i].onclick)==='function' || typeof(queries[i].onchange)==='function' || queries[i].localName === 'a' || queries[i].localName === 'button'
        )
        {
            const div = document.createElement('div')
            div.style.position = 'absolute'
            div.style.backgroundColor = 'yellow'
            div.style.width = '8px'
            div.style.height = '8px'
            div.style.borderRadius = '10px'

            div.setAttribute('class', 'bubbles')

            div.onclick = (e) => {
              e.stopPropagation()
              e.preventDefault()
              chrome.runtime.sendMessage({classList: queries[i].classList})
              console.log(queries[i])
          }
            
            queries[i].appendChild(div)
        }
    }
   }

function unPopulateBubbles () {
  const bubbles = document.getElementsByClassName('bubbles')

  for(let i=0;i<bubbles.length;i++){
    bubbles[i].remove()
  }
}