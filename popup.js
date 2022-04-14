logout_button = document.getElementById('logout-button');
logout_button.addEventListener("click", function (evt) {
  evt.preventDefault();
  chrome.storage.local.remove("email");
  chrome.action.setPopup({ "popup": "signin.html" });
  window.location.replace("signin.html");
});

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

async function getResponse() {
  sendURL = await getCurrentTab();
  sendURL = btoa(sendURL);

  let email = await chrome.storage.local.get("email")
  email = email.email

  if (email === undefined || email === "" || email === null) {
    email = await getEmail();
  }

  /*if (email === null || email === "") {
    createNewTab = await chrome.tabs.create({
      "url": "http://3.111.237.195:3000/login",
      "active": true
    })
    throw ''
  }*/

  sendURL = 'http://3.111.237.195:5000/getskills/' + sendURL + '/' + email;

  return await fetch(sendURL)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          throw `Looks like there was a problem. Status Code: ${response.status}`;
        }

        // Examine the text in the response
        return response.json().then(function (data) {
          let loader = document.getElementById("loader")
          loader.parentElement.removeChild(loader)
          return data;
        });
      }
    )
    .catch(function (err) {
      let loader = document.getElementById("loader")
      loader.parentElement.removeChild(loader)

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

  //Event Functions
  function skillSelected(evt) {
    //console.log(evt.currentTarget.skillChosen);
    resp = evt.currentTarget.skillChosen
    activitiesPage = document.createElement('div');
    activitiesPage.id = "activitiesPage";
    activitiesPage.style.margin = "5%";


    heading = document.createElement('h1');
    heading.innerHTML = resp["Input Skill"];
    heading.style.display = "inline-block";
    activitiesPage.appendChild(heading);

    bkBtn = document.createElement('button');
    bkBtn.classList.add("backButton");
    bkBtn.addEventListener("click", changePage);
    bkBtn.pageCurr = activitiesPage;
    bkBtn.pageToChg = skillPageHome;
    bkBtn.innerHTML = "Back";
    activitiesPage.appendChild(bkBtn);

    activitiesPage.appendChild(document.createElement('br'))

    for (let i = 0; i < Object.keys(resp).length; i++) {

      if (Object.keys(resp)[i] === "Input Skill") continue;
      if (Object.keys(resp)[i] === "Medium" && resp[Object.keys(resp)[i]] === null) continue;

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

    if (document.getElementById("sourcesPage") !== null) {
      document.body.removeChild(document.getElementById("sourcesPage"));
    }

    if (document.getElementById("skillPageHome") !== null) {
      document.body.removeChild(document.getElementById("skillPageHome"));
    }

    document.body.appendChild(activitiesPage);
  }

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
      infoImg.width = "70";
      infoImg.height = "70";
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
  //Skills Found Page
  function skillsFound() {
    let skillPageHome = document.createElement('div');
    skillPageHome.id = "skillPageHome";
    skillPageHome.style.margin = "5%";

    heading = document.createElement('h1');
    //heading.innerHTML = responseData["Job Title"];

    skillPageHome.appendChild(heading);
    skillsFoundHeading = document.createElement('h2')
    heading.innerHTML = "Skills Found on This Page 💪"

    skillPageHome.appendChild(document.createElement('br'))

    for (let i = 0; i < Object.keys(responseData["Skill Set"]).length; i++) {
      skill = document.createElement('h2');
      skill.innerHTML = responseData["Skill Set"][i]["Input Skill"];

      skill.addEventListener("click", skillSelected);
      skill.skillChosen = responseData["Skill Set"][i];
      skill.classList.add("linkedHeading");
      //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
      //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
      skillPageHome.appendChild(skill);
    }

    //jobMeta = document.createElement('div');
    skillPageHome.append(document.createElement('br'))
    jobTitle = document.createElement('h3');
    jobTitle.innerHTML = "Job Title: " + responseData["title"];
    skillPageHome.appendChild(jobTitle);

    companyName = document.createElement('h3');
    companyName.innerHTML = "Company: " + responseData["company"];
    skillPageHome.appendChild(companyName);

    minWorkEx = document.createElement('h3');
    minWorkEx.innerHTML = "Min Work Experience: " + responseData["Minimum Work Experience"] + " (in years)";
    skillPageHome.appendChild(minWorkEx);

    jobLoc = document.createElement('h3');
    jobLoc.innerHTML = "Location: " + responseData["Location"]
    skillPageHome.appendChild(jobLoc);

    glassDoor = document.createElement("a");
    glassDoor.innerHTML = "Glassdoor reviews";
    glassDoor.href = "https://www.glassdoor.com/Search/results.htm?keyword=" + responseData["company"] + "&locName=" + responseData["Location"];
    glassDoor.target = "_blank"
    glassDoor.rel = "noopener noreferrer"
    skillPageHome.appendChild(glassDoor);

    skillPageHome.appendChild(document.createElement("br"));
    skillPageHome.appendChild(document.createElement("br"));

    if (document.getElementById("activitiesPage") !== null) {
      document.body.removeChild(document.getElementById("activitiesPage"));
    }
    document.body.appendChild(skillPageHome);
  }

  function changePage(evt) {
    document.body.removeChild(evt.currentTarget.pageCurr);
    document.body.appendChild(evt.currentTarget.pageToChg);
  }

  skillsFound();
}

updatePage()

