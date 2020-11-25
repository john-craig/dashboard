import { h, Component } from 'preact';
import '../../styles/panels.scss';
import '../../styles/trapezoids.scss';

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
                    {/* <div class="face">

                    </div>
                    <div class="face left-middle">

                    </div> */}
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
            <div class="mainPanel">
                <div class="prismSuperior">
                    <div class="face">
                        {this.props.top}
                    </div>
                    <div class="bottom face"></div>
                </div>

                <div class="middle"></div>

                <div class="prismInferior">
                    <div class="top face"></div>
                    <div class="face">
                        {this.props.bottom}
                    </div>
                </div>
            </div>
        )
    }
}