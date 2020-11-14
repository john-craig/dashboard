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

        this.setState({
            'log': currentLog,
            'record': currentRecord,
            'budget': currentBudget
        })
    }


    render(){
        var log = this.state.log
        var record = this.state.record
        var budget = this.state.budget

        return (
            <div class="side panel">
                <ul>
                    {log && 
                        <li><a href={log.webViewLink} target="_blank">Log</a></li>
                    }
                    {record && 
                        <li><a href={record.webViewLink} target="_blank">Record</a></li>
                    }
                    {budget && 
                        <li><a href={budget.webViewLink} target="_blank">Budget</a></li>
                    }
                </ul>
            </div>
        )
    }

}