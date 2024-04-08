import React from "react";
import {useNavigate} from "react-router-dom";
import "./header.css"

function Header(props) {
    const style = "header-" + props.color
    return (
        <header className={`header ${style}`}>
            <Logo/>
            <Search/>
            <User
                cancelLogin={props.cancelLogin}
                logged={props.logged}
                page={props.page}
            />
        </header>
    )
}
function Logo() {
    const navigate = useNavigate()
    return (
        <div className={"logo-container"} onClick={()=>{navigate("/")}}>
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
                {this.props.page !== "cart" && <Cart/>}
                {logged && <Profile/>}
                {logged ? <LogOut exit={this.exit}/> : <LogIn/>}
            </div>
        )
    }
}
function Cart() {
    const navigate = useNavigate()
    return <button className={"button"} onClick={()=>{navigate("/cart")}}>Корзина</button>
}
function LogIn() {
    const navigate = useNavigate()
    return <button className={"button"} onClick={()=>{navigate("/login")}}>Войти</button>
}
function LogOut({exit}) {
    return <button onClick={exit} className={"button"}>Выйти</button>
}
function Profile() {
    const navigate = useNavigate()
    return <button className={"button"} onClick={()=>{navigate("/profile")}}>Профиль</button>
}

export default Header