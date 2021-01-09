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

import '../../styles/tabs.scss'
import '../../styles/agenda.scss'

export class AgendaPanel extends Component {
    constructor(props){
        super(props)

        this.setLedgerData = this.setLedgerData.bind(this)
    }

    async componentDidMount(){
        await this.setLedgerData()
        await this.setAgendaData()
    }

    async setLedgerData(){
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

    async setAgendaData(){
        var logId = this.state.ledger.log.id
        
        var logSections = (await getLogTasksById(logId)).body
        var day = new Date().getDay()

        var agendaObj = {
            'month': [],
            'week': [],
            'day': [],
        }

        //Break sections down into individual arrays
        var monthSection = logSections[0]

        //Shift out a starting empty string
        if(monthSection[0] == ""){
            monthSection.shift()
        }

        //Push everything into the month article of the object
        for(var i=1;i<monthSection.length;i++){
            agendaObj['month'].push(monthSection[i].trim())
        }

        //Handle week data
        var weekSection = logSections[1]
        
        //Push everything into the week article of the object
        for(var i=1;i<weekSection.length;i++){
            agendaObj['week'].push(weekSection[i].trim())
        }

        //var daySection = logSections[day + 1]
        var daySection = logSections[3]

        //Push corresponding items into the day article of the object
        var isComplete = true;
        for(var i=2;i<daySection.length;i++){
            if(daySection[i].includes('Task')){
                isComplete = false;
                i++;
            }

            if(!isComplete){
                agendaObj['day'].push(daySection[i].trim())
            }
        }

        this.setState({
            'agenda': agendaObj
        })
    }

    render(){
        var ledger = this.state.ledger
        var agenda = this.state.agenda

        return(
            <div class="agenda panel">

                <TabSet tabHeaders={["Ledger", "Agenda"]}>
                    <div>
                        {ledger && 
                        <ul>
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
                    <div>
                        {agenda && <div>
                            <p>Month Goals: </p>
                            <ul>{
                                agenda['month'].map(elem => {
                                    return <li>{elem}</li>
                                })
                            }</ul>

                            <p>Week Objectives: </p>
                            <ul>{
                                agenda['week'].map(elem => {
                                    return <li>{elem}</li>
                                })
                            }</ul>

                            <p>Day Tasks: </p>
                            <ul>{
                                agenda['day'].map(elem => {
                                    return <li>{elem}</li>
                                })
                            }</ul>
                        </div>}
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