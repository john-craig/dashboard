import { h, Component } from 'preact';
import {
    getCurrentLog, 
    getCurrentRecord, 
    getCurrentBudget,
    getCurrentRegimen,
    getCurrentNutrition
} from '../../utils/Middleware';


export default class LedgerTab extends Component {

    async componentDidMount(){
        var ledger = {
            'log': (await getCurrentLog()).body,
            'record': (await getCurrentRecord()).body,
            'budget': (await getCurrentBudget()).body,
            'regimen': (await getCurrentRegimen()).body,
            'nutrition': (await getCurrentNutrition()).body
        }

        this.setState({
            'ledger': ledger
        })
    }

    render(){
        var ledger = this.state.ledger

        return(
            <div>
                {ledger && <ul>
                    <li><a href={ledger.log.webViewLink} target="_blank">Log</a></li>
                    <li>
                        <a href={ledger.record.webViewLink} target="_blank">Record</a>
                        <ul>
                            <li><a href={ledger.regimen.webViewLink} target="_blank">Regimen</a></li>
                            <li><a href={ledger.nutrition.webViewLink} target="_blank">Nutrition</a></li>
                        </ul>
                    </li>
                    <li><a href={ledger.budget.webViewLink} target="_blank">Budget</a></li>
                </ul>}
            </div>
        )
    }
}