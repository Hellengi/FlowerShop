import React, {useEffect, useRef} from "react";
import "./card.css"

function Card() {
    const image = useRef(null)
    useEffect(() => {
        image.current.addEventListener("load", () => {
            if (image.current.clientHeight > image.current.clientWidth) {
                image.current.style.maxWidth = "240px"
            }
            else {
                image.current.style.maxHeight = "240px"
            }
        })
    }, [])
    let R = Math.floor(Math.random() * 3) + 1
    return (
        <div className={"card"}>
            <div className={"card-picture-container"}>
                <img
                    className={"picture"}
                    src={`sample_${R}.jpg`}
                    ref={image}
                    alt={""}
                />
            </div>
            <p className={"card-name"}>Цветы</p>
            <p className={"card-price"}>2000 руб</p>
            <ToCart/>
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
                        className={"card-to-cart"}
                        onClick={() => {this.setNumberInCart(1)}}
                    >Заказать</button>
                }
                {
                    this.state.numberInCart > 0 &&
                    <button className={"card-in-cart"}>Перейти в корзину</button>
                }
            </>
        )
    }
}

export default Card