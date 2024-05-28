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
        const blocks = []
        const response = await fetch('http://localhost:8080/bouquets')
        const data = await response.json()
        let i = 0
        for (const info of data) {
            blocks.push(<Card
                key={i}
                info={info}
                openImage={this.props.openImage}
                minimized={false}
            />)
            i += 1
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