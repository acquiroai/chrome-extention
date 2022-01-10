chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  let urlone = tabs[0].url;
  const paraElement = document.getElementById('para');
  paraElement.innerHTML = urlone;

  fetch('http://127.0.0.1:5000/phase1',{ method : 'post', body : urlone}).then(r => r.json()).then(result => {
    paraElement.innerHTML = result;
  })
})
