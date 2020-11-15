import { h, Component } from 'preact';
import { RightPanel, LeftPanel, MainPanel } from './modules/Panel.jsx'
import { Tasklist } from './modules/Tasklist.jsx'

class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            shouldDisplay: true
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    componentDidMount(){
        self.addEventListener("keypress", this.handleKeyPress)
    }

    handleKeyPress(event){
        var display = true

        if (event.key == '/') {
            display = !this.state.shouldDisplay
        }

        this.setState({
            shouldDisplay: display
        })
    }

    render() {
        const shouldDisplay = this.state.shouldDisplay

        return (
            <div>

            {shouldDisplay ? (
                <div class="root">
                    <LeftPanel/>



                    <Tasklist/>
                </div>
            ): (
                <div></div>
            )}
            </div>
        )
    }
}

export default Dashboard;