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
    chrome.storage.local.set({ "email": email });
  }

  chrome.tabs.remove(createNewTab.id)

  return email
}


async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.url
}

async function getResponse() {
  //email = "f20190089@dubai.bits-pilani.ac.in"

  let email = await chrome.storage.local.get("email")
  email = email.email

  if (email == undefined) {
    email = await getEmail();
  }

  if (email == null) {
    createNewTab = await chrome.tabs.create({
      "url": "http://65.1.91.60:3000/login",
      "active": true
    })
    throw ''
  }

  console.log(email);

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

chrome.storage.local.remove("email");

async function updatePage() {
  responseDataArr = await getResponse();

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

  for (let i = 0; i < responseDataArr.length; i++) {
    responseData = responseDataArr[i];
    job = document.createElement("details");
    jobSummary = document.createElement("summary");
    jobSummary.innerHTML = responseDataArr[i]["Company & Job Title"];
    jobSummary.style.fontSize = "16px"
    jobSummary.style.fontWeight = "bold"
    job.append(jobSummary);
    document.body.append(job);

    for (let i = 0; i < responseData["Skill Set"].length; i++) {
      skill = document.createElement('details')
      skillSummary = document.createElement('summary')
      skillSummary.innerHTML = responseData["Skill Set"][i]["Input Skill"]
      skillSummary.style.fontSize = "16px"
      //skillSummary.style.fontIndent = "1em"
      skill.appendChild(skillSummary)
      job.appendChild(skill)

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
}

updatePage()
