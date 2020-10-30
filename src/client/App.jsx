import { h, Component } from 'preact';
import gapi from 'gapi-client';
import Dashboard from './dashboard.jsx'
class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
        
        console.log(process.env)
        

        /*gapi.load('client:auth2', function(){
            gapi.client.init({
                apiKey: key,
                clientId: clientId,
                scope: 'drive',
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
              }).then(function () {
                // do stuff with loaded APIs
                console.log('it worked');
              });
        });*/

    }


    render() {
        return <Dashboard/>
    }
}

export default App;