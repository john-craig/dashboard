import { h, Component } from 'preact';
import {
    getLogTasksById
} from '../../utils/Middleware';

export default class AgendaTab extends Component {

    async componentDidMount(){
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
        var agenda = this.state.agenda

        return (
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
        )
    }
}