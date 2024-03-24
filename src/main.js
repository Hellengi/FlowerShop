import React from "react";
import "./main.css"

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainStatus: true,
            mainDisplayed: true,
            manualDisplayed: false
        }
        this.mainSwitch = this.mainSwitch.bind(this)
    }
    mainSwitch(status) {
        this.setState({
            mainStatus: status,
            mainDisplayed: true,
            manualDisplayed: true
            }
        )
        setTimeout(() => {
            this.setState({
                mainDisplayed: status,
                manualDisplayed: !status
            })
        }, 1000)
    }
    render() {
        return (
            <>
                <SubHeader mainSwitch={this.mainSwitch} mainStatus={this.state.mainStatus}></SubHeader>
                <div className={"main-body"} style={{transform: `translateX(${this.state.mainStatus ? "0" : "-100vw"})`}}>
                    <div className={"main-catalog-container"} style={{transform: `rotate(${this.state.mainStatus ? "0" : "35deg"})`}}>
                        {this.state.mainDisplayed && <MainCatalog/>}
                    </div>
                    <div className={"manual-catalog-container"} style={{transform: `rotate(${this.state.mainStatus ? "-35deg" : "0"})`}}>
                        {this.state.manualDisplayed && <ManualCatalog/>}
                    </div>
                </div>
            </>
        )
    }
}
class SubHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { mainSwitch, mainStatus } = this.props
        return (
            <div className={"sub-header"}>
                <button
                    onClick={() => {mainSwitch(true)}}
                    className={"from-the-manual"}
                    style={{transform: `translateX(${mainStatus ? "-50vw" : "0"})`}}
                >← Выбрать из готовых букетов</button>
                <button
                    onClick={() => {mainSwitch(false)}}
                    className={"to-the-manual"}
                    style={{transform: `translateX(${mainStatus ? "0" : "50vw"})`}}
                >Составить свой букет →</button>
            </div>
        )
    }
}
class MainCatalog extends React.Component {
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
            <div className={"main-catalog"}>
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
class ManualCatalog extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <>
                <div className={"manual-catalog"} style={{margin: "10vh 10vw", height: "80vh", width: "80vw", backgroundColor: "#0007"}}>
                    MANUAL
                </div>
            </>
        )
    }
}

export default Main