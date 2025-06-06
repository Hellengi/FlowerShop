import React, {useEffect, useRef, useState} from "react";
import "../Main/Main.css";
import "./Info.css";
import BackImage from "../../components/Back/Back";
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";


function Info({mode, openSearch, infoPage}) {
    const { id } = useParams()
    const [info, setInfo] = useState()
    const [title, setTitle] = useState('')
    const [amountInCart, setAmountInCart] = useState(0)
    const [seller, setSeller] = useState('Flower Shop')
    const [sellerId, setSellerId] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [id])
    async function init() {
        const response = await fetch(`/api/${mode}s/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setInfo(data)
        setTitle(data.item.title)
        setSeller(data.item.seller.name)
        setSellerId(data.item.seller.user.id)
        if (mode === "bouquet") {
            const response_2 = await fetch(`/api/cart/${mode}s/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            const amountInCart = await response_2.json()
            setAmountInCart(amountInCart)
        }
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
    }, [info])
    function setAmount(amount) {
        if (amount < 0) {
            amount = 0
        }
        setAmountInCart(amount)
        void fetch(`/api/cart/${mode}s/${info.id}?amount=${amount}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
    }
    return (
        <>
            <BackImage page={"info"}/>
            <Header openSearch={openSearch} infoPage={infoPage}/>
            <div className={"container dark-container info-container"}>
                <div className={"picture-container"}>
                    {info && <img
                        src={`/${mode}s/${info.image}`}
                        alt={""}
                        ref={image}
                    />}
                </div>
                <div className={"container light-container text-container"}>
                    <p className={"title"}>{title}</p>
                    <p className={"seller"}>Продавец: {seller}</p>
                    <p className={"description white-container"}>{"Описание ".repeat(36)}</p>
                    {info && <p className={"price"}>{info.item.price} руб</p>}
                    <div className={"info-button-container"}>
                        {mode === "bouquet" && amountInCart === 0 && <button
                            className={"blue-button-1"}
                            onClick={() => {setAmount(1)}}
                        ><span>Добавить в корзину</span></button>}
                        {mode === "bouquet" && amountInCart > 0 && <button
                            className={"blue-button-2"}
                            onClick={() => {navigate("/cart")}}
                        ><span>Перейти в корзину</span></button>}
                        <button
                            className={"blue-button-3"}
                            onClick={() => {navigate(`/chat/${sellerId}`)}}
                        ><span>Написать продавцу</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Info