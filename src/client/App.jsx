import { h, Component } from 'preact';
import Dashboard from './dashboard.jsx'
import {testMessage} from './utils/Messages';
class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    async componentDidMount(){
        testMessage(
            async function(result){
                console.log(result);
            }
        );
    }

    render() {
        return <Dashboard/>
    }
}

export default App;