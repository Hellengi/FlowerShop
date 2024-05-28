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