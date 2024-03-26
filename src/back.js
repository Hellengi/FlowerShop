import React from "react";
import "./back.css"

class BackImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLength: 0,
            innerLength: 0,
            scrollHeight: 0,
            translate: 0,
            mobile: false
        }
        this.backImage = React.createRef()
        this.handleScroll = this.handleScroll.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.updateState = this.updateState.bind(this)
    }
    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
        window.addEventListener("resize", this.handleResize)
        this.updateState()
        this.backImage.current.addEventListener("load", this.updateState)
    }
    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll)
        window.removeEventListener("resize", this.handleResize)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.scrollHeight !== document.body.scrollHeight) {
            this.updateState()
        }
    }
    handleScroll() {
        const { imageLength, innerLength, scrollHeight } = this.state
        const translate = -Math.min(window.scrollY / 2, (imageLength - innerLength) * window.scrollY / (scrollHeight - innerLength))
        this.setState({ translate })
    }
    handleResize() {
        this.updateState()
    }
    updateState() {
        this.setState(()=>{
            const mobile = window.innerHeight / window.innerWidth > 3 / 2
            return {
                imageLength: mobile ? this.backImage.current.offsetWidth : this.backImage.current.offsetHeight,
                innerLength: mobile ? window.innerWidth : window.innerHeight,
                scrollHeight: document.body.scrollHeight,
                mobile
            }
        })
    }
    render() {
        const { translate, mobile } = this.state
        return (
            <img
                src={"back.jpg"}
                alt={""}
                id={"back-image"}
                style={{transform: `translate${mobile ? 'X' : 'Y'}(${translate}px)`}}
                ref={this.backImage}
            />
        )
    }
}

export default BackImage