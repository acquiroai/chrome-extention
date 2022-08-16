form = document.querySelector("form")
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    sendURL = 'http://3.109.207.163:5000/login/' + btoa(form.children[0].value) + '/' + btoa(form.children[2].value)
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
                    if (data.status === "login-success"){
                        chrome.action.setPopup({"popup":"popup.html"})
                        chrome.storage.local.set({"email":btoa(data.email)})
                        window.location.replace('popup.html');
                    }
                    
                    else {
                        form.children[4].innerHTML = "Incorrect Email/Password, Please Try Again!"
                    }

                    form.children[2].value = null;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
})