import React from "react";
import "./cart.css"
import BackImage from "./back";
import Header from "./header";

class Cart extends React.Component {
    render() {
        return (
            <>
                <BackImage page={"cart"}/>
                <Header
                    cancelLogin={this.props.cancelLogin}
                    logged={this.props.logged}
                />
                <div className={"cart-container"}>

                </div>
            </>
        )
    }
}

export default Cart