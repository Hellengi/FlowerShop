import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./header.css"

function Header(props) {
    const location = useLocation()
    const [style, setStyle] = useState("")
    useEffect(() => {
        switch (location.pathname) {
            case "/cart":
                setStyle("header-orange")
                break
            case "/profile":
                setStyle("header-grey")
                break
            default:
                setStyle("header-green")
        }
    }, [location])
    return (
        <header className={`header ${style}`}>
            <Logo/>
            <Search/>
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
            <img src={true ? "logo.png" : "flower-icon.png"} alt={""} className={"logo"}/>
            <p className={"logo-name"}>{true ? "" : "Flower Shop"}</p>
        </div>
    )
}
function Search() {
    return <input type={"text"} placeholder={"Поиск..."} className={"search"}></input>
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