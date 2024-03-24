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
    }
    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
        window.addEventListener("resize", this.handleResize)
        this.handleResize()
        this.backImage.current.addEventListener("load", this.handleResize)
    }
    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll)
        window.removeEventListener("resize", this.handleResize)
    }
    handleScroll = ()=>{
        window.requestAnimationFrame((/*callback*/)=>{
            const { imageLength, innerLength, scrollHeight, mobile } = this.state
            let translate = 0
            translate = -Math.min(window.scrollY / 2, (imageLength - innerLength) * window.scrollY / (scrollHeight - innerLength))
            this.setState({ translate })
        })
    }
    handleResize = ()=>{
        this.setState(()=>{
            const mobile = window.innerHeight / window.innerWidth > 8160 / 6120
            return {
                imageLength: mobile ? this.backImage.current.offsetWidth : this.backImage.current.offsetHeight,
                innerLength: mobile ? window.innerWidth : window.innerHeight,
                scrollHeight: document.body.scrollHeight,
                mobile
            }
        })
    }
    render() {
        const { translate } = this.state
        return (
            <img
                src={"flower-field.jpg"}
                alt={""}
                id={"back-image"}
                style={{transform: `translate${this.state.mobile ? 'X' : 'Y'}(${translate}px)`}}
                ref={this.backImage}
            />
        )
    }
}

export default BackImage