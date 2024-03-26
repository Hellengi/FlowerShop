import React from "react";
import "./image.css"

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.escPressed = this.escPressed.bind(this)
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escPressed)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escPressed)
    }
    escPressed(event) {
        if (event.key === "Escape") {
            this.props.closeImage()
        }
    }
    render() {
        return (
            <>
                <div
                    className={"image-full-back"}
                    onClick={this.props.closeImage}
                ></div>
                <img
                    src={this.props.image.src}
                    alt={""}
                    className={"image-full"}
                ></img>
            </>
        )
    }
}

export default Image