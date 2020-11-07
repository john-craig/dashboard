import gapi from 'gapi-client';

class GClient {

    constructor(props){

        this.state = {
            
        }

        const url = chrome.runtime.getURL('');

        console.log(url);

        // fetch('https://apis.google.com/').then(r => r.text()).then(result => {
        //     console.log(result);
        // })

        // chrome.identity.getAuthToken({ interactive: true }, function (token) {
        //     console.log(token);
        // })

        // var script = document.createElement('script');
        // script.onload=this.handleClientLoad;
        // script.src="https://apis.google.com/js/api.js";
        // document.body.appendChild(script);


    }

    handleClientLoad() {
        gapi.load(
            'client:auth2', 
            this.initClient
        );
    }

    initClient() { 
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
                console.log("It worked!");
            }
        )
    }
}

export default GClient;