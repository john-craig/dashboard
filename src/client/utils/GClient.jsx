import gapi from 'gapi-client';

class GClient {

    constructor(props){

        this.state = {
            
        }

        this.handleClientLoad();
    }

    handleClientLoad(){
        gapi.load('client:auth2', this.initClient);
    }

    initClient(){
        const key = process.env.KEY
        const clientId = process.env.CLIENTID

        gapi.client.init({
            apiKey: key,
            clientId: clientId,
            scope: 'https://www.googleapis.com/auth/drive',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
          }).then(function () {
            // do stuff with loaded APIs
            console.log('it worked');
          });
    }
}

export default GClient;