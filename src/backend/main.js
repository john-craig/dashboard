require('regenerator-runtime/runtime.js');
const request = require('./request.js');
const identity = require('./identity.js')

//Wait for page load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded.");

    //Wait for user to open a tab
    chrome.tabs.onCreated.addListener(function(tab){
        console.log("Tab opened.")

        //Check to see if it is the newtab
        if(tab.pendingUrl == "chrome://newtab/"){
            console.log("Dashboard opened.")

            identity.handleSignIn();
        }
    })
})

chrome.runtime.onMessage.addListener(async function(request, sender, callback) {
    console.log("Handling a message.")
    identity.handleMessage(request, callback);

    return true;
})
