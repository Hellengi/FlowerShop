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
            <User style={style}/>
        </header>
    )
}
function Logo() {
    const navigate = useNavigate()
    return (
        <div className={"logo-container"} onClick={()=>{navigate("/")}}>
            <img src={"/flower-icon.png"} alt={""} className={"logo-image"}/>
            <p className={"logo-name"}>Flower Shop</p>
        </div>
    )
}
function Search({style}) {
    return <input type={"text"} placeholder={"Поиск..."}
                  className={`search ${style==="system" ? "search-light" : ""}`}></input>
}
function User({style}) {
    const navigate = useNavigate()
    const [logged, setLogged] = useState(false)
    async function exit() {
        if (window.confirm("Вы действительно хотите выйти из аккаунта?")) {
            await fetch('http://localhost:8080/logout')
            await setLogged(false)
            await navigate('/')
            window.location.reload()
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
            <ToCart style={style}/>
            {logged && <ToProfile style={style}/>}
            {logged ? <LogOut style={style} exit={exit}/> : <LogIn style={style}/>}
        </div>
    )
}
function ToCart({style}) {
    const navigate = useNavigate()
    return <button className={`user volume-button ${style === 'system' ? 'cyan-button' : 'default-button'}`} onClick={()=>{navigate("/cart")}}><span>Корзина</span></button>
}
function LogIn({style}) {
    const navigate = useNavigate()
    return <button className={`user volume-button ${style === 'system' ? 'cyan-button' : 'default-button'}`} onClick={()=>{navigate("/login")}}><span>Войти</span></button>
}
function LogOut({exit, style}) {
    return <button className={`user volume-button ${style === 'system' ? 'cyan-button' : 'default-button'}`} onClick={exit}><span>Выйти</span></button>
}
function ToProfile({style}) {
    const navigate = useNavigate()
    return <button className={`user volume-button ${style === 'system' ? 'cyan-button' : 'default-button'}`} onClick={()=>{navigate("/profile")}}><span>Профиль</span></button>
}

export default Header