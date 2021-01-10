import { h, Component } from 'preact';
import {LinkPanel}  from './components/LinkPanel.jsx';
import {ViewPanel} from './components/ViewPanel.jsx';

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
                    <LinkPanel/>
                    <ViewPanel/>
                </div>
            ): (
                <div></div>
            )}
            </div>
        )
    }
}

export default Dashboard;