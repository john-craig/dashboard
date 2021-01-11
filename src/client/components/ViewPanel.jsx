import { h, Component } from 'preact';
import TabSet from './tabs/TabSet.jsx';
import ListItem from './tabs/ListItem.jsx';
import AgendaTab from './tabs/AgendaTab.jsx';
import LedgerTab from './tabs/LedgerTab.jsx'

import {
    getTasks
} from '../utils/Middleware'

import '../../styles/tabs.scss'
import '../../styles/view.scss'

export class ViewPanel extends Component {
    constructor(props){
        super(props)

        this.state = {
            date: new Date()
        }

        this.onDateChange = this.onDateChange.bind(this)
        this.onLedgerChange = this.onLedgerChange.bind(this)
        this.onAgendaChange = this.onAgendaChange.bind(this)
        this.onUnassignedChange = this.onUnassignedChange.bind(this)

        this.setUnassignedData = this.setUnassignedData.bind(this)
    }

    async onDateChange(date, callback){
        this.setState({
            'date': date
        }, callback)
    }

    async onLedgerChange(ledger){
        this.setState({
            'ledger': ledger
        })
    }

    async onAgendaChange(agenda){
        this.setState({
            'agenda': agenda
        })
    }

    async onUnassignedChange(unassigned){
        this.setState({
            'unassigned': unassigned
        })
    }

    async setUnassignedData(){
        var unassigned = (await getTasks()).body

        this.setState({
            'unassigned': unassigned.items
        })
    }

    render(){
        var date = this.state.date

        var ledger = this.state.ledger
        var agenda = this.state.agenda
        var unassigned = this.state.unassigned

        var menuItem = {
            'labels': ['Click'],
            'functions': [
                function(){console.log("FAS")}
            ]
        }

        return(
            <div class="agenda panel">
                <TabSet tabHeaders={["Ledger", "Agenda", "Unassigned"]}>
                    <div>
                        <LedgerTab 
                            ledger={ledger} 
                            date={date}
                            onDateChange={this.onDateChange}
                            onLedgerChange={this.onLedgerChange}
                        />
                    </div>
                    <div>
                        {ledger && <AgendaTab 
                            log={ledger.log}
                            agenda={agenda}
                            date={date}
                            onDateChange={this.onDateChange}
                            onAgendaChange={this.onAgendaChange}
                        />}
                    </div>
                    <div>
                        {unassigned && <ul>{
                            unassigned.map(item => {
                                return (
                                    <ListItem
                                        menus={menuItem}
                                    >
                                        {item.title}
                                    </ListItem>
                                )
                            })
                        }</ul>}
                    </div>
                </TabSet>
            </div>
        )
    }
}
