import React from "react"
import {Navigate} from "react-router-dom";
import "./login.css"
import BackImage from "./back";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPanel: true,
            switching: false,
            exit: false,
            name: "",
            email: "",
            password: ""
        }
        this.toSignup = this.toSignup.bind(this)
        this.toLogin = this.toLogin.bind(this)
        this.escPressed = this.escPressed.bind(this)
    }
    toSignup() {
        this.setState({
            loginPanel: false,
            switching: true
        })
        setTimeout(()=>{
            this.setState({
                switching: false
            })
        }, 500)
    }
    toLogin() {
        this.setState({
            loginPanel: true,
            switching: true
        })
        setTimeout(()=>{
            this.setState({
                switching: false
            })
        }, 500)
    }

    handleUsernameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    componentDidMount() {
        document.addEventListener("keydown", this.escPressed)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escPressed)
    }
    escPressed(event) {
        if (event.key === "Escape") {
            this.setState({
                exit: true
            })
        }
    }
    render() {
        return (
            <>
                {(this.state.exit || this.props.logged) && <Navigate to={"/"}/>}
                <BackImage page={"login"}/>
                <div className={"login-container"}>
                    <div
                        className={"panel"}
                        style={{
                            transform: `translateX(${this.state.loginPanel ? "0" : "360px"})`,
                            borderRadius: this.state.loginPanel ? "10px 0 0 10px" : "0 10px 10px 0"
                    }}>
                        <div className={`panel-background panel-background-1 ${this.state.loginPanel ? "" : "panel-background-hidden"}`}/>
                        <div className={`panel-background panel-background-2 ${this.state.loginPanel ? "panel-background-hidden" : ""}`}/>
                        <img
                            src={"arrow.png"}
                            className={`back-button`}
                            style={{opacity: this.state.switching ? "0" : "1"}}
                            onClick={()=>{this.setState({exit: true})}}
                            alt={""}
                        />
                        <div
                            className={"panel-text-container"}
                            style={{transform: `translateX(${this.state.loginPanel ? "0" : "-360px"})`}}
                        >
                            <Panel1 toSignup={this.toSignup} loginPanel={this.state.loginPanel}/>
                            <Panel2 toLogin={this.toLogin} loginPanel={this.state.loginPanel}/>
                        </div>
                    </div>
                    <div
                        className={"log-sig signup"}
                        style={{
                            zIndex: "-1",
                            transform: `translateY(${this.state.loginPanel ? "480px" : "0"})`,
                            opacity: this.state.loginPanel ? "0" : "1"
                    }}>
                        <h1>Создать аккаунт</h1>
                        <input type={"text"} placeholder={"Имя"} onInput={this.handleUsernameChange}/>
                        <input type={"text"} placeholder={"E-mail"} onInput={this.handleEmailChange}/>
                        <input type={"text"} placeholder={"Пароль"} onInput={this.handlePasswordChange}/>
                        <button
                            className={"volume-button default-button large-button"}
                            onClick={() => {
                                if (!this.state.name.trim()) {
                                    alert("Введите имя");
                                    return;
                                }
                                if (!this.state.email.trim()) {
                                    alert("Введите логин");
                                    return;
                                }
                                if (!this.state.password.trim()) {
                                    alert("Введите пароль");
                                    return;
                                }
                                const data = {
                                    name: this.state.name,
                                    email: this.state.email,
                                    password: this.state.password
                                };
                                void fetch('/api/signup', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(data)
                                });
                                this.setState({
                                    exit: true
                                })
                            }}
                        ><span>Регистрация</span></button>
                    </div>
                    <div
                        className={"log-sig login"}
                        style={{
                            zIndex: "-1",
                            transform: `translateY(${this.state.loginPanel ? "0" : "480px"})`,
                            opacity: this.state.loginPanel ? "1" : "0"
                    }}>
                        <h1>Войти</h1>
                        <button
                            className={"text-link admin-link"}
                            onClick={async () => {
                                alert("Данные для входа:\nE-mail: admin@gmail.com\nПароль: password");
                            }}
                        >Войти как Администратор</button>
                        <input type={"text"} placeholder={"E-mail"} onInput={this.handleEmailChange}/>
                        <input type={"text"} placeholder={"Пароль"} onInput={this.handlePasswordChange}/>
                        <button className={"text-link"}>Забыли пароль?</button>
                        <button
                            className={"volume-button default-button large-button"}
                            onClick={async () => {
                                if (!this.state.email.trim()) {
                                    alert("Введите логин");
                                    return;
                                }
                                if (!this.state.password.trim()) {
                                    alert("Введите пароль");
                                    return;
                                }
                                const data = {
                                    email: this.state.email,
                                    password: this.state.password
                                };
                                const response = await fetch('/api/login', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(data)
                                });
                                const result = await response.json();
                                if (result) {
                                    this.setState({
                                        exit: true
                                    })
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