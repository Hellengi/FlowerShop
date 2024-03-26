import React from "react";
import ReactDOM from 'react-dom/client'
import BackImage from "./back";
import Header from "./header";
import Main from "./main";
import Login from "./login";
import Image from "./image";
import './index.css'
const Root = ReactDOM.createRoot(document.getElementById("root"))
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPage: false,
            logged: false,
            imageOpened: false,
            image: null
        }
        this.enterLoginPage = this.enterLoginPage.bind(this)
        this.exitLoginPage = this.exitLoginPage.bind(this)
        this.setLogin = this.setLogin.bind(this)
        this.cancelLogin = this.cancelLogin.bind(this)
        this.openImage = this.openImage.bind(this)
        this.closeImage = this.closeImage.bind(this)
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
    openImage(image) {
         this.setState({
             imageOpened: true,
             image: image.current
         })
    }
    closeImage() {
        this.setState({
            imageOpened: false,
            image: null
        })
    }
    render() {
        return (
            <>
                {
                    this.state.imageOpened && <Image
                        image={this.state.image}
                        closeImage={this.closeImage}
                    />
                }
                {
                    !this.state.loginPage &&
                    <>
                        <BackImage/>
                        <Header
                            enterLoginPage={this.enterLoginPage}
                            cancelLogin={this.cancelLogin}
                            logged={this.state.logged}
                        />
                        <Main openImage={this.openImage}/>
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