let notificationBtn = document.getElementById("notification-btn");

notificationBtn.style.cursor = "pointer"

window.onload = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
      console.log(response.farewell);
    });
  });
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addYellowDot,
  });
}

notificationBtn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addYellowDot,
    });
})

function addYellowDot() {
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

              div.onclick = (e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  console.log(queries[i])
              }
              
              queries[i].appendChild(div)
          }
      }
     }