import { h, Component } from 'preact';
import {gapi} from 'gapi';
import Dashboard from './dashboard.jsx'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            
        }

        const key = "AIzaSyCKH7DZlch5nq6An7l-ZpgBBtmqoWmOYnI"
    }


    render() {
        return <Dashboard/>
    }
}

export default App;