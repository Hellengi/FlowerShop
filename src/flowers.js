import React from "react";
import "./flowers.css"

class Flowers extends React.Component {
    render() {
        return (
            <>
                <div className={"flowers"}>
                    <div className={"list-of-flowers-container"}>
                        <ListOfFlowers/>
                    </div>
                    <div className={"selected-flowers"}></div>
                </div>
            </>
        )
    }
}
class ListOfFlowers extends React.Component {
    constructor(props) {
        super(props);
        this.blocks = []
        for (let i = 0; i < 24; i++) {
            this.blocks.push(<Block_ key={i}/>)
        }
        this.state = {
            blocks: this.blocks
        }
    }
    render() {
        return (
            <div className={"list-of-flowers"}>
                {this.state.blocks}
            </div>
        )
    }
}
function Block_() {
    function RandomColor() {
        let numbers = ["9", "A", "B", "C", "D", "E"]
        let R = numbers[Math.floor(Math.random() * 6)]
        let G = numbers[Math.floor(Math.random() * 6)]
        let B = numbers[Math.floor(Math.random() * 6)]
        return "#" + R + G + B
    }
    return <div className={"block_"} style={{backgroundColor: RandomColor()}}/>
}

export default Flowers