import React, {useEffect} from "react";
import "./notfound.css"
import BackImage from "./back";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
    useEffect(()=>{
        const escPressed = (event) => {
            if (event.key === "Escape") {
                navigate("/")
            }
        }
        document.addEventListener("keydown", escPressed)
        return () => {
            document.removeEventListener("keydown", escPressed)
        }
    }, [navigate])
    return (
        <>
            <div className={"notfound-sign-container"}>
                <div className={"circle c1"}></div>
                <div className={"circle c2"}></div>
                <div className={"circle c3"}></div>
                <div className={"circle c4"}></div>
                <div className={"circle c5"}></div>
                <div className={"circle c6"}></div>
                <div className={"circle c7"}></div>
                <div className={"notfound-sign"}>
                    <p className={"notfound-text"}>Страница не найдена!</p>
                    <button className={"notfound-button"} onClick={()=>{navigate("/")}}>Вернуться на главную</button>
                </div>
            </div>
            <BackImage page={"notfound"}/>
        </>
    )
}

export default NotFound