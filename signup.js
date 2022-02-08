form = document.querySelector("form")
form.addEventListener('submit', (event)=>{
    event.preventDefault()

    // Check if Passwords meet conditions or not
    // Insert code here

    // if(form.children[2].hasUpper && hasNumeric && hasSpecial)

    if (form.children[2] !== form.children[4]){
        form.children[5].innerHTML = "Passwords Do not Match";
        return;
    }
    sendURL = 'http://65.1.91.60:5000/signup/' + btoa(form.children[0].value) + '/' + btoa(form.children[2].value)
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
                    if (data.status === "signup-success"){
                        chrome.action.setPopup({"popup":"popup.html"})
                        chrome.storage.local.set({"email":data.email})
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