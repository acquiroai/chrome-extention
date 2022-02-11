logout_button = document.getElementById('logout-button');
logout_button.addEventListener("click", function (evt) {
    evt.preventDefault();
    chrome.storage.local.remove("email");
    chrome.action.setPopup({ "popup": "signin.html" });
    window.location.replace("signin.html");
});

async function getResponse() {
    //email = "f20190089@dubai.bits-pilani.ac.in"

    let email = await chrome.storage.local.get("email")
    email = email.email

    if (email === undefined || email === "" || email === null) {
        email = await getEmail();
    }

    // get skill from the form
    let skill = document.getElementById("inputSkill");
    skill.value = btoa(skill.value);
    sendURL = 'http://65.1.91.60:5000/skill/' + skill.value;

    let inputButton = document.getElementById("searchBox");
    inputButton.parentElement.removeChild(inputButton)

    loader = document.createElement('div');
    loader.id = "loader"
    centeringLoader = document.createElement('center')
    loader.appendChild(centeringLoader);
    centeringLoader.appendChild(document.createElement('div'));
    headingOfLoader = document.createElement('h1');
    headingOfLoader.innerHTML = "Loading";
    centeringLoader.appendChild(headingOfLoader);
    centeringLoader.appendChild(document.createElement("br"));
    centeringLoader.appendChild(document.createElement("br"));

    loaderCircle = document.createElement('div');
    loaderCircle.classList = "loader";
    centeringLoader.appendChild(loaderCircle);
    document.body.appendChild(loader);

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
                    loader = document.getElementById("loader")
                    document.body.removeChild(loader)
                    return data;
                });
            }
        )
        .catch(function (err) {
            let loader = document.getElementById("loader")
            document.body.removeChild(loader)

            updatedErrorPage = document.createElement('p')
            updatedErrorPage.style.fontSize = "15px"
            updatedErrorPage.style.textAlign = 'center'
            //updatedErrorPage.style.color = 'Red'
            updatedErrorPage.innerHTML = "Could Not Find the Skill for This Page 😿"
            document.body.append(updatedErrorPage)
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

    for (let i = 0; i < Object.keys(resp).length; i++) {

        if (Object.keys(resp)[i] === "Input Skill") continue;

        if (Object.keys(resp[Object.keys(resp)[i]]).length !== 0) {
            acti = document.createElement('h2');
            acti.innerHTML = Object.keys(resp)[i];

            acti.addEventListener("click", sourceSelected);

            placeHolder = Object.keys(resp)[i];
            acti.sourceChosen = resp[Object.keys(resp)[i]];
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

            if (resp[Object.keys(resp)[i]].length === 0) continue;

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

    function changePage(evt) {
        document.body.removeChild(evt.currentTarget.pageCurr);
        document.body.appendChild(evt.currentTarget.pageToChg);
    }
}

//updatePage();

inputBtn = document.getElementById("inputSkillBtn");
inputBtn.addEventListener("click", updatePage);
// see line 99 - 105 for changing the input button.