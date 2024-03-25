import React from "react"
import "./login.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true
        }
        this.toSignup = this.toSignup.bind(this)
        this.toLogin = this.toLogin.bind(this)
        this.escPressed = this.escPressed.bind(this)
    }
    toSignup() {
        this.setState({
            login: false
        })
    }
    toLogin() {
        this.setState({
            login: true
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
                            transform: `translateX(${this.state.login ? "0" : "360px"})`,
                            borderRadius: this.state.login ? "10px 0 0 10px" : "0 10px 10px 0"
                    }}>
                        <div
                            className={"panel-text-container"}
                            style={{transform: `translateX(${this.state.login ? "0" : "-360px"})`}}
                        >
                            <Panel1 toSignup={this.toSignup} login={this.state.login}/>
                            <Panel2 toLogin={this.toLogin} login={this.state.login}/>
                        </div>
                    </div>
                    <div
                        className={"log-sig signup"}
                        style={{
                            zIndex: "-1",
                            transform: `translateY(${this.state.login ? "480px" : "0"})`,
                            opacity: this.state.login ? "0" : "1"
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
                            transform: `translateY(${this.state.login ? "0" : "480px"})`,
                            opacity: this.state.login ? "1" : "0"
                    }}>
                        <h1>Войти в аккаунт</h1>
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
function Panel1({toSignup, login}) {
    return (
        <div
            className={"panel-text"}
            style={{transform: `translateY(${login ? "0" : "-120px"})`}}
        >
            <h1>Приветствуем вас!</h1>
            <p>Нет аккаунта? Тогда зарегистрируйтесь и продолжайте покупки</p>
            <button onClick={toSignup}>Регистрация</button>
        </div>
    )
}
function Panel2({toLogin, login}) {
    return (
        <div
            className={"panel-text"}
            style={{transform: `translateY(${login ? "120px" : "0"})`}}
        >
            <h1>Добро пожаловать!</h1>
            <p>Для продолжения покупок войдите в ваш аккаунт</p>
            <button onClick={toLogin}>Войти</button>
        </div>
    )
}
export default Login