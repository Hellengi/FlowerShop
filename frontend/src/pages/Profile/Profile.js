import React, {useEffect, useRef, useState} from "react";
import "./Profile.css"
import BackImage from "../../components/Back/Back";
import Header from "../../components/Header/Header";
import {useNavigate} from "react-router-dom";

function Profile({openSearch, infoPage}) {
    const navigate = useNavigate()
    const [logged, setLogged] = useState(false)
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
        avatar: "",
        role: "",
    })
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [])
    async function init() {
        const response = await fetch('/api/auth/status', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setLogged(data)
        if (data === false) {
            navigate('/')
        }
        else {
            const response = await fetch('/api/users/me', {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            setProfile(data)
        }
    }
    async function drop() {
        await fetch('/api/users/me', {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        });
        navigate('/')
    }
    return (
        <>
            <BackImage page={"profile"}/>
            <Header openSearch={openSearch} infoPage={infoPage}/>
            {logged && <div className={"profile-container"}>
                <ProfileInfo profile={profile} drop={drop}/>
                <ProfileAvatar avatar={profile.avatar}/>
            </div>}
        </>
    )
}

function ProfileInfo({profile, drop}) {
    return (
        <div className={"profile-info"}>
            <ProfileInfoName name={profile.name} role={profile.role}/>
            <ProfileInfoMail email={profile.email}/>
            <ProfileInfoPassword password={profile.password}/>
            <ProfileDelete drop={drop}/>
        </div>
    )
}

function ProfileInfoName({ name, role }) {
    return (
        <>
            <div className={"profile-name"}>{name}</div>
            <div className={"profile-status-container"}>
                <div className={"profile-status-title"}>статус: </div>
                <div className={"profile-status"}>{role}</div>
            </div>
        </>
    )
}

function ProfileInfoMail({ email }) {
    return (
        <div className={"profile-line-container"}>
            <div>почта: </div>
            <div className={"profile-line"}>{email}</div>
        </div>
    )
}

function ProfileInfoPassword({ password }) {
    return (
        <div className={"profile-line-container"}>
            <div>пароль: </div>
            <div className={"profile-line"}>{password}</div>
        </div>
    )
}

function ProfileDelete({drop}) {
    return (
        <div className={"profile-delete"} onClick={() => {
            const result = window.confirm("Вы действительно хотите удалить аккаунт?");
            if (result===true) {
                drop()
            }
        }}>Удалить аккаунт</div>
    )
}

function ProfileAvatar({avatar}) {
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