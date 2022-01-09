chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  let urlone = tabs[0].url;
  const paraElement = document.getElementById('para');
  paraElement.innerHTML = urlone;

  fetch('http://127.0.0.1:5000/api?skills=Machine%20Learning').then(r => r.text()).then(result => {
    paraElement.innerHTML = result;
  })
})
