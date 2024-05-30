import React, {useEffect, useState} from "react";
import "./cart.css"
import BackImage from "./back";
import Header from "./header";
import Card from "./card";

function Cart({openImage}) {
    return (
        <>
            <BackImage page={"cart"}/>
            <Header/>
            <div className={"cart-background"}>
                <FlowerList openImage={openImage}/>
            </div>
        </>
    )
}
function FlowerList({openImage}) {
    const [bouquetBlocks, setBouquetBlocks] = useState([])
    const [customBlocks, setCustomBlocks] = useState([])
    const [map, setMap] = useState(new Map())
    const [map2, setMap2] = useState(new Map())
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        void init()
        void init_2()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        updateTotalPrice()
        // eslint-disable-next-line
    }, [map])
    useEffect(() => {
        updateTotalPrice()
        // eslint-disable-next-line
    }, [map2])
    const updateMap = (title, [price, amount]) => {
        setMap(prevMap => {
            const newMap = new Map(prevMap)
            newMap.set(title, [price, amount])
            return newMap
        })
    }
    const updateMap2 = (id, price) => {
        setMap2(prevMap => {
            const newMap2 = new Map(prevMap)
            newMap2.set(id, price)
            return newMap2
        })
    }
    const updateTotalPrice = () => {
        let totalPrice = 0
        // eslint-disable-next-line
        for (const [title, [price, amount]] of map) {
            totalPrice += price * amount
        }
        // eslint-disable-next-line
        for (const [id, price] of map2) {
            totalPrice += price
        }
        setTotalPrice(totalPrice)
        if (totalPrice === 0) {
            setBouquetBlocks([])
            setCustomBlocks([])
        }
    }
    async function init() {
        const bouquetBlocks = []
        const response = await fetch('http://localhost:8080/selected-bouquets')
        const data = await response.json()
        for (const info of data) {
            bouquetBlocks.push(<Card
                key={info.id}
                info={info}
                openImage={openImage}
                mode={"selected"}
                updateMap={updateMap}
            />)
            updateMap(info.title, [info.price, info.amount])
        }
        setBouquetBlocks(bouquetBlocks)
    }
    function removeCustom(id) {
        setMap2(prevMap => {
            const newMap2 = new Map(prevMap)
            newMap2.delete(id)
            return newMap2
        })
        void fetch(`http://localhost:8080/delete-custom?id=${id}`)
    }
    async function init_2() {
        const customBlocks = []
        const response = await fetch('http://localhost:8080/get-custom')
        const data = await response.json()
        for (const info of data) {
            customBlocks.push(<Card
                key={info.id}
                info={info}
                openImage={openImage}
                mode={"selected-custom"}
                removeCustom={removeCustom}
            />)
            updateMap2(info.id, info.price)
        }
        setCustomBlocks(customBlocks)
    }
    return (
        <div className={"cart-container"}>
            <h1>{bouquetBlocks.length + customBlocks.length === 0 ? "Корзина пуста" : "Корзина"}</h1>
            {bouquetBlocks}
            {customBlocks}
            {bouquetBlocks.length + customBlocks.length !== 0 &&
                <>
                    <h1>Итого: {totalPrice} руб</h1>
                    <button
                        className={"default-button"}
                        onClick={() => {
                            console.log("Click")
                        }}
                    >Заказать</button>
                </>}
        </div>
    )
}

export default Cart