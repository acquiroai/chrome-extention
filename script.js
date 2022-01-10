chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let urlone = tabs[0].url;
    const paraElement = document.getElementById('para');
    paraElement.innerHTML = urlone;
    urlone = 'http://127.0.0.1:5000/phase1/' + urlone
  
    fetch(urlone).then((response) => { return response.json(); })
  })
