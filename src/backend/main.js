const request = require('./request.js');

//Wait for page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded.");

    //Wait for user to open a tab
    chrome.tabs.onCreated.addListener(function(tab){
        console.log("Tab opened.")

        //Check to see if it is the newtab
        if(tab.pendingUrl == "chrome://newtab/"){
            console.log("Dashboard opened.")

            handleSignIn();
        }
    })
})

function handleSignIn(){
    chrome.identity.getAuthToken(
        {
            interactive: true
        },
        function(token){
            console.log("Successfully authenticated.")

            var response = request.sendRequest('https://www.googleapis.com/drive/v2/files', 'GET', token)
            response.then(value => {console.log(value)})
        }
    )
}
