import React from "react";
import Card from "./card";
import "./main.css"

class Bouquets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }
    componentDidMount() {
        void this.init()
    }
    async init() {
        const role_response = await fetch('/api/role')
        const role = await role_response.text()

        const blocks = []
        const response = await fetch('/api/bouquets')
        const data = await response.json()
        for (const info of data) {
            blocks.push(<Card
                key={info.id}
                info={info}
                openImage={this.props.openImage}
                mode={"bouquet"}
                role={role}
            />)
        }
        this.setState({
            blocks
        })
    }
    render() {
        return (
            <div className={"container dark-container grid-container"}>
                {this.state.blocks}
            </div>
        )
    }
}

export default Bouquets