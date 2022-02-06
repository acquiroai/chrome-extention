async function getEmail() {

    createNewTab = await chrome.tabs.create({
        "url": "http://65.1.91.60:3000/login",
        "active": false
    })

    await new Promise((resolve, reject) => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (tabId == createNewTab.id && changeInfo.status == 'complete') {
                resolve()
            }
        })
    })

    runTabScript = await chrome.scripting.executeScript({
        target: {
            tabId: createNewTab.id,
            allFrames: true
        },
        func: () => {
            return document.getElementById("username").innerHTML;
        },
    })
    email = runTabScript[0].result

    chrome.storage.local.set({ "email": email });

    chrome.tabs.remove(createNewTab.id)

    return email
}

async function logout() {

    createNewTab = await chrome.tabs.create({
        "url": "http://65.1.91.60:3000/login",
        "active": false
    })

    await new Promise((resolve, reject) => {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (tabId == createNewTab.id && changeInfo.status == 'complete') {
                resolve()
            }
        })
    })

    runTabScript = await chrome.scripting.executeScript({
        target: {
            tabId: createNewTab.id,
            allFrames: true
        },
        func: () => {
            document.getElementById("logout-button").click();
        },
    })


    chrome.storage.local.remove("email");


    chrome.tabs.remove(createNewTab.id)

    return email
}

logout_button = document.getElementById('logout-button');
logout_button.addEventListener("click", function (evt) {
    evt.preventDefault();
    logout();
}, false);


async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url
}

async function getResponse() {
    //email = "f20190089@dubai.bits-pilani.ac.in"

    let email = await chrome.storage.local.get("email")
    email = email.email

    if (email === undefined || email === "" || email === null) {
        email = await getEmail();
    }

    if (email == null) {
        createNewTab = await chrome.tabs.create({
            "url": "http://65.1.91.60:3000/login",
            "active": true
        })
        throw ''
    }

    // get skill from the form
    let skill = document.getElementById("inputSkill");
    
    sendURL = 'http://65.1.91.60:5000/getskill/' + skill.value;

    let inputButton = document.getElementById("searchBox");
    inputButton.parentElement.removeChild(inputButton)

    return await fetch(sendURL)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                return response.json().then(function (data) {
                    return data;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

async function updatePage() {

    responseData = await getResponse();
    resp = responseData;

    activitiesPage = document.createElement('div');
    activitiesPage.id = "activitiesPage";
    activitiesPage.style.margin = "5%";

    heading = document.createElement('h1');
    heading.innerHTML = resp["Input Skill"];
    heading.style.display = "inline-block";
    activitiesPage.appendChild(heading);

    activitiesPage.appendChild(document.createElement('br'))

    for (let i = 1; i < Object.keys(resp).length; i++) {
        for (let j = 0; j < Object.keys(resp[Object.keys(resp)[i]]).length; j++) {

            acti = document.createElement('h2');
            acti.innerHTML = Object.keys(resp[Object.keys(resp)[i]])[j];

            acti.addEventListener("click", sourceSelected);

            placeHolder = Object.keys(resp[Object.keys(resp)[i]])[j];
            acti.sourceChosen = resp[Object.keys(resp)[i]][placeHolder];
            acti.classList.add("linkedHeading");
            acti.sourceType = placeHolder;
            activitiesPage.appendChild(acti);
        }
    }

    document.body.appendChild(activitiesPage);

    function sourceSelected(evt) {
        resp = evt.currentTarget.sourceChosen;
        sourcesPage = document.createElement('div');
        sourcesPage.id = "sourcesPage";
        sourcesPage.style.margin = "5%";

        heading = document.createElement('h1');
        heading.innerHTML = evt.currentTarget.sourceType;
        heading.style.display = "inline-block";
        sourcesPage.appendChild(heading);

        bkBtn = document.createElement('button');
        bkBtn.classList.add("backButton");
        bkBtn.addEventListener("click", changePage);
        bkBtn.pageCurr = sourcesPage;
        bkBtn.pageToChg = activitiesPage;
        bkBtn.innerHTML = "Back";
        sourcesPage.appendChild(bkBtn);

        sourcesPage.appendChild(document.createElement('br'))

        for (let i = 0; i < Object.keys(resp).length; i++) {

            sourceInfo = resp[Object.keys(resp)[i]]
            containerDiv = document.createElement('div');
            containerDiv.style.display = "flex";
            containerDiv.style.alignItems = "flex-start";
            containerDiv.style.justifyContent = "flex-start";

            imgDiv = document.createElement('div');
            imgDiv.style.flexBasis = "20%";
            containerDiv.appendChild(imgDiv);

            infoImg = document.createElement('img');
            infoImg.style.float = "left";
            infoImg.src = sourceInfo["Picture"];
            infoImg.width = "70"
            infoImg.height = "70"
            infoImg.maxWidth = "100%";
            imgDiv.appendChild(infoImg);

            infoDiv = document.createElement('div');
            infoDiv.style.paddingLeft = "4px";
            containerDiv.appendChild(infoDiv);

            infoHeading = document.createElement('h3')
            infoHeading.style.float = "left";
            infoDiv.appendChild(infoHeading);
            infoLink = document.createElement('a')
            infoLink.innerHTML = sourceInfo["Title"]
            infoLink.style.color = "#000000"
            infoLink.href = sourceInfo["Link"]
            infoLink.target = "_blank"
            infoLink.rel = "noopener noreferrer"
            infoHeading.appendChild(infoLink);

            if (sourceInfo["By"] !== undefined) {
                infoAuthorBy = document.createElement('h4')
                infoAuthorBy.innerHTML = sourceInfo["By"]
                infoDiv.appendChild(infoAuthorBy);
            }


            sourcesPage.appendChild(containerDiv);

        }

        document.body.removeChild(document.getElementById('activitiesPage'));
        document.body.appendChild(sourcesPage);
    }
}

//updatePage();

inputBtn = document.getElementById("inputSkillBtn");
inputBtn.addEventListener("click", updatePage);
// see line 99 - 105 for changing the input button.