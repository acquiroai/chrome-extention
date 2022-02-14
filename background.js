chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    getURL = chrome.tabs.get(tabId, function (tab) {
        
        getURL = tab.url;

        if (getURL.substring(12, 36) == "simplyhired.co.in/search") { //simplyhired getURL.substring(12,23)
            chrome.action.setIcon({ path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: tabId });
        }

        else if (getURL.substring(12, 35) == "naukri.com/job-listings") {
            chrome.action.setIcon({ path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: tabId });
        }

        else if (getURL.substring(12, 25) == "iimjobs.com/j") {
            chrome.action.setIcon({ path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: tabId });
        }

        else if (getURL.substring(12, 39) == "monsterindia.com/seeker/job") {
            chrome.action.setIcon({ path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: tabId });
            console.log("monster")
        }

        else {
            chrome.action.setIcon({ path: { "16": "icon-disabled16.png", "48": "icon-disabled48.png", "128": "icon-disabled128.png" }, tabId: tabId });
        }
    });
});