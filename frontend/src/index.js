import React from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./main";
import Login from "./login";
import Cart from "./cart";
import Profile from "./profile";
import NotFound from "./notfound";
import Image from "./image";
import './index.css'

const Root = ReactDOM.createRoot(document.getElementById("root"))

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageOpened: false,
            image: null
        }
        this.openImage = this.openImage.bind(this)
        this.closeImage = this.closeImage.bind(this)
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
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={
                            <Main openImage={this.openImage}/>
                        }/>
                        <Route path={"/login"} element={
                            <Login/>
                        }/>
                        <Route path={"/cart"} element={
                            <Cart openImage={this.openImage}/>
                        }/>
                        <Route path={"/profile"} element={
                            <Profile/>
                        }/>
                        <Route path={"*"} element={
                            <NotFound/>
                        }/>
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}

Root.render(<Body/>)