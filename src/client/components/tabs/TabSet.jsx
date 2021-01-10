import { h, Component } from 'preact';

export default class TabSet extends Component {
    constructor(props){
        super(props)

        var displayedTabs = props.tabHeaders.map(n => {return false})
        displayedTabs[0] = true

        this.state = {
            displayedTabs: displayedTabs
        }
 
        this.changeTab = this.changeTab.bind(this)
    }

    changeTab(event){
        var tabNum = parseInt(event.target.id)
        var displayTabs = this.state.displayedTabs

        displayTabs = displayTabs.map(
            function(value, index){
                return index == tabNum
            }
        )

        this.setState({displayedTabs: displayTabs})
    }

    render(){
        var displayedTabs = this.state.displayedTabs
        var tabHeaders = this.props.tabHeaders
        var children = this.props.children

        const changeTab = this.changeTab

        return (
            <div class="tabSet">
                <div class="tabHeaders">
                    {
                        tabHeaders.map(function(header, index) {
                            return (<button id={index.toString()} class="tabHeader" onClick={(e) => changeTab(e)}>{header}</button>)
                        })
                    }
                </div>
                <div>
                    {
                        children.map(function(child, index) {
                            return (<div>
                                {
                                    displayedTabs[index] ? <div class="tabPage">{child}</div> : <div></div>
                                }

                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}