import { h, Component } from 'preact';
import {
    getFileByName,

    getCurrentLog, 
    getCurrentRecord, 
    getCurrentBudget,
    getCurrentRegimen,
    getCurrentNutrition
} from '../../utils/Middleware'
import '../../../styles/ledger.scss'
export default class LedgerTab extends Component {

    constructor(props){
        super(props)

        this.nextWeek = this.nextWeek.bind(this)
        this.lastWeek = this.lastWeek.bind(this)
        this.handleLedger = this.handleLedger.bind(this)
    }

    async componentDidMount(){
        this.handleLedger()
    }

    async handleLedger(){
        var weekRange = this.getWeekRange()

        var ledger = {}
        var files = [
            "Log", "Record", "Regimen", "Nutrition", "Budget"
        ]

        for(var i=0;i<files.length;i++){
            var keyName = files[i].toLowerCase()
            var fileName = files[i] + " " + weekRange

            ledger[keyName] = (await getFileByName(fileName)).body.files[0]
        }

        this.props.onLedgerChange(ledger)
    }

    nextWeek(){
        const prevDate = this.props.date
        const newDate = new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 7
        )

        this.props.onDateChange(newDate, this.handleLedger)
    }

    lastWeek(){
        const prevDate = this.props.date
        const newDate = new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 7
        )

        this.props.onDateChange(newDate, this.handleLedger)
    }

    getWeekRange(){
        const date = this.props.date
        var weekString = ""

        var year = (date.getYear() + 1900).toString()
        var month = date.getMonth()

        var numDays = new Date(year, month + 1, 0).getDate();

        var weekDay = date.getDay()
        var monthDay = date.getDate()

        var curMonday = monthDay - weekDay + 1 //Calculate the date number of the monday of the current week
        var curFriday = monthDay - weekDay + 5 //Calculate the date number of the firday of the current week

        //This week's monday falls in the past month
        if(curMonday <= 0){
            var lastNumDays = new Date(year, month, 0).getDate();
            var lastMonth = new Date(year, month, 0).getMonth();

            weekString = weekString + (lastMonth + 1).toString + "/" + (lastNumDays + curMonday).toString() + " - "
        } else {
            weekString = weekString + (month + 1).toString() + "/" + (curMonday).toString() + " - "
        }

        //this week's friday falls in the next month
        if(curFriday > numDays){
            var nextNumDays = new Date(year, month + 2, 0).getDate();
            var nextMonth = new Date(year, month + 2, 0).getMonth();

            weekString = weekString + (nextMonth + 1).toString() + "/" + (curFriday - numDays).toString()
        } else {
            weekString = weekString + (month + 1).toString() + "/" + (curFriday).toString()
        }

        return weekString
    }

    getWeekString(){
        var weekRange = this.getWeekRange()
        var year = this.props.date.getFullYear()

        return "Week of " + weekRange + ", " + year.toString()
    }

    render(){
        var ledger = this.props.ledger
        var weekString = this.props.date ? this.getWeekString() : ""

        return(
            <div>
                {ledger && <div>
                <div class="ledgerHeader">
                    <button 
                        class="ledgerHeader"
                        onClick={this.lastWeek}
                    >&#10594;</button>
                    <h3 class="ledgerHeader">{weekString}</h3>
                    <button 
                        class="ledgerHeader"
                        onClick={this.nextWeek}
                    >&#10596;</button>
                </div>

                <ul>
                    <li><a href={ledger.log.webViewLink} target="_blank">{ledger.log.name}</a></li>
                    <li>
                        <a href={ledger.record.webViewLink} target="_blank">{ledger.record.name}</a>
                        <ul>
                            <li><a href={ledger.regimen.webViewLink} target="_blank">{ledger.regimen.name}</a></li>
                            <li><a href={ledger.nutrition.webViewLink} target="_blank">{ledger.nutrition.name}</a></li>
                        </ul>
                    </li>
                    <li><a href={ledger.budget.webViewLink} target="_blank">{ledger.budget.name}</a></li>
                </ul>
                </div>}
            </div>
        )
    }
}