import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./card.css"

function Card({info, openImage, mode, role, updateMap, setCustom, customAmount, customMap, removeCustom}) {
        useEffect(() => {
        if (mode === "selected-custom") {
            setAmountInCart(1)
        }
        // eslint-disable-next-line
    }, [])
    function deleteCustom(id) {
        removeCustom(id)
        setAmountInCart(0)
    }
    async function updateBouquet(id) {
        let title = prompt("Введите название букета")
        if (title === null) return
        let price = parseInt(prompt("Введите стоимость букета"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch(`http://localhost:8080/update-bouquet?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        window.location.reload()
    }
    async function updateFlower(id) {
        let title = prompt("Введите название цветка")
        if (title === null) return
        let price = parseInt(prompt("Введите стоимость цветка"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch(`http://localhost:8080/update-flower?id=${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        window.location.reload()
    }
    async function dropBouquet(id) {
        await fetch(`http://localhost:8080/drop-bouquet?id=${id}`)
        window.location.reload()
    }
    async function dropFlower(id) {
        await fetch(`http://localhost:8080/drop-flower?id=${id}`)
        window.location.reload()
    }
    useEffect(() => {
        if (mode === "flower" && customMap !== undefined) {
            if (customMap.get(info.id) !== undefined) {
                setAmountInCart(customMap.get(info.id))
            }
            else {
                setAmountInCart(0)
            }
        }
        // eslint-disable-next-line
    }, [customMap])
    const [amountInCart, setAmountInCart] = useState(info.amount)
    useEffect(() => {
        if (mode === "custom") {
            setAmountInCart(customAmount)
        }
        // eslint-disable-next-line
    }, [customAmount])
    function setAmount(amount) {
        if (amount < 0) {
            amount = 0
        }
        setAmountInCart(amount)
        if (mode === "bouquet" || mode === "selected") {
            const src = 'http://localhost:8080/set-bouquet-amount'
            void fetch(src + '?id=' + info.id + '&amount=' + amount)
        }
        if (mode === "selected") {
            updateMap(info.title, [info.price, amount])
        }
        if (mode === "custom") {
            setCustom(info, amount)
        }
    }
    return (
        <>
            {(amountInCart > 0 || (mode !== "selected" && mode !== "selected-custom")) && <div className={"card-" + mode}>
                <Icon title={info.title} openImage={openImage} mode={mode}/>
                <Info title={info.title} info={info.info} amount={amountInCart} price={info.price} mode={mode}/>
                {mode === "bouquet" && <SelectButton amount={amountInCart} setAmount={setAmount}/>}
                {mode === "flower" && <SelectFlowerButton info={info} selectedAmount={amountInCart} setCustom={setCustom}/>}
                {(mode === "selected" || mode === "custom") && <AddSubButton amount={amountInCart} setAmount={setAmount} mode={mode}/>}
                {mode === "selected-custom" && <RemoveButton remove={deleteCustom} id={info.id}/>}
                {role === "admin" && mode === "bouquet" && <UpdateButton update={updateBouquet} id={info.id} mode={mode}/>}
                {role === "admin" && mode === "flower" && <UpdateButton update={updateFlower} id={info.id} mode={mode}/>}
                {role === "admin" && mode === "bouquet" && <DropButton drop={dropBouquet} id={info.id} mode={mode}/>}
                {role === "admin" && mode === "flower" && <DropButton drop={dropFlower} id={info.id} mode={mode}/>}
            </div>}
        </>
    )
}
function Icon({title, openImage, mode}) {
    const image = useRef(null)
    const [src, setSrc] = useState(mode)
    useEffect(() => {
        if (mode === "selected") {
            setSrc("bouquet")
        }
        if (mode === "custom") {
            setSrc("flower")
        }
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        image.current.addEventListener("load", () => {
            const portrait = image.current.clientHeight > image.current.clientWidth
            switch (mode) {
                case "bouquet":
                    portrait ? image.current.style.maxWidth = "240px" : image.current.style.maxHeight = "240px"
                    break
                case "flower":
                    portrait ? image.current.style.maxWidth = "80px" : image.current.style.maxHeight = "80px"
                    break
                case "selected":
                    portrait ? image.current.style.maxWidth = "100px" : image.current.style.maxHeight = "100px"
                    break
                case "custom":
                    portrait ? image.current.style.maxWidth = "40px" : image.current.style.maxHeight = "40px"
                    break
                case "selected-custom":
                    portrait ? image.current.style.maxWidth = "100px" : image.current.style.maxHeight = "100px"
                    break
                default:
                    break
            }
        })
    }, [mode])
    return (
        <>
            {mode !== "selected-custom" && <div className={"card-picture-container-" + mode}>
                <img
                    src={`/${src}s/${title}.jpg`}
                    onError={e => e.target.src = 'bouquet.png'}
                    onClick={() => {openImage(image)}}
                    ref={image}
                    alt={""}
                />
            </div>}
            {mode === "selected-custom" && <div className={"card-picture-container-selected"} style={{cursor: "initial"}}>
                <img
                    src={`/bouquet.png`}
                    ref={image}
                    alt={""}
                />
            </div>}
        </>
    )
}
function Info({title, amount, price, mode, info}) {
    const flowerList = []
    if (mode === "selected-custom") {
        let i = 0
        for (const line of info.split(";")) {
            i += 1
            flowerList.push(<div
            key={i}>
                {line.replace(":", ": ")} шт
            </div>)
        }
    }
    return (
        <div>
            {(mode === "bouquet" || mode === "flower") && <>
                <p className={"card-name-" + mode}>{title}</p>
                <p className={"card-price-" + mode}>{price} руб</p>
            </>}
            {(mode === "selected") && <>
                <p className={"card-name-" + mode}>{title}</p>
                {amount === 1 && <p className={"card-info-" + mode}>{price} руб</p>}
                {amount > 1 && <p className={"card-info-" + mode}>{amount} шт по {price} руб</p>}
                {amount > 1 && <p className={"card-price-" + mode}>Суммарно {amount * price} руб</p>}
            </>}
            {(mode === "custom") && <>
                {amount === 1 && <p className={"card-info-" + mode}>{title}: {price} руб</p>}
                {amount > 1 && <p className={"card-info-" + mode}>{title}: {amount} шт по {price} руб</p>}
            </>}
            {(mode === "selected-custom") && <>
                <p className={"card-name-selected"}>{title}</p>
                <div className={"card-flower-list"}>
                    {flowerList}
                </div>
                <p className={"card-info-selected"}>{price} руб</p>
            </>}
        </div>
    )
}
function SelectButton({amount, setAmount}) {
    const navigate = useNavigate()
    return (
        <>
            {amount === 0 && <button
                className={"blue-button-1"}
                onClick={() => {setAmount(1)}}
            >Заказать</button>}
            {amount > 0 && <button
                className={"blue-button-2"}
                onClick={() => {navigate("/cart")}}
            >Перейти в корзину</button>}
        </>
    )
}
function SelectFlowerButton({info, selectedAmount, setCustom}) {
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        setAmount(selectedAmount)
    }, [selectedAmount])
    useEffect(() => {
        void init()
        // eslint-disable-next-line
    }, [])
    function changeAmount(amount) {
        setAmount(amount)
        setCustom(info, amount)
    }
    async function init() {
        const response = await fetch('http://localhost:8080/get-custom-flower?id=' + info.id)
        const data = await response.json()
        setAmount(data)
    }
    return (
        <>
            {amount === 0 && <button
                className={"pink-button-1"}
                onClick={() => {changeAmount(1)}}
            >+</button>}
            {amount > 0 && <button
                className={"pink-button-2"}
                onClick={() => {changeAmount(0)}}
            >✓</button>}
        </>
    )
}
function AddSubButton({amount, setAmount, mode}) {
    const [addSubName, setAddSubName] = useState("")
    const [delName, setDelName] = useState("")
    useEffect(() => {
        if (mode === "selected") {
            setAddSubName("blue-button-2 add-sub-button")
            setDelName("blue-button-2 edit-button delete-button")
        }
        if (mode === "custom") {
            setAddSubName("pink-button-2 add-sub-button add-sub-custom-button")
            setDelName("blue-button-2 edit-button delete-button del-custom-button")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className={`add-sub-button-container-${mode}`}>
            <button
                className={delName}
                onClick={() => {setAmount(0)}}
            ></button>
            <button
                className={addSubName}
                onClick={() => {setAmount(amount - 1)}}
            >-</button>
            <button
                className={addSubName}
                onClick={() => {setAmount(amount + 1)}}
            >+</button>
        </div>
    )
}
function RemoveButton({remove, id}) {
    return (
        <div className={"button-container delete-button-container-custom"}>
            <button
                className={"blue-button-2 edit-button delete-button delete-button-custom"}
                onClick={() => {
                    if (window.confirm("Вы действительно хотите удалить букет из корзины?")) {
                        remove(id)
                    }
                }}
            ></button>
        </div>
    )
}
function UpdateButton({update, id, mode}) {
    return (
        <div className={`button-container update-button-container-${mode}`}>
            <button
                className={`blue-button-2 edit-button update-button button-${mode}`}
                onClick={() => {
                    if (window.confirm(`Вы хотите обновить информацию ${
                        mode === "bouquet" ? "о букете" : "о цветке"} в базе данных?`)) {
                        update(id)
                    }
                }}
            ></button>
        </div>
    )
}
function DropButton({drop, id, mode}) {
    return (
        <div className={`button-container drop-button-container-${mode}`}>
            <button
                className={`blue-button-2 edit-button delete-button button-${mode}`}
                onClick={() => {
                    if (window.confirm(`Вы действительно хотите удалить ${
                        mode === "bouquet" ? "букет" : "цветок"} из базы данных?`)) {
                        drop(id)
                    }
                }}
            ></button>
        </div>
    )
}

export default Card