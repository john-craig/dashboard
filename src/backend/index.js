const gapi = require('gapi-client');

//Wait for page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded.");

    //Wait for user to open a tab
    chrome.tabs.onCreated.addListener(function(tab){
        console.log("Tab opened.")

        //Check to see if it is the newtab
        if(tab.pendingUrl == "chrome://newtab/"){
            console.log("Dashboard opened.")

            chrome.identity.getAuthToken({ interactive: false }, function (token) {
                console.log(token);
            })



            // var script = document.createElement('script');
            // script.onload=handleClientLoad;
            // script.src="https://apis.google.com/js/client.js";
            // document.body.appendChild(script);
        }
    })
})

// function handleClientLoad() {
//     console.log("Started client load...")

//     gapi.load('client:auth2', initClient);
// }

// function initClient() { 
//     console.log("Started client initialization...")
//     const key = process.env.KEY
//     const clientId = process.env.CLIENTID
//     const scopes = 'https://www.googleapis.com/auth/drive.metadata.readonly';

//     gapi.client.init(
//         {
//             apiKey: key,
//             clientId: clientId,
//             scope: scopes,
//             discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
//         },
//         function(err){
//             console.log(err);
//         }
//     ).then(
//         function () {
//             console.log("Connection successful");

//             gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//             // Handle the initial sign-in state.
//             updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//             authorizeButton.onclick = handleAuthClick;
//             signoutButton.onclick = handleSignoutClick;
//         }
//     )
// }