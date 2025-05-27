import React from "react";
import "./Back.css"

function BackImage(props) {
    if (props.page === "main") return (
        <DynamicBackImage page={props.page}/>
    )
    if (props.page === "info") return (
        <DynamicBackImage page={props.page}/>
    )
    if (props.page === "chat") return (
        <DynamicBackImage page={props.page}/>
    )
    else if (props.page === "login") return (
        <StaticBackImage page={props.page}/>
    )
    else if (props.page === "cart") return (
        <DynamicBackImage page={props.page}/>
    )
    else if (props.page === "profile") return (
        <GeneratedBackImage page={props.page}/>
    )
    else if (props.page === "notfound") return (
        <StaticBackImage page={props.page}/>
    )
}

class DynamicBackImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLength: 0,
            innerLength: 0,
            scrollHeight: 0,
            translate: 0,
            scale: 1,
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
            const mobile = window.innerHeight / window.innerWidth > 2 / 3
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
        const src = "/back.jpg"
        const transform = `translate${mobile ? 'X' : 'Y'}(${translate}px)`
        return (
            <img
                className="dynamic-back-image"
                src={src}
                alt={""}
                style={{transform: `${transform}`}}
                ref={this.backImage}
            />
        )
    }
}

class StaticBackImage extends React.Component {
    render() {
        let src = ""
        if (this.props.page === "login") src = "/login.jpg"
        else if (this.props.page === "notfound") src = "/notfound.jpg"
        return (
            <img className={"static-back-image"} src={src} alt={""}/>
        )
    }
}

class GeneratedBackImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: []
        }
    }
    componentDidMount() {
        const lines = []
        for (let i = 0; i < 100; i++) {
            lines.push(
                <div className={"line-container"} style={{
                    transform: `translate(${Math.floor(Math.random()*100) - 50}vmax, ${Math.floor(Math.random()*100) - 50}vmax)`
                }} key={i}>
                    <div className={"line-container"} style={{
                        animation: `translateX${Math.floor(Math.random()*6)} ${Math.floor(Math.random()*100) + 20}s ease-in-out infinite`
                    }}>
                        <div className={"line-container"} style={{
                            animation: `translateY${Math.floor(Math.random()*6)} ${Math.floor(Math.random()*100) + 20}s ease-in-out infinite`
                        }}>
                            <div className={"line"} style={{
                                animation: `rotate${Math.floor(Math.random()*2)} ${Math.floor(Math.random()*200) + 40}s ease-in-out infinite`,
                                animationDelay: `-${Math.floor(Math.random()*200) + 40}s`
                            }}></div>
                        </div>
                    </div>
                </div>
            )
        }
        this.setState({
            lines
        })
    }
    render() {
        return (
            <div className={"generated-back-image"}>
                {this.state.lines}
            </div>
        )
    }
}

export default BackImage