import React, {useState} from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./pages/Main/Main";
import Info from "./pages/Info/Info";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Image from "./components/Image/Image";
import Search from "./components/Search/Search";
import './index.css'
import Header from "./components/Header/Header";

const Root = ReactDOM.createRoot(document.getElementById("root"))

function Body() {
    const [imageOpened, setImageOpened] = useState(false)
    const [image, setImage] = useState(null)
    const [searchOpened, setSearchOpened] = useState(false)
    const [search, setSearch] = useState(null)
    const [infoPage, setInfoPage] = useState(null)
    function openImage(image) {
        setImageOpened(true)
        setImage(image.current)
    }
    function closeImage() {
        setImageOpened(false)
        setImage(null)
    }
    function openSearch(search) {
        if (search !== "") setSearchOpened(true)
        else setSearchOpened(false)
        setSearch(search)
    }
    function closeSearch() {
        setSearchOpened(false)
    }
    function openInfo(id) {
        setInfoPage(id)
    }
    return (
        <>
            {imageOpened && <Image image={image} closeImage={closeImage}/>}
            {searchOpened && <Search search={search} closeSearch={closeSearch} openInfo={openInfo}/>}
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        <Main openImage={openImage} openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/info"} element={
                        <Info openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/bouquet/:id"} element={
                        <Info mode={"bouquet"} openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/flower/:id"} element={
                        <Info mode={"flower"} openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/chat"} element={
                        <Chat openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/chat/:id"} element={
                        <Chat openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/login"} element={
                        <Login/>
                    }/>
                    <Route path={"/cart"} element={
                        <Cart openImage={openImage} openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"/profile"} element={
                        <Profile openSearch={openSearch} infoPage={infoPage}/>
                    }/>
                    <Route path={"*"} element={
                        <NotFound/>
                    }/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

Root.render(<Body/>)