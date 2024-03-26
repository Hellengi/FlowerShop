import React from "react";
import Card from "./card";
import "./bouquets.css"

class Bouquets extends React.Component {
    constructor(props) {
        super(props);
        this.blocks = []
        for (let i = 0; i < 24; i++) {
            this.blocks.push(<Card key={i}/>)
        }
        this.state = {
            blocks: this.blocks
        }
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