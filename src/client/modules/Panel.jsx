import { h, Component } from 'preact';



export class RightPanel extends Component {
    render(){
        return (
            <div class="wrapper">
                <div class="prism">
                    <div class="face left">3</div>
                    <div class="face frontSinister">1</div>
                </div>
            </div>
        )
    }
}

export class LeftPanel extends Component {

        /*<SidePanel>
                <div class="sideFace front">
                    this.props.children
                </div>
                <div class="face right"></div>
            </SidePanel>
            */

    render(){
        return (
            <div class="wrapper">
                <div class="prism">
                    <div class="face frontDexter">1</div>
                    <div class="face right">3</div>
                </div>
            </div>
        )
    }
}

export class SidePanel extends Component {
    render(){
        return (
            <div class="panelWrapper">
                <div class="side panel">
                    {this.props.children}
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