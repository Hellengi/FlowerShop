import React from "react";
import ReactDOM from 'react-dom/client'
import BackImage from "./back";
import './index.css'
const Root = ReactDOM.createRoot(document.getElementById("root"))
class Body extends React.Component {
    render() {
        return (
            <div>
                <BackImage/>
                <Header/>
                <Main/>
            </div>
        )
    }
}
class Main extends React.Component {
    render() {
        return (
            <div>
                <SubHeader></SubHeader>
                <Catalog/>
            </div>
        )
    }
}
class Header extends React.Component {
    render() {
        return (
            <header className={"header"}>
                <Logo/>
                <Search/>
                <User/>
            </header>
        )
    }
}
function Logo() {
    return <img src={"flower-icon.png"} alt={""} className={"logo"}/>
}
function Search() {
    return <input type={"text"} placeholder={"Поиск..."} className={"search"}></input>
}
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logged: true
        }
        this.logStatusChange = this.logStatusChange.bind(this)
    }
    logStatusChange() {
        this.setState(prevState => {
            return {
                logged: !prevState.logged
            }
        })
    }
    render() {
        const {logged} = this.state
        return (
            <div className={`user ${logged ? 'user-logged' : 'user-not-logged'}`}>
                <Cart/>
                {logged && <Favorites/>}
                {logged && <Profile/>}
                {logged ? <LogOut logStatusChange={this.logStatusChange}/> : <LogIn logStatusChange={this.logStatusChange}/>}
            </div>
        )
    }
}
function Cart() {
    return <button className={"button"}>Корзина</button>
}
function Favorites() {
    return <button className={"button"}>Избранное</button>
}
function LogIn({logStatusChange}) {
    return <button onClick={logStatusChange} className={"button"}>Войти</button>
}
function LogOut({logStatusChange}) {
    return <button onClick={logStatusChange} className={"button"}>Выйти</button>
}
function Profile() {
    return <button className={"button"}>Профиль</button>
}
class Catalog extends React.Component {
    render() {
        const blocks = []
        for (let i = 0; i < 24; i++) {
            blocks.push(<Block key={i}/>)
        }
        return (
            <main className={"catalog"}>
                {blocks}
            </main>
        )
    }
}
function SubHeader() {
    return (
        <div className={"sub-header"}>
            <ToTheManual></ToTheManual>
        </div>
    )
}
function ToTheManual() {
    return <button className={"to-the-manual"}>Составить свой букет →</button>
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
Root.render(<Body></Body>)