import { h, Component } from 'preact';

function LinkColumn(props){
    const header = props.header;
    const links = props.links;

    return <div class="column">
        <h3 class="columnHeader">{header}</h3>
        {
        links ? links.map(link => {
            return <a class="columnLink" href={link.url}>
                    {link.text}
                </a>
        }) : <br/>
        }
    </div>
}
export class LinkPanel extends Component {
    render(){
        const socialLinks = [
            {
                url: "https://www.facebook.com/",
                text: "Facebook"
            }
        ]


        return(
            <div class="link panel">
                <LinkColumn
                    header="Social"
                    links={socialLinks}
                />

                <LinkColumn
                    header="Entertainment"
                />

                <LinkColumn
                    header="Productivity"
                />

                <LinkColumn
                    header="Financial"
                />

            </div>
        )
    }
}