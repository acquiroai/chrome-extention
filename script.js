chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let urlone = tabs[0].url;
    const paraElement = document.getElementById('para');
    paraElement.innerHTML = urlone;
});