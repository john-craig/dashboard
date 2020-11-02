import gapi from 'gapi-client';

class GClient {

    constructor(props){

        this.state = {
            
        }

        chrome.identity.getAuthToken({interactive: true}, function(token) {
            console.log('got the token', token);
          })
          
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
        // const scopes = [
        //     'https://www.googleapis.com/auth/drive'
        // ]

        // gapi.auth.authorize({
        //     client_id: clientId, scope: scopes, immediate: true}, 
        //     function(res){
        //         console.log(res);
        //     }
        // );

        //gapi.client.setApiKey(key);

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