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
            <User/>
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
function User() {
    const navigate = useNavigate()
    const location = useLocation()
    const [logged, setLogged] = useState(false)
    function exit() {
        if (window.confirm("Вы действительно хотите выйти из аккаунта?")) {
            void fetch('http://localhost:8080/logout')
            setLogged(false)
            location.pathname === "/profile" && navigate('/')
        }
    }
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [])
    async function init() {
        const response = await fetch('http://localhost:8080/logged')
        const data = await response.json()
        setLogged(data)
    }
    return (
        <div className={`user ${logged ? 'user-logged' : 'user-not-logged'}`}>
            <ToCart/>
            {logged && <ToProfile/>}
            {logged ? <LogOut exit={exit}/> : <LogIn/>}
        </div>
    )
}
function ToCart() {
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
function ToProfile() {
    const navigate = useNavigate()
    return <button className={"default-button"} onClick={()=>{navigate("/profile")}}>Профиль</button>
}

export default Header