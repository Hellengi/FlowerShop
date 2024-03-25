import React from "react";
import "./header.css"

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
        this.state = {
            logged: true
        }
        this.logStatusChange = this.logStatusChange.bind(this)
    }
    logStatusChange() {
        let confirmed = true
        if (this.state.logged) {
            confirmed = window.confirm("Вы действительно хотите выйти из аккаунта?")
        }
        this.setState(prevState => {
            if (prevState.logged) {
                if (confirmed) return {
                    logged: false
                }
            }
            else return {
                logged: true
            }
        })
    }
    render() {
        const {logged} = this.state
        return (
            <div className={`user ${logged ? 'user-logged' : 'user-not-logged'}`}>
                <Cart/>
                {logged && <Profile/>}
                {logged ? <LogOut logStatusChange={this.logStatusChange}/> : <LogIn logStatusChange={this.logStatusChange}/>}
            </div>
        )
    }
}
function Cart() {
    return <button className={"button"}>Корзина</button>
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

export default Header