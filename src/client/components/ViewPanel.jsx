import { h, Component } from 'preact';
import TabSet from './tabs/TabSet.jsx';
import ListItem from './tabs/ListItem.jsx';
import AgendaTab from './tabs/AgendaTab.jsx';
import LedgerTab from './tabs/LedgerTab.jsx'

import {
    getTasks
} from '../utils/Middleware'

import '../../styles/tabs.scss'
import '../../styles/agenda.scss'

export class ViewPanel extends Component {
    constructor(props){
        super(props)

        //this.setUnassignedData = this.setUnassignedData.bind(this)
    }

    async componentDidMount(){
        await this.setUnassignedData()
    }

    async setUnassignedData(){
        var unassigned = (await getTasks()).body

        this.setState({
            'unassigned': unassigned.items
        })
    }

    render(){
        // var ledger = this.state.ledger
        // var agenda = this.state.agenda
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
                        <LedgerTab/>
                    </div>
                    <div>
                        <AgendaTab/>
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
