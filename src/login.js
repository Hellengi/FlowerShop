import React from "react"
import "./login.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPanel: true
        }
        this.toSignup = this.toSignup.bind(this)
        this.toLogin = this.toLogin.bind(this)
        this.escPressed = this.escPressed.bind(this)
    }
    toSignup() {
        this.setState({
            loginPanel: false
        })
    }
    toLogin() {
        this.setState({
            loginPanel: true
        })
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escPressed)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escPressed)
    }
    escPressed(event) {
        if (event.key === "Escape") {
            this.props.exitLoginPage()
        }
    }
    render() {
        return (
            <>
                <img className={"login-image"} src={"login.jpg"} alt={""}/>
                <div className={"login-container"}>
                    <div
                        className={"panel"}
                        style={{
                            transform: `translateX(${this.state.loginPanel ? "0" : "360px"})`,
                            borderRadius: this.state.loginPanel ? "10px 0 0 10px" : "0 10px 10px 0"
                    }}>
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
                        <input type={"text"} placeholder={"Имя"}/>
                        <input type={"text"} placeholder={"E-mail"}/>
                        <input type={"text"} placeholder={"Пароль"}/>
                        <button
                            className={"log-sig-button"}
                            onClick={() => {
                                this.props.setLogin()
                                this.props.exitLoginPage()
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
                        <input type={"text"} placeholder={"E-mail"}/>
                        <input type={"text"} placeholder={"Пароль"}/>
                        <button className={"password-forget"}>Забыли пароль?</button>
                        <button
                            className={"log-sig-button"}
                            onClick={() => {
                                this.props.setLogin()
                                this.props.exitLoginPage()
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