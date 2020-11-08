gapi = require('gapi-client');

//Wait for page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded.")

    //Wait for user to open a tab
    chrome.tabs.onCreated.addListener(function(tab){
        console.log("Tab opened.")

        //Check to see if it is the newtab
        if(tab.pendingUrl == "chrome://newtab/"){
            console.log("Dashboard opened.")

            // chrome.identity.getAuthToken({ interactive: true }, function (token) {
            //     console.log(token);
            // })

            var script = document.createElement('script');
            script.onload=handleClientLoad;
            script.src="https://apis.google.com/js/client.js?onload=callbackFunction";
            document.body.appendChild(script);
        }
    })
})

function handleClientLoad() {
    console.log("Started client load...")

    gapi.load(
        'client:auth2', 
        this.initClient
    );
}

function initClient() { 
    console.log("Started client initialization...")
    const key = process.env.KEY
    const clientId = process.env.CLIENTID
    const scopes = 'profile';

    gapi.client.init(
        {
            apiKey: key,
            clientId: clientId,
            scope: scopes,
            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"]
        },
        function(err){
            console.log(err);
        }
    ).then(
        function () {
            // do stuff with loaded APIs
            console.log("Connection successful");
        }
    )
}