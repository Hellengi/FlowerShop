import React from "react";
import Card from "./card";
import "./bouquets.css"

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
        const role_response = await fetch('http://localhost:8080/role')
        const role = await role_response.text()

        const blocks = []
        const response = await fetch('http://localhost:8080/bouquets')
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
            <div className={"bouquets"}>
                {this.state.blocks}
            </div>
        )
    }
}

export default Bouquets