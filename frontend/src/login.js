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
                            className={"default-button large-button"}
                            onClick={() => {
                                const data = {
                                    name: this.state.name,
                                    email: this.state.email,
                                    password: this.state.password
                                };
                                void fetch('http://localhost:8080/signup', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(data)
                                });
                                this.setState({
                                    exit: true
                                })
                            }}
                        >Регистрация</button>
                    </div>
                    <div
                        className={"log-sig login"}
                        style={{
                            zIndex: "-1",
                            transform: `translateY(${this.state.loginPanel ? "0" : "480px"})`,
                            opacity: this.state.loginPanel ? "1" : "0"
                    }}>
                        <h1>Войти</h1>
                        <input type={"text"} placeholder={"E-mail"} onInput={this.handleEmailChange}/>
                        <input type={"text"} placeholder={"Пароль"} onInput={this.handlePasswordChange}/>
                        <button className={"password-forget"}>Забыли пароль?</button>
                        <button
                            className={"default-button large-button"}
                            onClick={async () => {
                                const data = {
                                    email: this.state.email,
                                    password: this.state.password
                                };
                                const response = await fetch('http://localhost:8080/login', {
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
                                    alert("Неверный пароль")
                                }
                            }}
                        >Вход</button>
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