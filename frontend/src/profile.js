import React, {useEffect, useRef} from "react";
import "./profile.css"
import BackImage from "./back";
import Header from "./header";

class Profile extends React.Component {
    render() {
        return (
            <>
                <BackImage page={"profile"}/>
                <Header
                    cancelLogin={this.props.cancelLogin}
                    logged={this.props.logged}
                />
                <div className={"profile-container"}>
                    <ProfileInfo/>
                    <ProfileAvatar/>
                </div>
            </>
        )
    }
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