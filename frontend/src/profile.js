import React, {useEffect, useRef, useState} from "react";
import "./profile.css"
import BackImage from "./back";
import Header from "./header";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate()
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [])
    async function init() {
        const response = await fetch('http://localhost:8080/get-log-status')
        const data = await response.json()
        setLogged(data)
        if (data === false) {
            navigate('/')
        }
    }
    return (
        <>
            <BackImage page={"profile"}/>
            <Header/>
            {logged && <div className={"profile-container"}>
                <ProfileInfo/>
                <ProfileAvatar/>
            </div>}
        </>
    )
}

function ProfileInfo() {
    return (
        <div className={"profile-info"}>
            <ProfileInfoName/>
            <ProfileInfoMail/>
            <ProfileInfoPassword/>
            <ProfileDelete/>
        </div>
    )
}

function ProfileInfoName() {
    return (
        <>
            <div className={"profile-name"}>Eugene</div>
            <div className={"profile-status-container"}>
                <div className={"profile-status-title"}>статус: </div>
                <div className={"profile-status"}>admin</div>
            </div>
        </>
    )
}

function ProfileInfoMail() {
    return (
        <div className={"profile-line-container"}>
            <div>почта: </div>
            <div className={"profile-line"}>uranus.oj@gmail.com</div>
        </div>
    )
}

function ProfileInfoPassword() {
    return (
        <div className={"profile-line-container"}>
            <div>пароль: </div>
            <div className={"profile-line"}>password</div>
        </div>
    )
}

function ProfileDelete() {
    return (
        <div className={"profile-delete"}>Удалить аккаунт</div>
    )
}

function ProfileAvatar() {
    const image = useRef(null)
    useEffect(() => {
        image.current.addEventListener("load", () => {
            if (image.current.clientHeight > image.current.clientWidth) {
                image.current.style.maxWidth = "300px"
            }
            else {
                image.current.style.maxHeight = "300px"
            }
        })
    }, [])
    return (
        <div className={"profile-avatar-container"}>
            <div className={"profile-avatar-change-container"}>
                <div className={"profile-avatar-change"}>Изменить</div>
            </div>
            <img src={"user.png"} alt={""} ref={image}></img>
        </div>
    )
}

export default Profile