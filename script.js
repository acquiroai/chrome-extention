let sendURL;

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

async function mainFunc() {
  sendURL = await getCurrentTab();
  const paraElement = document.getElementById('para');
  paraElement.innerHTML = sendURL;
  sendURL = btoa(sendURL)
  sendURL = 'http://127.0.0.1:5000/' + sendURL

  let ans = await fetch(sendURL)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log(data)
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
}

mainFunc()
