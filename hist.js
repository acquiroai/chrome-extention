//document.getElementById("button").addEventListener("click", function () {
//chrome.action.setPopup({ popup: "hist.html" });
//    location.href = "popup.html";
//  });

async function getResponse() {
    email = "hello world"
    email = btoa(email)
    sendURL = 'http://127.0.0.1:5000/phase2/' + email

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
        detailsEle = document.createElement("details");
        detailsEleSummary = document.createElement("summary");
        detailsEleSummary.innerHTML = responseDataArr[i]["company_title"];
        detailsEle.append(detailsEleSummary);
        document.body.append(detailsEle);

        for (let i = 0; i < responseData["skill_set"].length; i++) {
            ele = document.createElement('h2');
            ele.innerHTML = responseData["skill_set"][i]["Input Skill"];
            detailsEle.append(ele);

            divEle = document.createElement('div');
            ele = document.createElement('h4')
            ele.innerHTML = "Books to Read"
            divEle.appendChild(ele)

            ele = document.createElement('li');
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 1"]["Authors"][0];
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 2"]["Authors"][0];
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Book Title"] + ' by ' + responseData["skill_set"][i]["Things to Read"]["Books"]["Book 3"]["Authors"][0];
            divEle.appendChild(ele);

            ele = document.createElement('h4')
            ele.innerHTML = "Magazines to Read"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 1"]["Publish Date"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 2"]["Publish Date"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Magazine Title"] + " (" + responseData["skill_set"][i]["Things to Read"]["Magazines"]["Magazine 3"]["Publish Date"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement('h4')
            ele.innerHTML = "Books To Listen To"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 1"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 1"]["Author"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 2"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 2"]["Author"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Listen"]["Audible Book 3"]["Audible Title"] + " by " + responseData["skill_set"][i]["Things to Listen"]["Audible Book 3"]["Author"]
            divEle.appendChild(ele);

            ele = document.createElement('h4')
            ele.innerHTML = "edX courses"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 1"]["Offered By"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 2"]["Offered By"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Course 3"]["Offered By"]
            divEle.appendChild(ele);

            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 1"]["Offered By"]

            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 2"]["Offered By"]

            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["edX"]["Program 3"]["Offered By"]

            ele = document.createElement('h4')
            ele.innerHTML = "Udemy courses"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 1"]["Instructor"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 2"]["Instructor"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Course Title"] + " by " + responseData["skill_set"][i]["Things to Do"]["Udemy"]["Course 3"]["Instructor"]
            divEle.appendChild(ele);

            ele = document.createElement('h4')
            ele.innerHTML = "Coursera courses"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 1"]["Type"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 2"]["Type"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 3"]["Type"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 4"]["Type"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Course Title"] + " (" + responseData["skill_set"][i]["Things to Do"]["Coursera"]["Course 5"]["Type"] + ")"
            divEle.appendChild(ele);

            ele = document.createElement('h4')
            ele.innerHTML = "Youtube Videos"
            divEle.appendChild(ele)

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 1"]["Channel Name"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 2"]["Channel Name"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 3"]["Channel Name"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 4"]["Channel Name"]
            divEle.appendChild(ele);

            ele = document.createElement("li")
            ele.innerHTML = responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Video Title"] + " by " + responseData["skill_set"][i]["Things to Watch"]["Video 5"]["Channel Name"]
            divEle.appendChild(ele);

            detailsEle.appendChild(divEle);
        }
    }
}

//async function mainFunc(){
//  await updatePage()
//}

updatePage()
