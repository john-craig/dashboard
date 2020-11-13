import { h, Component } from 'preact';
import Dashboard from './dashboard.jsx'
import {testMessage} from './utils/Middleware';
class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    async componentDidMount(){
        const value = await testMessage();

        console.log(value);
    }

    render() {
        return <Dashboard/>
    }
}

export default App;