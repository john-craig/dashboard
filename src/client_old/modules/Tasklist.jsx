import {
        h,
        Component
} from 'preact';
import {RightPanel} from './Panel'

import {
    getCurrentLog, 
    getCurrentRecord, 
    getCurrentBudget,
    getCurrentRegimen,
    getCurrentNutrition,

    getTasks
} from '../utils/Middleware'

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
        const currentRegimen = (await getCurrentRegimen()).body;
        const currentNutrition = (await getCurrentNutrition()).body;

        var taskData = (await getTasks())

        console.log(taskData)

        this.setState({
            'log': currentLog,
            'record': currentRecord,
            'budget': currentBudget,
            'regimen': currentRegimen,
            'nutrition': currentNutrition
        })
    }


    render(){
        var log = this.state.log
        var record = this.state.record
        var budget = this.state.budget
        var regimen = this.state.regimen
        var nutrition = this.state.nutrition

        return (
            <RightPanel>
                <ul>
                    {log && 
                        <li><a href={log.webViewLink} target="_blank">Log</a></li>
                    }
                    {record && 
                        <li>
                            <a href={record.webViewLink} target="_blank">Record</a>
                            <ul>
                                {regimen && <li><a href={regimen.webViewLink} target="_blank">Regimen</a></li>}
                                {nutrition && <li><a href={nutrition.webViewLink} target="_blank">Nutrition</a></li>}
                            </ul>
                        </li>
                    }
                    {budget && 
                        <li><a href={budget.webViewLink} target="_blank">Budget</a></li>
                    }
                </ul>
            </RightPanel>
        )
    }

}