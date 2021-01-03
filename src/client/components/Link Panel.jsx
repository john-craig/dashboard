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
            },
            {
                url: "https://www.instagram.com/",
                text: "Instragram"
            }
        ]

        const entertainLinks = [
            {
                url: "https://www.youtube.com/",
                text: "YouTube"
            },
            {
                url: "https://music.youtube.com/",
                text: "YouTube Music"
            },
            {
                url: "https://www.twitch.tv/",
                text: "Twitch"
            },
            {
                url: "pinterest.com",
                text: "Pinterest"
            }
        ]

        const productLinks = [
            {
                url: "",
                text: ""
            }
        ]

        const financeLinks = [
            {
                url: "https://www.bankofamerica.com/",
                text: "Bank of America"
            },
            {
                url: "https://www.ml.com/",
                text: "Merill Lynch"
            },
            {
                url: "https://www.coinbase.com/",
                text: "Coinbase"
            },
        ]


        return(
            <div class="link panel">
                <LinkColumn
                    header="Social"
                    links={socialLinks}
                />

                <LinkColumn
                    header="Entertainment"
                    links={entertainLinks}
                />

                <LinkColumn
                    header="Productivity"
                    links={productLinks}
                />

                <LinkColumn
                    header="Financial"
                    links={financeLinks}
                />
            </div>
        )
    }
}