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
            toFlowersButtonDisplayed: true,
            role: "unauthorized"
        }
        void this.getRole()
    }
    async getRole() {
        const role_response = await fetch('http://localhost:8080/role')
        const role = await role_response.text()
        this.setState({
            role
        })
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
    async createBouquet() {
        const title = prompt("Введите название букета")
        if (title === null) return
        const price = parseInt(prompt("Введите стоимость букета"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch('http://localhost:8080/create-bouquet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        window.location.reload()
    }
    async createFlower() {
        const title = prompt("Введите название цветка")
        if (title === null) return
        const price = parseInt(prompt("Введите стоимость цветка"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch('http://localhost:8080/create-flower', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        window.location.reload()
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
                <div className={"create-bouquet"}>
                    {this.state.role === "admin" && !this.state.toBouquetsButtonDisplayed && <button
                        onClick={() => {
                            void this.createBouquet()
                        }}
                        className={"default-button azure-button"}
                    >Добавить букет в БД</button>}
                </div>
                <div className={"create-flower"}>
                    {this.state.role === "admin" && !this.state.toFlowersButtonDisplayed && <button
                        onClick={() => {
                            void this.createFlower()
                        }}
                        className={"default-button azure-button"}
                    >Добавить цветок в БД</button>}
                </div>
            </div>
        )
    }
}

export default Main