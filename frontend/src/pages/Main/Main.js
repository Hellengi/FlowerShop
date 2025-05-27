import React from "react";
import "./Main.css"
import "../../components/Button/Button.css"
import Bouquets from "../../features/Bouquets/Bouquets";
import Flowers from "../../features/Flowers/Flowers";
import Header from "../../components/Header/Header";
import BackImage from "../../components/Back/Back";

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
    componentDidMount() {
        void this.init()
    }
    async init() {
        const response = await fetch('/api/', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        if (response.ok) {
            const message = "Если на странице нет карточек с товарами, значит backend ещё не успел запуститься.\n\n" +
                "Возможно вы открываете приложение со страницы https://flowershop-t3d1.onrender.com/, " +
                "в этом случае проблема связана с тем, что используется бесплатная версия Render.\n\n" +
                "Необходимо подождать несколько минут, пока backend не запустится."
            alert(message)
            console.log(message)
        }
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
        const role_response = await fetch('/api/users/me/role', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
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
        await fetch('/api/bouquets', {
            method: 'POST',
            credentials: 'include',
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
        await fetch('/api/flowers', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
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