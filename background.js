function openTab(){
    chrome.tabs.create({"url":"http://127.0.0.1:3000", "active":false})
}

async function getTabId() {
    tabs = await chrome.tabs.query({ "currentWindow": true })
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].title === "Hexal Energy") {
            return tabs[i].id
        }
    }
}

export async function getEmail() {
    function getTitle() {
        return document.getElementById("username").innerHTML;
    }
    const tabIdPass = await getTabId();
    chrome.scripting.executeScript(
        {
            target: { tabId: tabIdPass, allFrames: true },
            func: getTitle,
        },
        (injectionResults) => {
            for (const frameResult of injectionResults)
            chrome.storage.local.set({"email": frameResult.result});
        });
}
