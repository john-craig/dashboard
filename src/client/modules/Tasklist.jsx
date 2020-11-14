import {
        h,
        Component
    } from 'preact';
import {getCurrentLog, getCurrentRecord, getCurrentBudget} from '../utils/Middleware'

export class Tasklist extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    async componentDidMount(){
        const currentLog = (await getCurrentLog()).body;
        const currentRecord = (await getCurrentRecord()).body;
        const currentBudget = (await getCurrentBudget()).body;

        console.log(currentLog.name)
        console.log(currentRecord.name)
        console.log(currentBudget.name)
    }


    render(){

        return (
            <div class="side panel">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        )
    }

}