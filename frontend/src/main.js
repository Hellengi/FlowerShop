import React from "react";
import "./main.css"
import "./button.css"
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
                <SubHeader
                    mainSwitch={this.mainSwitch}
                    mainStatus={this.state.mainStatus}
                    bouquetsDisplayed={this.state.bouquetsDisplayed}
                    flowersDisplayed={this.state.flowersDisplayed}
                ></SubHeader>
                <div className={"main-body"} style={{transform: `translateX(${this.state.mainStatus ? "0" : "-100vw"})`}}>
                    <div className={"bouquets-container"} style={{
                        transform: `rotate(${this.state.mainStatus ? "0" : "35deg"})`,
                        height: this.state.bouquetsDisplayed ? 1 : 0,
                        overflow: this.state.bouquetsDisplayed ? 'initial' : 'hidden'
                    }}>
                        <Bouquets openImage={this.props.openImage}/>
                    </div>
                    <div className={"flowers-container"} style={{
                        transform: `rotate(${this.state.mainStatus ? "-35deg" : "0"})`,
                        height: this.state.flowersDisplayed ? 1 : 0,
                        overflow: this.state.flowersDisplayed ? 'initial' : 'hidden'
                    }}>
                        <Flowers openImage={this.props.openImage}/>
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
        const { mainSwitch, mainStatus, bouquetsDisplayed, flowersDisplayed } = this.props
        return (
            <div className={"sub-header"}>
                <div className={"to-bouquets"} style={{transform: `translateX(${mainStatus ? "-50vw" : "0"})`}}>
                    {flowersDisplayed && <button
                        onClick={() => {
                            mainSwitch(true)
                        }}
                        className={"volume-button default-button large-button"}
                    ><span>← Выбрать из готовых букетов</span></button>}
                </div>
                <div className={"to-flowers"} style={{transform: `translateX(${mainStatus ? "0" : "50vw"})`}}>
                    {bouquetsDisplayed && <button
                        onClick={() => {
                            mainSwitch(false)
                        }}
                        className={"volume-button default-button large-button"}
                    ><span>Составить свой букет →</span></button>}
                </div>
                <div className={"create-bouquet"} style={{opacity: mainStatus ? 1 : 0, transform: `translateX(${mainStatus ? "0" : "-200px"})`}}>
                    {this.state.role === "admin" && bouquetsDisplayed && <button
                        onClick={() => {
                            void this.createBouquet()
                        }}
                        className={"volume-button default-button azure-button"}
                    ><span>Добавить букет в БД</span></button>}
                </div>
                <div className={"create-flower"} style={{opacity: !mainStatus ? 1 : 0, transform: `translateX(${!mainStatus ? "0" : "200px"})`}}>
                    {this.state.role === "admin" && flowersDisplayed && <button
                        onClick={() => {
                            void this.createFlower()
                        }}
                        className={"volume-button default-button azure-button"}
                    ><span>Добавить цветок в БД</span></button>}
                </div>
            </div>
        )
    }
}

export default Main