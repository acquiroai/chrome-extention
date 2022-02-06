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

  sendURL = 'http://65.1.91.60:5000/history/' + email

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
  responseDataArr = await getResponse();

  //Event Functions
  function skillSelected(evt) {
    //console.log(evt.currentTarget.skillChosen);
    resp = evt.currentTarget.skillChosen
    activitiesPage = document.createElement('div');
    activitiesPage.id = "activitiesPage";
    activitiesPage.style.margin = "5%";


    heading = document.createElement('h2');
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
      if (i === 1) continue;
      for (let j = 0; j < Object.keys(resp[Object.keys(resp)[i]]).length; j++) {

        acti = document.createElement('h2');
        acti.innerHTML = Object.keys(resp[Object.keys(resp)[i]])[j];
        acti.classList.add("linkedHeading");

        acti.addEventListener("click", sourceSelected);

        placeHolder = Object.keys(resp[Object.keys(resp)[i]])[j];
        acti.sourceChosen = resp[Object.keys(resp)[i]][placeHolder];
        acti.sourceType = placeHolder;
        //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
        //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
        activitiesPage.appendChild(acti);
      }
    }


    document.body.removeChild(document.getElementById("skillPageHome"));
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
  //Skills Found Page
  function skillsFound(evt) {
    responseData = evt.currentTarget.jobChosen;
    let skillPageHome = document.createElement('div');
    skillPageHome.id = "skillPageHome";
    skillPageHome.style.margin = "5%";

    let heading = document.createElement('h1');
    heading.innerHTML = responseData["Company & Job Title"];
    heading.style.display = "inline-block";
    skillPageHome.appendChild(heading);

    bkBtn = document.createElement('button');
    bkBtn.classList.add("backButton");
    bkBtn.addEventListener("click", changePage);
    bkBtn.pageCurr = skillPageHome;
    bkBtn.pageToChg = histPageHome;
    bkBtn.innerHTML = "Back";
    skillPageHome.appendChild(bkBtn);

    skillPageHome.appendChild(document.createElement('br'))

    for (let i = 0; i < Object.keys(responseData["Skill Set"]).length; i++) {
      skill = document.createElement('h2');
      skill.classList.add("linkedHeading");
      skill.innerHTML = responseData["Skill Set"][i]["Input Skill"];

      skill.addEventListener("click", skillSelected);
      skill.skillChosen = responseData["Skill Set"][i];
      //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
      //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
      skillPageHome.appendChild(skill);
    }

    //jobMeta = document.createElement('div');
    skillPageHome.append(document.createElement('br'))
    jobTitle = document.createElement('h3');
    jobTitle.innerHTML = "Title & Company Name: " + responseData["Company & Job Title"];
    skillPageHome.appendChild(jobTitle);

    minWorkEx = document.createElement('h3');
    minWorkEx.innerHTML = "Min Work Experience: " + responseData["Minimum Work Experience"] + " (in years)";
    skillPageHome.appendChild(minWorkEx);

    jobLoc = document.createElement('h3');
    jobLoc.innerHTML = "Location: " + responseData["Location"]
    skillPageHome.appendChild(jobLoc);

    if (document.getElementById("activitiesPage") !== null) {
      document.body.removeChild(document.getElementById("activitiesPage"));
    }
    document.body.removeChild(document.getElementById("histPageHome"))
    document.body.appendChild(skillPageHome);
  }

  function history() {
    let histPageHome = document.createElement('div');
    histPageHome.id = "histPageHome";
    histPageHome.style.margin = "5%";

    let heading = document.createElement('h1');
    heading.innerHTML = "Your History 🧠⚡️"
    histPageHome.appendChild(heading);

    histPageHome.appendChild(document.createElement('br'))

    for (let i = 0; i < responseDataArr.length; i++) {
      hist = document.createElement('h2');
      hist.innerHTML = responseDataArr[i]["Company & Job Title"];
      hist.classList.add("linkedHeading")

      hist.addEventListener("click", skillsFound);
      hist.jobChosen = responseDataArr[i];
      //skill.addEventListener("mouseenter", function(){skill.style.textDecoration = "underline"});
      //skill.addEventListener("mouseleave", function(){skill.style.textDecoration = "none"});
      histPageHome.appendChild(hist);
    }

    document.body.appendChild(histPageHome);
  }

  function changePage(evt) {
    document.body.removeChild(evt.currentTarget.pageCurr);
    document.body.appendChild(evt.currentTarget.pageToChg);
  }

  history();
}

updatePage()