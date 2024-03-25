import React from "react";
import ReactDOM from 'react-dom/client'
import BackImage from "./back";
import Header from "./header";
import Main from "./main";
import Login from "./login";
import './index.css'
const Root = ReactDOM.createRoot(document.getElementById("root"))
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: false,
            logged: false
        }
        this.enterLoginPage = this.enterLoginPage.bind(this)
        this.exitLoginPage = this.exitLoginPage.bind(this)
        this.setLogin = this.setLogin.bind(this)
        this.cancelLogin = this.cancelLogin.bind(this)
    }
    enterLoginPage() {
        this.setState({
            loginPage: true
        })
    }
    exitLoginPage() {
        this.setState({
            loginPage: false
        })
    }
    setLogin() {
        this.setState({
            logged: true
        })
    }
    cancelLogin() {
        this.setState({
            logged: false
        })
    }
    render() {
        return (
            <>
                {
                    !this.state.loginPage &&
                    <>
                        <BackImage/>
                        <Header
                            enterLoginPage={this.enterLoginPage}
                            cancelLogin={this.cancelLogin}
                            logged={this.state.logged}
                        />
                        <Main/>
                    </>
                }
                {
                    this.state.loginPage &&
                    <>
                        <Login
                            exitLoginPage={this.exitLoginPage}
                            setLogin={this.setLogin}
                        />
                    </>
                }
            </>
        )
    }
}
Root.render(<Body/>)