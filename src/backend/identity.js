const router = require('./routes/router.js')

export function handleSignIn(){
    chrome.identity.getAuthToken(
        {
            interactive: true
        },
        function(token){
            console.log("Successfully authenticated.");
        }
    )
}

export async function handleMessage(request, callback){
    chrome.identity.getAuthToken(
        {
            interactive: false
        },
        function(token){
            console.log("Handling a message.")
            callback(
                router.handleRoute(request, token)
            );
        }
    )
}