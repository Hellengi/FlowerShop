import React, {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import "../../pages/Main/Main.css"
import "./Flowers.css"
import "../../components/Button/Button.css"
import {useNavigate} from "react-router-dom";

function Flowers({openImage}) {
    const [statusReady, setStatusReady] = useState(false);
    const [flowersInCustom, setFlowersInCustom] = useState([]);
    useEffect(() => {
        void init();
    }, [])
    async function init() {
        const response = await fetch('/api/custom/current/flowers', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setFlowersInCustom(data)
    }
    function changeStatusReady(status) {
        setStatusReady(status)
        setFlowersInCustom([])
    }
    async function setCustom(info, amount) {
        await fetch(`/api/custom/current/flowers/${info.id}?amount=${amount}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const response = await fetch(`/api/custom/current/flowers`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const json = await response.json()
        setFlowersInCustom(json)
    }
    return (
        <div className={"flowers container gradient-container"}>
            <div className={"list-of-flowers-container"}>
                <ListOfFlowers
                    openImage={openImage}
                    setCustom={setCustom}
                    flowersInCustom={flowersInCustom}
                />
            </div>
            {!statusReady && <SelectedFlowers
                openImage={openImage}
                flowersInCustom={flowersInCustom}
                setCustom={setCustom}
                changeStatusReady={changeStatusReady}
            />}
            {statusReady && <BouquetCreated changeStatusReady={changeStatusReady}/>}
        </div>
    )
}
function ListOfFlowers({openImage, setCustom, flowersInCustom}) {
    const [blocks, setBlocks] = useState([])
    const [infoMap, setInfoMap] = useState(new Map())
    const [role, setRole] = useState("")
    const [searchText, setSearchText] = useState("")
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(2147483647)
    useEffect(() => {
        void init()
    }, [])
    async function init() {
        const role_response = await fetch('/api/users/me/role', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const role = await role_response.text()
        setRole(role)

        const response = await fetch('/api/flowers', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        data.forEach(info => {
            setInfoMap(prevInfoMap => {
                const newInfoMap = new Map(prevInfoMap)
                newInfoMap.set(info.id, info)
                return newInfoMap
            })
        })
    }
    async function searchFlower() {
        const response = await fetch(`/api/flowers/search?text=${
            searchText}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setInfoMap(new Map())
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
                role={role}
                setCustom={setCustom}
                flowersInCustom={flowersInCustom}
            />)
        }
        setBlocks(newBlocks)
        // eslint-disable-next-line
    }, [infoMap, flowersInCustom])
    function handleSearchTextChange(event) {
        const searchText = event.target.value.trim()
        setSearchText(searchText)
    }
    async function handleMinPriceChange(event) {
        const price = parseInt(event.target.value)
        if (isNaN(price)) await setMinPrice(0)
        else if (price > 2147483647) await setMinPrice(2147483647)
        else if (price < 0) await setMinPrice(0)
        else await setMinPrice(price)
    }
    async function handleMaxPriceChange(event) {
        const price = parseInt(event.target.value)
        if (isNaN(price)) await setMaxPrice(2147483647)
        else if (price > 2147483647) await setMaxPrice(2147483647)
        else if (price < 0) await setMaxPrice(0)
        else await setMaxPrice(price)
    }
    useEffect(() => {
        void searchFlower()
        // eslint-disable-next-line
    }, [searchText, minPrice, maxPrice]);
    return (
        <div>
            <div className={"search-block"}>
                <input className={"list-of-flowers-search search-text"}
                       type={"text"}
                       placeholder={"Поиск..."}
                       onInput={handleSearchTextChange}/>
                <input className={"list-of-flowers-search search-price"}
                       type={"text"}
                       placeholder={"Мин. цена"}
                       onInput={handleMinPriceChange}/>
                <input className={"list-of-flowers-search search-price"}
                       type={"text"}
                       placeholder={"Макс. цена"}
                       onInput={handleMaxPriceChange}/>
            </div>
            <div className={"list-of-flowers"}>
                {blocks}
            </div>
        </div>
    )
}
function SelectedFlowers({openImage, flowersInCustom, setCustom, changeStatusReady}) {
    const [flowerBlocks, setFlowerBlocks] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [defaultName, setDefaultName] = useState("")
    const [customName, setCustomName] = useState("")
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [flowersInCustom])
    useEffect(() => {
        void updatePrice()
        // eslint-disable-next-line
    }, [flowersInCustom])
    async function init() {
        const response = await fetch('/api/users/me/role', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const role = await response.text()

        const flowerBlocks = []
        for (const info of flowersInCustom) {
            flowerBlocks.push(<Card
                key={info.id}
                info={info}
                openImage={openImage}
                mode={"custom"}
                role={role}
                setCustom={setCustom}
                customAmount={info.quantity}
            />)
        }
        setFlowerBlocks(flowerBlocks)

        const response_2 = await fetch('/api/custom/current', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const name = await response_2.text()
        setDefaultName(name)
    }
    function updatePrice() {
        let newPrice = 0
        for (const info of flowersInCustom) {
            newPrice += info.price * info.quantity
        }
        setTotalPrice(newPrice)
    }
    async function sendCustom() {
        if (customName === "") setCustomName(defaultName)
        await fetch(`/api/custom/current?title=${customName}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        await fetch("/api/cart/custom/current", {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        await fetch("/api/custom/current", {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        setFlowerBlocks([])
        changeStatusReady(true)
    }
    const handleCustomNameChange = event => {
        setCustomName(event.target.value)
    }
    return (
        <div className={"selected-flowers-container selected-flowers"}>
            {flowerBlocks.length === 0 && <h1>Цветы не выбраны</h1>}
            {flowerBlocks.length !== 0 && <>
                <input className={"custom-name"}
                       type={"text"}
                       placeholder={defaultName}
                       onInput={handleCustomNameChange}/>
                {flowerBlocks}
                <div className={"selected-flowers-price"}>{`Стоимость: ${totalPrice} руб`}</div>
                <button
                    className={"volume-button default-button medium-button"}
                    onClick={() => {
                        void sendCustom()
                    }}
                ><span>Добавить букет в корзину</span></button>
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
                className={"volume-button default-button medium-button"}
                onClick={() => {changeStatusReady(false)}}
            ><span>Новый букет</span></button>
            <button
                className={"volume-button default-button azure-button"}
                onClick={() => {navigate("/cart")}}
            ><span>Перейти в корзину</span></button>
        </div>
    )
}

export default Flowers