import React from "react";
import "./profile.css"
import BackImage from "./back";
import Header from "./header";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.image = React.createRef()
    }
    componentDidMount() {
        this.image.current.addEventListener("load", () => {
            if (this.image.current.clientHeight > this.image.current.clientWidth) {
                this.image.current.style.maxWidth = "300px"
            }
            else {
                this.image.current.style.maxHeight = "300px"
            }
        })
    }
    render() {
        return (
            <>
                <BackImage page={"profile"}/>
                <Header
                    cancelLogin={this.props.cancelLogin}
                    logged={this.props.logged}
                    color={"grey"}
                    page={"profile"}
                />
                <div className={"profile-container"}>
                    <div className={"profile-info"}>
                        <div className={"profile-name"}>Eugene</div>
                        <div className={"profile-status-container"}>
                            <div className={"profile-status-title"}>статус: </div>
                            <div className={"profile-status"}>admin</div>
                        </div>
                        <div className={"profile-line-container"}>
                            <div>почта: </div>
                            <div className={"profile-line"}>uranus.oj@gmail.com</div>
                        </div>
                        <div className={"profile-line-container"}>
                            <div>пароль: </div>
                            <div className={"profile-line"}>password</div>
                        </div>
                        <div className={"profile-delete"}>Удалить аккаунт</div>
                    </div>
                    <div className={"profile-avatar-container"}>
                        <div className={"profile-avatar-change-container"}>
                            <div className={"profile-avatar-change"}>Изменить</div>
                        </div>
                        <img src={"user.png"} alt={""} ref={this.image}></img>
                    </div>
                </div>
            </>
        )
    }
}

export default Profile