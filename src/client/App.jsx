import { h, Component } from 'preact';
import Dashboard from './dashboard.jsx'
import GClient from './utils/GClient';
class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
        
        const client = new GClient();
    }

    render() {
        return <Dashboard/>
    }
}

export default App;