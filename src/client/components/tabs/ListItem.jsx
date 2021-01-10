
import { h, Component } from 'preact';

export default class ListItem extends Component {
    constructor(props){
        super(props)

        this.state = {
            'menuOpen': false
        }

        this.toggleMenu = this.toggleMenu.bind(this)
        this.openMenu = this.openMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    toggleMenu(){
        var menuOpen = this.state.menuOpen

        this.setState(
            {
                menuOpen: !menuOpen
            }
        )
    }

    openMenu(){
        this.setState({
            menuOpen: true
        })
    }

    closeMenu(){
        this.setState({
            menuOpen: false
        })
    }

    render(){
        var labels = this.props.menus['labels']
        var functions = this.props.menus['functions']

        return(
            <div>
                <li
                    onClick={this.toggleMenu}
                >
                    <p>
                        {this.props.children}
                        {this.state.menuOpen && <div class="menu">
                            {
                                labels.map(function(label, index){
                                    return <button class="menuButton" onClick={functions[index]}>
                                        {label}
                                    </button>
                                })
                            }
                        </div>}
                    </p>
                </li>
            </div>
        )
    }
}