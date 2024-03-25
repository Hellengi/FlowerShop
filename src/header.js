import React from "react";
import "./header.css"

class Header extends React.Component {
    render() {
        return (
            <header className={"header"}>
                <Logo/>
                <Search/>
                <User
                    enterLoginPage={this.props.enterLoginPage}
                    cancelLogin={this.props.cancelLogin}
                    logged={this.props.logged}
                />
            </header>
        )
    }
}
function Logo() {
    return (
        <div className={"logo-container"}>
            <img src={"flower-icon.png"} alt={""} className={"logo"}/>
            <p className={"logo-name"}>Flower Shop</p>
        </div>
    )
}
function Search() {
    return <input type={"text"} placeholder={"Поиск..."} className={"search"}></input>
}
class User extends React.Component {
    constructor(props) {
        super(props)
        this.exit = this.exit.bind(this)
    }
    exit() {
        if (this.props.logged && window.confirm("Вы действительно хотите выйти из аккаунта?")) {
            this.props.cancelLogin()
        }
    }
    render() {
        const {logged} = this.props
        return (
            <div className={`user ${logged ? 'user-logged' : 'user-not-logged'}`}>
                <Cart/>
                {logged && <Profile/>}
                {logged ? <LogOut exit={this.exit}/> : <LogIn enterLoginPage={this.props.enterLoginPage}/>}
            </div>
        )
    }
}
function Cart() {
    return <button className={"button"}>Корзина</button>
}
function LogIn({enterLoginPage}) {
    return <button onClick={() => {
        enterLoginPage()
    }} className={"button"}>Войти</button>
}
function LogOut({exit}) {
    return <button onClick={exit} className={"button"}>Выйти</button>
}
function Profile() {
    return <button className={"button"}>Профиль</button>
}

export default Header