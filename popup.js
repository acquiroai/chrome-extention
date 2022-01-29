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

  if (email != null) {
    await chrome.storage.local.set({ "email": email });
  }

  chrome.tabs.remove(createNewTab.id);

  return email
}


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

  if (email == undefined) {
    email = await getEmail();
  }


  if (email == null || email == "") {
    createNewTab = await chrome.tabs.create({
      "url": "http://65.1.91.60:3000/login",
      "active": true
    })
    throw ''
  }

  sendURL = 'http://65.1.91.60:5000/getskills/' + sendURL + '/' + email;

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

chrome.storage.local.remove("email");

async function updatePage() {

  responseData = await getResponse();

  function insertInfo(target, subtarget, authorBy, parentIter) {
    // Target = "Books to Read", "Things to Do" Type: String
    // subtarget = "edX", "Books", "Magazines" Type: String
    // response data is defined in an earlier scope Type: String
    detailsEle = document.createElement('details');
    detailsEleSummary = document.createElement('summary');
    detailsEleSummary.innerHTML = subtarget
    detailsEleSummary.style.fontSize = "14px"
    detailsEleSummary.style.textIndent = "1em"
    detailsEle.appendChild(detailsEleSummary)
    //skill.appendChild(detailsEle)

    for (let j = 0; j < Object.keys(responseData['Skill Set'][parentIter][target][subtarget]).length; j++) {
      subtargetKeys = Object.keys(responseData['Skill Set'][parentIter][target][subtarget])[j]

      infoDiv = document.createElement('div')
      infoDiv.style.display = "inline-block";
      infoDiv.style.width = "100%";

      infoImg = document.createElement('img');
      infoImg.style.float = "left";
      infoImg.src = responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys]["Picture"]
      infoImg.width = "100"
      infoImg.height = "150"

      infoHeading = document.createElement('h3')
      infoHeading.innerHTML = responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys]["Title"]

      if (authorBy !== null) {
        infoAuthorBy = document.createElement('a')
        if (responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys][authorBy][0] !== null) {
          infoAuthorBy.innerHTML = responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys][authorBy][0]
        }
        else {
          infoAuthorBy.innerHTML = responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys][authorBy][0]
        }
        infoDiv.appendChild(infoAuthorBy);
      }

      infoLink = document.createElement('a')
      infoLink.innerHTML = " Link"
      infoLink.href = responseData["Skill Set"][parentIter][target][subtarget][subtargetKeys]["Link"]

      infoDiv.appendChild(infoImg);
      infoDiv.appendChild(infoHeading);

      infoDiv.appendChild(infoLink);
      detailsEle.appendChild(infoDiv);
    }

    return detailsEle;
  }

  skillsSetLenght = responseData["Skill Set"].length
  for (let i = 0; i < skillsSetLenght; i++) {
    skill = document.createElement('details')
    skillSummary = document.createElement('summary')
    skillSummary.innerHTML = responseData["Skill Set"][i]["Input Skill"]
    skillSummary.style.fontSize = "16px"
    skillSummary.style.fontWeight = "bold"
    skill.appendChild(skillSummary)
    document.body.appendChild(skill)

    // Books
    skill.appendChild(insertInfo("Things to Read", "Books", "Author", i))

    // Medium
    skill.appendChild(insertInfo("Things to Read", "Medium", null, i))

    // EdX courses
    skill.appendChild(insertInfo("Things to Do", "edX", "Instructor", i))

    // Udemy Courses
    skill.appendChild(insertInfo("Things to Do", "Udemy", "By", i))

    // Coursera
    skill.appendChild(insertInfo("Things to Do", "Coursera", "By", i))

    // Future Learn
    skill.appendChild(insertInfo("Things to Do", "Future Learn", null, i))

    // Class Central
    skill.appendChild(insertInfo("Things to Do", "Class Central", "By", i))

    // Youtube
    detailsEle = document.createElement('details');
    detailsEleSummary = document.createElement('summary');
    detailsEleSummary.innerHTML = "Youtube Videos"
    detailsEleSummary.style.fontSize = "14px"
    detailsEleSummary.style.textIndent = "1em"
    detailsEle.appendChild(detailsEleSummary)
    skill.appendChild(detailsEle)

    for (let j = 0; j < Object.keys(responseData['Skill Set'][i]["Things to Watch"]).length; j++) {
      subtargetKeys = Object.keys(responseData['Skill Set'][i]["Things to Watch"])[j]

      infoDiv = document.createElement('div')
      infoDiv.style.display = "inline-block";
      infoDiv.style.width = "100%";

      infoImg = document.createElement('img');
      infoImg.style.float = "left";
      infoImg.src = responseData["Skill Set"][i]["Things to Watch"][subtargetKeys]["Picture"]

      infoHeading = document.createElement('h3')
      infoHeading.innerHTML = responseData["Skill Set"][i]["Things to Watch"][subtargetKeys]["Title"]

      infoAuthorBy = document.createElement('a')
      infoAuthorBy.innerHTML = responseData["Skill Set"][i]["Things to Watch"][subtargetKeys]["Channel"]
      infoDiv.appendChild(infoAuthorBy);

      infoLink = document.createElement('a')
      infoLink.innerHTML = " Link"
      infoLink.href = responseData["Skill Set"][i]["Things to Watch"][subtargetKeys]["Link"]

      infoDiv.appendChild(infoImg);
      infoDiv.appendChild(infoHeading);

      infoDiv.appendChild(infoLink);
      detailsEle.appendChild(infoDiv);
    }
  }
}

//async function mainFunc(){
//  await updatePage()
//}

updatePage()
