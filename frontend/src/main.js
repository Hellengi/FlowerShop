import React from "react";
import "./main.css"
import Bouquets from "./bouquets";
import Flowers from "./flowers";
import Header from "./header";
import BackImage from "./back";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainStatus: true,
            bouquetsDisplayed: true,
            flowersDisplayed: false
        }
        this.mainSwitch = this.mainSwitch.bind(this)
    }
    mainSwitch(status) {
        this.setState({
            mainStatus: status,
            bouquetsDisplayed: true,
            flowersDisplayed: true
            }
        )
        setTimeout(() => {
            this.setState({
                bouquetsDisplayed: status,
                flowersDisplayed: !status
            })
        }, 1000)
    }
    render() {
        return (
            <>
                <BackImage page={"main"}/>
                <Header/>
                <SubHeader mainSwitch={this.mainSwitch} mainStatus={this.state.mainStatus}></SubHeader>
                <div className={"main-body"} style={{transform: `translateX(${this.state.mainStatus ? "0" : "-100vw"})`}}>
                    <div className={"bouquets-container"} style={{transform: `rotate(${this.state.mainStatus ? "0" : "35deg"})`}}>
                        {this.state.bouquetsDisplayed && <Bouquets openImage={this.props.openImage}/>}
                    </div>
                    <div className={"flowers-container"} style={{transform: `rotate(${this.state.mainStatus ? "-35deg" : "0"})`}}>
                        {this.state.flowersDisplayed && <Flowers openImage={this.props.openImage}/>}
                    </div>
                </div>
            </>
        )
    }
}
class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toBouquetsButtonDisplayed: false,
            toFlowersButtonDisplayed: true
        }
    }
    buttonSwitch(status) {
        this.setState({
            toBouquetsButtonDisplayed: true,
            toFlowersButtonDisplayed: true
        })
        setTimeout(() => {
            this.setState({
                toBouquetsButtonDisplayed: !status,
                toFlowersButtonDisplayed: status
            })
        }, 1000)
    }
    render() {
        const { mainSwitch, mainStatus } = this.props
        return (
            <div className={"sub-header"}>
                <div className={"to-bouquets"} style={{transform: `translateX(${mainStatus ? "-50vw" : "0"})`}}>
                    {this.state.toBouquetsButtonDisplayed && <button
                        onClick={() => {
                            mainSwitch(true)
                            this.buttonSwitch(true)
                        }}
                        className={"default-button large-button"}
                    >← Выбрать из готовых букетов</button>}
                </div>
                <div className={"to-flowers"} style={{transform: `translateX(${mainStatus ? "0" : "50vw"})`}}>
                    {this.state.toFlowersButtonDisplayed && <button
                        onClick={() => {
                            mainSwitch(false)
                            this.buttonSwitch(false)
                        }}
                        className={"default-button large-button"}
                    >Составить свой букет →</button>}
                </div>
            </div>
        )
    }
}

export default Main