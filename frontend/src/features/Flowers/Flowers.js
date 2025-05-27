import React, {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import "../../pages/Main/Main.css"
import "./Flowers.css"
import "../../components/Button/Button.css"
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
        const response = await fetch('/api/custom/current/flowers', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
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
        void fetch(`/api/custom/current/flowers/${info.id}?amount=${amount}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
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
            <div className={"flowers container gradient-container"}>
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
                customMap={customMap}
            />)
        }
        setBlocks(newBlocks)
        // eslint-disable-next-line
    }, [infoMap, customMap])
    async function handleSearchTextChange(event) {
        await setSearchText(event.target.value)
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
        const role_response = await fetch('/api/users/me/role', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const role = await role_response.text()

        const flowerBlocks = []
        for (const [id, amount] of customMap) {
            const response = await fetch(`/api/flowers/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            flowerBlocks.push(<Card
                key={data.id}
                info={data}
                openImage={openImage}
                mode={"custom"}
                role={role}
                setCustom={setCustom}
                customAmount={amount}
            />)
        }
        setFlowerBlocks(flowerBlocks)
    }
    async function updatePrice() {
        let newPrice = 0
        for (const [id, count] of customMap) {
            const response = await fetch(`/api/flowers/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await response.json()
            newPrice += data.price * count
        }
        setTotalPrice(newPrice)
    }
    async function sendCustom() {
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
    return (
        <div className={"selected-flowers-container selected-flowers"}>
            {flowerBlocks.length === 0 && <h1>Цветы не выбраны</h1>}
            {flowerBlocks.length !== 0 && <>
                <h1>Выбранные цветы</h1>
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