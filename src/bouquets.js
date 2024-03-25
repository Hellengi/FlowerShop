import React from "react";
import "./bouquets.css"

class Bouquets extends React.Component {
    constructor(props) {
        super(props);
        this.blocks = []
        for (let i = 0; i < 24; i++) {
            this.blocks.push(<Block key={i}/>)
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
function Block() {
    function RandomColor() {
        let numbers = ["9", "A", "B", "C", "D", "E"]
        let R = numbers[Math.floor(Math.random() * 6)]
        let G = numbers[Math.floor(Math.random() * 6)]
        let B = numbers[Math.floor(Math.random() * 6)]
        return "#" + R + G + B
    }
    return <div className={"block"} style={{backgroundColor: RandomColor()}}/>
}

export default Bouquets