import { h, Component } from 'preact';
import '../../styles/navigation.scss'
export class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            dropdowns: [
                {
                    title: "Social",
                    linkNames: [
                        "Facebook",
                        "Instagram"
                    ],
                    linkTargets: [
                        "https://www.facebook.com/",
                        "https://www.instagram.com/"
                    ]
                },
                {
                    title: "Entertainment",
                    linkNames: [
                        "Youtube",
                        "Pinterest"
                    ],
                    linkTargets: [
                        "https://www.youtube.com/",
                        "https://www.pinterest.com/"
                    ]
                }, 
                // {
                //     title: "Social",
                //     linkNames: [],
                //     linkTargets: []
                // }
            ]
        }
    }


    render(){
        return (
            <div>
                <span class="navbar">
                    {this.state.dropdowns.map(value => {
                        return <Dropdown 
                            title={value.title}
                            linkNames={value.linkNames}
                            linkTargets={value.linkTargets}
                        />
                    })}
                </span>
            </div>
        )
    }
}

function Dropdown(props){
    const title = props.title;
    const linkNames = props.linkNames;
    const linkTargets = props.linkTargets;

    return <div>
        <div class="dropdown">
        <button class="dropbtn">{title}</button>
            <div class="dropdown-content">
                {(linkNames && linkTargets) ? (
                        linkNames.map(
                            function(value, index){
                                return <a href={linkTargets[index]}>{value}</a>
                            }
                        )
                    ) : (
                        <div></div>
                    ) 
                }
            </div>
        </div>
    </div>
}