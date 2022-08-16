form = document.querySelector("form")
form.addEventListener('submit', (event) => {
    event.preventDefault()

    function isAllPresent(str) {
        var pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );
        if (!str || str.length === 0) {
            return false;
        }
        if (pattern.test(str)) {
            return true;
        } else {
            return false;
        }
        return;
    }

    if (!isAllPresent(form.children[2].value)){
        form.children[5].innerHTML = "Password does not meet requirements";
        return;
    }

    if (form.children[2].value !== form.children[4].value) {
        form.children[5].innerHTML = "Passwords Do not Match";
        return;
    }
    sendURL = 'http://3.109.207.163:5000/signup/' + btoa(form.children[0].value) + '/' + btoa(form.children[2].value)
    fetch(sendURL)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                return response.json().then(function (data) {
                    if (data.status === "signin-success") {
                        chrome.action.setPopup({ "popup": "popup.html" })
                        chrome.storage.local.set({ "email": data.email })
                        window.location.replace('signin.html');
                    }

                    else {
                        form.children[4].innerHTML = "The Email is already taken, Please Try Again with a Different Email"
                    }

                    form.children[2].value = null;
                    form.children[4].value = null;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
})

