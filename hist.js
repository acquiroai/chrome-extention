//document.getElementById("button").addEventListener("click", function () {
//chrome.action.setPopup({ popup: "hist.html" });
//    location.href = "popup.html";
//  });

async function getResponse() {
    email = "hello world"
    sendURL = 'http://127.0.0.1:5000/phase3/' + email

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
    //skillsSetLenght = responseData["skill_set"].length
    for (let i = 0; i < responseDataArr.length; i++) {
        responseData = responseDataArr[i];
        job = document.createElement("details");
        jobSummary = document.createElement("summary");
        jobSummary.innerHTML = responseDataArr[i]["company_title"];
        job.append(jobSummary);
        document.body.append(job);

        for (let i = 0; i < responseData["skill_set"].length; i++) {
            skill = document.createElement('details')
            skillSummary = document.createElement('summary')
            skillSummary.innerHTML = responseData["skill_set"][i]["Input Skill"]
            skill.appendChild(skillSummary)
            job.appendChild(skill)

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Books to Read"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement('li');
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Authors"][0];
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Authors"][0];
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Authors"][0];
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Magazines to Read"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Publish Date"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Publish Date"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Publish Date"] + ")"
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Books to Listen to"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 1"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 1"]["Author"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 2"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 2"]["Author"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 3"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 3"]["Author"]
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "EdX Courses"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Offered By"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Offered By"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Offered By"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Offered By"]
            detailsEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Offered By"]
            detailsEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Offered By"]
            detailsEle.appendChild(ele)

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Udemy Courses"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Instructor"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Instructor"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Instructor"]
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Coursera"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Type"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Type"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Type"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Type"] + ")"
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Type"] + ")"
            detailsEle.appendChild(ele);

            detailsEle = document.createElement('details');
            detailsEleSummary = document.createElement('summary');
            detailsEleSummary.innerHTML = "Youtube detailsEle"
            detailsEle.appendChild(detailsEleSummary)
            skill.appendChild(detailsEle)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Channel Name"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Channel Name"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Channel Name"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Channel Name"]
            detailsEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Channel Name"]
            detailsEle.appendChild(ele);    
        }
    }
}

//async function mainFunc(){
//  await updatePage()
//}

updatePage()
