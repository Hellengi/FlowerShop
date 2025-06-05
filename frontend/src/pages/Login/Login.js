import React, {useEffect, useState} from "react"
import {Navigate, useNavigate} from "react-router-dom";
import "./Login.css"
import BackImage from "../../components/Back/Back";

function Login() {
    const [loginPanel, setLoginPanel] = useState(true)
    const [switching, setSwitching] = useState(false)
    const [exit, setExit] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function toSignup() {
        setLoginPanel(false)
        setSwitching(true)
        setTimeout(()=>{
            setSwitching(false)
        }, 500)
    }
    function toLogin() {
        setLoginPanel(true)
        setSwitching(true)
        setTimeout(()=>{
            setSwitching(false)
        }, 500)
    }
    const handleUsernameChange = (event) => {
        setName(event.target.value)
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };
    useEffect(() => {
        document.addEventListener("keydown", escPressed)
        return () => {
            document.removeEventListener("keydown", escPressed)
        }
    }, [])
    function escPressed(event) {
        if (event.key === "Escape") {
            setExit(true)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        void init()
    }, [])
    async function init() {
        const response = await fetch('/api/auth/status', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const logged = await response.json()
        if (logged) {
            navigate('/')
        }
    }
    return (
        <>
            {(exit) && <Navigate to={"/"}/>}
            <BackImage page={"login"}/>
            <div className={"login-container"}>
                <div
                    className={"panel"}
                    style={{
                        transform: `translateX(${loginPanel ? "0" : "360px"})`,
                        borderRadius: loginPanel ? "10px 0 0 10px" : "0 10px 10px 0"
                }}>
                    <div className={`panel-background panel-background-1 ${loginPanel ? "" : "panel-background-hidden"}`}/>
                    <div className={`panel-background panel-background-2 ${loginPanel ? "panel-background-hidden" : ""}`}/>
                    <img
                        src={"arrow.png"}
                        className={`back-button`}
                        style={{opacity: switching ? "0" : "1"}}
                        onClick={()=>{setExit(true)}}
                        alt={""}
                    />
                    <div
                        className={"panel-text-container"}
                        style={{transform: `translateX(${loginPanel ? "0" : "-360px"})`}}
                    >
                        <Panel1 toSignup={toSignup} loginPanel={loginPanel}/>
                        <Panel2 toLogin={toLogin} loginPanel={loginPanel}/>
                    </div>
                </div>
                <div
                    className={"log-sig signup"}
                    style={{
                        zIndex: "-1",
                        transform: `translateY(${loginPanel ? "480px" : "0"})`,
                        opacity: loginPanel ? "0" : "1"
                }}>
                    <h1>Создать аккаунт</h1>
                    <input type={"text"} placeholder={"Имя"} onInput={handleUsernameChange}/>
                    <input type={"text"} placeholder={"E-mail"} onInput={handleEmailChange}/>
                    <input type={"password"} placeholder={"Пароль"} onInput={handlePasswordChange}/>
                    <button
                        className={"volume-button default-button large-button"}
                        onClick={async () => {
                            if (!name.trim()) {
                                alert("Введите имя");
                                return;
                            }
                            if (!email.trim()) {
                                alert("Введите логин");
                                return;
                            }
                            if (!password.trim()) {
                                alert("Введите пароль");
                                return;
                            }
                            const data = {
                                name: name,
                                email: email,
                                password: password
                            };
                            const response = await fetch('/api/auth/signup', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(data),
                            });
                            const result = await response.json();
                            if (result) {
                                setExit(true)
                            }
                            else {
                                alert("Почта уже используется")
                            }
                        }}
                    ><span>Регистрация</span></button>
                </div>
                <div
                    className={"log-sig login"}
                    style={{
                        zIndex: "-1",
                        transform: `translateY(${loginPanel ? "0" : "480px"})`,
                        opacity: loginPanel ? "1" : "0"
                }}>
                    <h1>Войти</h1>
                    <button
                        className={"text-link admin-link"}
                        onClick={async () => {
                            alert("Данные для входа:\nE-mail: admin@gmail.com\nПароль: password");
                        }}
                    >Войти как Администратор</button>
                    <input type={"text"} placeholder={"E-mail"} onInput={handleEmailChange}/>
                    <input type={"password"} placeholder={"Пароль"} onInput={handlePasswordChange}/>
                    <button className={"text-link"}>Забыли пароль?</button>
                    <button
                        className={"volume-button default-button large-button"}
                        onClick={async () => {
                            if (!email.trim()) {
                                alert("Введите логин");
                                return;
                            }
                            if (!password.trim()) {
                                alert("Введите пароль");
                                return;
                            }
                            const data = {
                                email: email,
                                password: password
                            };
                            const response = await fetch('/api/auth/login', {
                                method: 'POST',
                                credentials: 'include',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(data),
                            });
                            const result = await response.json();
                            if (result) {
                                setExit(true)
                            }
                            else {
                                alert("Неверный логин или пароль")
                            }
                        }}
                    ><span>Вход</span></button>
                </div>
            </div>
        </>
    )
}
function Panel1({toSignup, loginPanel}) {
    return (
        <div
            className={"panel-text"}
            style={{transform: `translateY(${loginPanel ? "0" : "-120px"})`}}
        >
            <h1>Приветствуем вас!</h1>
            <p>Нет аккаунта? Тогда зарегистрируйтесь и продолжайте покупки</p>
            <button onClick={toSignup}>Регистрация</button>
        </div>
    )
}
function Panel2({toLogin, loginPanel}) {
    return (
        <div
            className={"panel-text"}
            style={{transform: `translateY(${loginPanel ? "120px" : "0"})`}}
        >
            <h1>Добро пожаловать!</h1>
                <p>Уже есть аккаунт? Войдите в свой профиль для продолжения</p>
            <button onClick={toLogin}>Войти</button>
        </div>
    )
}
export default Login