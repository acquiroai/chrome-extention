chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    alert(changeInfo.url);
 }); 
 
 chrome.tabs.onActivated.addListener(function(activeInfo) {
   // how to fetch tab url using activeInfo.tabid
   chrome.tabs.get(activeInfo.tabId, function(tab){
       let getURL = tab.url;
       if (getURL.substring(12,36) == "simplyhired.co.in/search"){ //simplyhired getURL.substring(12,23)
              chrome.action.setIcon({path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: activeInfo.tabId});
       } 

       else if (getURL.substring(12,35) == "naukri.com/job-listings"){
        chrome.action.setIcon({path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: activeInfo.tabId});
    } 

       else if (getURL.substring(12,25) == "iimjobs.com/j"){
        chrome.action.setIcon({path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: activeInfo.tabId});
    }

       else if (getURL.substring(12,32) == "monsterindia.com/job") {
        chrome.action.setIcon({path: { "16": "icon16.png", "48": "icon48.png", "128": "icon128.png" }, tabId: activeInfo.tabId});
    }

       else {
        chrome.action.setIcon({path: { "16": "icon-disabled16.png", "48": "icon-disabled48.png", "128": "icon-disabled128.png" }, tabId: activeInfo.tabId});
    }
   });
 }); 
