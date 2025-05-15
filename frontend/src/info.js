import React, {useEffect, useRef, useState} from "react";
import "./main.css";
import "./info.css";
import BackImage from "./back";
import Header from "./header";
import {useNavigate, useParams} from "react-router-dom";


function Info({mode}) {
    const { id } = useParams()
    const [src, setSrc] = useState(mode)
    const [info, setInfo] = useState()
    const [title, setTitle] = useState('')
    const [amountInCart, setAmountInCart] = useState(0)
    const [seller, setSeller] = useState('Flower Shop')
    const navigate = useNavigate()
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [amountInCart])
    async function init() {
        const response = await fetch(`http://localhost:8080/get-${src}?id=${id}`)
        const data = await response.json()
        setInfo(data)
        setTitle(data.title)
        setAmountInCart(data.amount)
    }
    const image = useRef(null)
    useEffect(() => {
        if (image.current) {
            const handleLoad = () => {
                const portrait = image.current.clientHeight > image.current.clientWidth
                portrait ? image.current.style.maxWidth = "40vw" :
                    image.current.style.maxHeight = "40vw"
            }
            const currentImage = image.current;
            currentImage.addEventListener("load", handleLoad);
            return () => {
                currentImage.removeEventListener("load", handleLoad);
            };
        }
    }, [])
    function setAmount(amount) {
        if (amount < 0) {
            amount = 0
        }
        setAmountInCart(amount)
        const src = 'http://localhost:8080/set-bouquet-amount'
        void fetch(src + '?id=' + info.id + '&amount=' + amount)
    }
    return (
        <>
            <BackImage page={"info"}/>
            <Header/>
            <div className={"container dark-container info-container"}>
                <div className={"picture-container"}>
                    <img
                        src={`/${src}s/${title}.jpg`}
                        alt={""}
                        ref={image}
                    />
                </div>
                <div className={"container light-container text-container"}>
                    <p className={"title"}>{title}</p>
                    <p className={"seller"}>Продавец: {seller}</p>
                    <p className={"description white-container"}>{"Описание ".repeat(36)}</p>
                    {info && <p className={"price"}>{info.price} руб</p>}
                    <div className={"info-button-container"}>
                        {info && info.amount === 0 && <button
                            className={"blue-button-1"}
                            onClick={() => {setAmount(1)}}
                        >
                        <span>
                        Добавить в корзину
                        </span>
                        </button>}
                        {info && info.amount > 0 && <button
                            className={"blue-button-2"}
                            onClick={() => {navigate("/cart")}}
                        >Перейти в корзину</button>}
                        <button
                            className={"blue-button-3"}
                            onClick={() => {navigate("/chat")}}
                        >Написать продавцу</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info