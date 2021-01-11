import { h, Component } from 'preact';
import ListItem from './ListItem.jsx';
import {
    getLogTasksById
} from '../../utils/Middleware'
import '../../../styles/agenda.scss'
export default class AgendaTab extends Component {
    constructor(props){
        super(props)

        this.nextDay = this.nextDay.bind(this)
        this.lastDay = this.lastDay.bind(this)
        this.handleAgenda = this.handleAgenda.bind(this)
    }

    async componentDidMount(){
        this.handleAgenda()
    }



    //
    async handleAgenda(){
        var logId = this.props.log.id
        
        var logSections = (await getLogTasksById(logId)).body
        var day = this.props.date.getDay()

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


        if(day != 0 && day != 6){ //We do not assign tasks on weekends
            var daySection = logSections[day + 1]
            console.log(daySection)

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
        } else {
            agendaObj['day'].push('—')
        }

        this.props.onAgendaChange(agendaObj)
    }

    //Utility getter
    getDateString(){
        const date = this.props.date
        var month = date.toLocaleString('default', { month: 'long' });
        var day = date.toLocaleString('default', {weekday: 'long'})
        var year = (date.getYear() + 1900).toString()

        return day + ", " + month + " " + date.getDate().toString() + ", " + year
    }

    //Date change function
    nextDay(){
        const prevDate = this.props.date
        const newDate = new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 1
        )

        this.props.onDateChange(newDate, this.handleAgenda)
    }

    lastDay(){
        const prevDate = this.props.date
        const newDate = new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 1
        )

        this.props.onDateChange(newDate, this.handleAgenda)
    }

    render(){
        var agenda = this.props.agenda

        var menuItem = {
            'labels': ['Click'],
            'functions': [
                function(e){
                    var text = e.path[2].innerText

                    console.log(text)
                }
            ]
        }

        var dateString = this.props.date ? this.getDateString() : ""

        return (
            <div>
            {agenda && <div>
                <div class="agendaHeader">
                <button 
                        class="agendaHeader"
                        onClick={this.lastDay}
                    >&#10594;</button>
                    
                    <h3 class="agendaHeader">{dateString}</h3>
                    
                    <button 
                        class="agendaHeader"
                        onClick={this.nextDay}
                    >&#10596;</button>
                </div>

                <p>Month Goals: </p>
                <ul>{
                    agenda['month'].map(elem => {
                        return (<ListItem
                                menus={menuItem}
                            >
                                {elem}
                            </ListItem>)
                    })
                }</ul>

                <p>Week Objectives: </p>
                <ul>{
                    agenda['week'].map(elem => {
                        return (<ListItem
                            menus={menuItem}
                        >
                            {elem}
                        </ListItem>)
                    })
                }</ul>

                <p>Day Tasks: </p>
                <ul>{
                    agenda['day'].map(elem => {
                        return (<ListItem
                            menus={menuItem}
                        >
                            {elem}
                        </ListItem>)
                    })
                }</ul>
            </div>}
            </div>
        )
    }
}