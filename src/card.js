import React, {useEffect, useRef} from "react";
import "./card.css"

function Card({openImage, minimized}) {
    const image = useRef(null)
    useEffect(() => {
        image.current.addEventListener("load", () => {
            if (image.current.clientHeight > image.current.clientWidth) {
                image.current.style.maxWidth = minimized ? "80px" : "240px"
            }
            else {
                image.current.style.maxHeight = minimized ? "80px" : "240px"
            }
        })
    }, [minimized])
    let R = Math.floor(Math.random() * 3) + 1
    return (
        <div className={minimized ? "card-minimized" : "card"}>
            <div className={minimized ? "card-picture-container-minimized" : "card-picture-container"}>
                <img
                    src={`sample_${R}.jpg`}
                    onClick={() => {openImage(image)}}
                    ref={image}
                    alt={""}
                />
            </div>
            <p className={minimized ? "card-name-minimized" : "card-name"}>Цветы</p>
            <p className={minimized ? "card-price-minimized" : "card-price"}>2000 руб</p>
            <ToCart minimized={minimized}/>
        </div>
    )
}
class ToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numberInCart: 0
        }
        this.setNumberInCart = this.setNumberInCart.bind(this)
    }
    setNumberInCart(number) {
        this.setState({
            numberInCart: number
        })
    }
    render() {
        return (
            <>
                {
                    this.state.numberInCart === 0 &&
                    <button
                        className={this.props.minimized ? "card-to-cart-minimized" : "card-to-cart"}
                        onClick={() => {this.setNumberInCart(1)}}
                    >{this.props.minimized ? "+" : "Заказать"}</button>
                }
                {
                    this.state.numberInCart > 0 &&
                    <button
                        className={this.props.minimized ? "card-in-cart-minimized" : "card-in-cart"}
                    >{this.props.minimized ? "✓" : "Перейти в корзину"}</button>
                }
            </>
        )
    }
}

export default Card