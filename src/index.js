import React from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./main";
import Login from "./login";
import NotFound from "./notfound";
import './index.css'
const Root = ReactDOM.createRoot(document.getElementById("root"))
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false
        }
        this.setLogin = this.setLogin.bind(this)
        this.cancelLogin = this.cancelLogin.bind(this)
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
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        <Main cancelLogin={this.cancelLogin} logged={this.state.logged}/>
                    }/>
                    <Route path={"/login"} element={
                        <Login setLogin={this.setLogin}/>
                    }/>
                    <Route path={"*"} element={
                        <NotFound/>
                    }/>
                </Routes>
            </BrowserRouter>
        )
    }
}
Root.render(<Body/>)