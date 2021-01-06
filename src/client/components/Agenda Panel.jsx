import { h, Component } from 'preact';
import {
    getCurrentLog, 
    getCurrentRecord, 
    getCurrentBudget,
    getCurrentRegimen,
    getCurrentNutrition,

    getDocumentById,
    getLogTasksById,

    getTasks
} from '../utils/Middleware'

export class AgendaPanel extends Component {
    constructor(props){
        super(props)

        
    }

    async componentDidMount(){
        const currentLog = (await getCurrentLog()).body;
        const currentRecord = (await getCurrentRecord()).body;
        const currentBudget = (await getCurrentBudget()).body;
        const currentRegimen = (await getCurrentRegimen()).body;
        const currentNutrition = (await getCurrentNutrition()).body;

        // var taskData = (await getTasks())

        // console.log(taskData)
        var logDocument = (await getDocumentById(currentLog.id)).body
        //var logDocument = (await getLogTasksById(currentLog.id)).body
        console.log(logDocument)

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

        return(
            <div class="agenda panel">

                <TabSet tabHeaders={["Ledger", "Tasks"]}>
                    <div>
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
                    </div>
                    <div>
                        Hello World!
                    </div>
                </TabSet>
            </div>
        )
    }
}

class TabSet extends Component {
    constructor(props){
        super(props)

        var displayedTabs = props.tabHeaders.map(n => {return false})
        displayedTabs[0] = true

        this.state = {
            displayedTabs: displayedTabs
        }
 
        this.changeTab = this.changeTab.bind(this)
    }

    changeTab(event){
        var tabNum = parseInt(event.target.id)
        var displayTabs = this.state.displayedTabs

        displayTabs = displayTabs.map(
            function(value, index){
                return index == tabNum
            }
        )

        this.setState({displayedTabs: displayTabs})
    }

    render(){
        var displayedTabs = this.state.displayedTabs
        var tabHeaders = this.props.tabHeaders
        var children = this.props.children

        const changeTab = this.changeTab

        return (
            <div class="tabSet">
                <div class="tabHeaders">
                    {
                        tabHeaders.map(function(header, index) {
                            return (<button id={index.toString()} class="tabHeader" onClick={(e) => changeTab(e)}>{header}</button>)
                        })
                    }
                </div>
                <div>
                    {
                        children.map(function(child, index) {
                            return (<div>
                                {
                                    displayedTabs[index] ? <div class="tabPage">{child}</div> : <div></div>
                                }

                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}