import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./header.css"

function Header(props) {
    const location = useLocation()
    const [style, setStyle] = useState("")
    useEffect(() => {
        switch (location.pathname) {
            case "/cart":
                setStyle("header-blue")
                break
            case "/profile":
                setStyle("system")
                break
            default:
                setStyle("header-purple")
        }
    }, [location])
    return (
        <header className={`header ${style}`}>
            <Logo/>
            <Search style={style}/>
            <User
                cancelLogin={props.cancelLogin}
                logged={props.logged}
            />
        </header>
    )
}
function Logo() {
    const navigate = useNavigate()
    return (
        <div className={"logo-container"} onClick={()=>{navigate("/")}}>
            <img src={"flower-icon.png"} alt={""} className={"logo-image"}/>
            <p className={"logo-name"}>Flower Shop</p>
        </div>
    )
}
function Search({style}) {
    return <input type={"text"} placeholder={"Поиск..."}
                  className={`search ${style==="system" ? "search-light" : ""}`}></input>
}
function User({logged, cancelLogin}) {
    function exit() {
        if (logged && window.confirm("Вы действительно хотите выйти из аккаунта?")) {
            cancelLogin()
        }
    }
    const location = useLocation()
    return (
        <div className={`user ${logged ? 'user-logged' : 'user-not-logged'}`}>
            {location.pathname !== "/cart" && <Cart/>}
            {logged && <Profile/>}
            {logged ? <LogOut exit={exit}/> : <LogIn/>}
        </div>
    )
}
function Cart() {
    const navigate = useNavigate()
    return <button className={"default-button"} onClick={()=>{navigate("/cart")}}>Корзина</button>
}
function LogIn() {
    const navigate = useNavigate()
    return <button className={"default-button"} onClick={()=>{navigate("/login")}}>Войти</button>
}
function LogOut({exit}) {
    return <button className={"default-button"} onClick={exit}>Выйти</button>
}
function Profile() {
    const navigate = useNavigate()
    return <button className={"default-button"} onClick={()=>{navigate("/profile")}}>Профиль</button>
}

export default Header