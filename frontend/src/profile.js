import React from "react";
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
                    color={"grey"}
                    page={"profile"}
                />
                <div className={"profile-container"}>

                </div>
            </>
        )
    }
}

export default Profile