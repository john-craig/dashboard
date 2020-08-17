import { h, Component } from 'preact';

export class SidePanel extends Component {
    render(){
        return (
            <div class="side panel">
                {this.props.children}
            </div>
        )
    }
}

export class MainPanel extends Component {
    render(){
        return (
            <div class="main panel">
                {this.props.children}
            </div>
        )
    }
}