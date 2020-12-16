import { h, Component } from 'preact';

export class LinkPanel extends Component {


    render(){
        return(
            <div class="linkPanel">
                <p>Help</p>
                <LinkColumn
                    header="Social"
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


function LinkColumn(props){
    const header = props.header;
    const links = props.links;

    return <div class="linkColumn">
        <h1>{header}</h1>
        {links.map(link => {
            return <a href={link.url}>{link.text}</a>
        })}
    </div>
}