import { h, Component } from 'preact';



export class RightPanel extends Component {
    render(){
        return (
            <div class="sidePanel">
                <div class="prismSinister">
                    <div class="face left"></div>
                    <div class="face frontSinister">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export class LeftPanel extends Component {

    render(){
        return (
            <div class="sidePanel">
                <div class="prismDexter">
                    <div class="face frontDexter">
                        {this.props.children}
                    </div>
                    <div class="face right"></div>
                </div>
            </div>
        )
    }
}

export class MainPanel extends Component {
    render(){
        return (
            <div class="panelWrapper">
                <div class="main panel">
                    <div class= "mainFace">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}