import React, {useEffect, useState} from "react";
import Card from "./card";
import "./flowers.css"
import {useNavigate} from "react-router-dom";

class Flowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusReady: false,
            customMap: new Map()
        }
        void this.init()
        this.changeStatusReady = this.changeStatusReady.bind(this)
        this.setCustom = this.setCustom.bind(this)
    }
    async init() {
        const response = await fetch('http://localhost:8080/get-all-custom-flowers')
        const data = await response.json()
        const tempMap = new Map(Object.entries(data))
        const customMap = new Map(Array.from(tempMap, ([id, amount]) => [parseInt(id), amount]))
        this.setState({
            customMap
        })
    }
    changeStatusReady(status) {
        this.setState({
            statusReady: status
        })
        if (status === true) {
            this.setState({
                customMap: new Map()
            })
        }
    }
    setCustom(info, amount) {
        const src = 'http://localhost:8080/set-custom-flower'
        void fetch(`${src}?id=${info.id}&amount=${amount}`)
        this.setState(prevState => {
            const newCustomMap = new Map(prevState.customMap)
            if (amount > 0) {
                newCustomMap.set(info.id, amount)
            }
            else {
                newCustomMap.delete(info.id)
            }
            return {customMap: newCustomMap}
        })
    }
    render() {
        return (
            <div className={"flowers"}>
                <div className={"list-of-flowers-container"}>
                    <ListOfFlowers
                        openImage={this.props.openImage}
                        setCustom={this.setCustom}
                        customMap={this.state.customMap}
                    />
                </div>
                {!this.state.statusReady && <SelectedFlowers
                    openImage={this.props.openImage}
                    customMap={this.state.customMap}
                    setCustom={this.setCustom}
                    changeStatusReady={this.changeStatusReady}
                />}
                {this.state.statusReady && <BouquetCreated changeStatusReady={this.changeStatusReady}/>}
            </div>
        )
    }
}
function ListOfFlowers({openImage, setCustom, customMap}) {
    const [blocks, setBlocks] = useState([])
    const [infoMap, setInfoMap] = useState(new Map())
    useEffect(() => {
        void init()
    }, [])
    async function init() {
        const response = await fetch('http://localhost:8080/flowers')
        const data = await response.json()
        data.forEach(info => {
            setInfoMap(prevInfoMap => {
                const newInfoMap = new Map(prevInfoMap)
                newInfoMap.set(info.id, info)
                return newInfoMap
            })
        })
    }
    useEffect(() => {
        const newBlocks = []
        for (const [id, info] of infoMap) {
            newBlocks.push(<Card
                key={id}
                info={info}
                openImage={openImage}
                mode={"flower"}
                setCustom={setCustom}
                customMap={customMap}
            />)
        }
        setBlocks(newBlocks)
        // eslint-disable-next-line
    }, [infoMap, customMap])
    return (
        <div>
            <input className={"list-of-flowers-search"} type={"text"} placeholder={"Поиск..."}/>
            <div className={"list-of-flowers"}>
                {blocks}
            </div>
        </div>
    )
}
function SelectedFlowers({openImage, customMap, setCustom, changeStatusReady}) {
    const [flowerBlocks, setFlowerBlocks] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [customMap])
    useEffect(() => {
        void updatePrice()
        // eslint-disable-next-line
    }, [customMap])
    async function init() {
        const flowerBlocks = []
        for (const [id, amount] of customMap) {
            const response = await fetch(`http://localhost:8080/get-flower?id=${id}`)
            const data = await response.json()
            flowerBlocks.push(<Card
                key={data.id}
                info={data}
                openImage={openImage}
                mode={"custom"}
                setCustom={setCustom}
                customAmount={amount}
            />)
        }
        setFlowerBlocks(flowerBlocks)
    }
    async function updatePrice() {
        let newPrice = 0
        for (const [id, count] of customMap) {
            const response = await fetch(`http://localhost:8080/get-flower?id=${id}`)
            const data = await response.json()
            newPrice += data.price * count
        }
        setTotalPrice(newPrice)
    }
    async function sendCustom() {
        await fetch("http://localhost:8080/accept-custom")
        setFlowerBlocks([])
        changeStatusReady(true)
    }
    return (
        <div className={"selected-flowers-container selected-flowers"}>
            {flowerBlocks.length === 0 && <h1>Цветы не выбраны</h1>}
            {flowerBlocks.length !== 0 && <>
                <h1>Выбранные цветы</h1>
                {flowerBlocks}
                <div className={"selected-flowers-price"}>{`Стоимость: ${totalPrice} руб`}</div>
                <button
                    className={"default-button medium-button"}
                    onClick={() => {
                        void sendCustom()
                    }}
                >Добавить букет в корзину</button>
            </>}
        </div>
    )
}
function BouquetCreated({changeStatusReady}) {
    const navigate = useNavigate()
    return (
        <div className={"selected-flowers-container bouquet-created"}>
            <h1>Готово!</h1>
            <button
                className={"default-button medium-button"}
                onClick={() => {changeStatusReady(false)}}
            >Новый букет</button>
            <button
                className={"dark-button"}
                onClick={() => {navigate("/cart")}}
            >Перейти в корзину</button>
        </div>
    )
}

export default Flowers