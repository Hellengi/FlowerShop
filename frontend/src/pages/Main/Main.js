import React, {useEffect, useState} from "react";
import "./Main.css"
import "../../components/Button/Button.css"
import Bouquets from "../../features/Bouquets/Bouquets";
import Flowers from "../../features/Flowers/Flowers";
import Header from "../../components/Header/Header";
import BackImage from "../../components/Back/Back";

function Main({openImage}) {
    const [mainStatus, setMainStatus] = useState(true)
    const [bouquetsDisplayed, setBouquetsDisplayed] = useState(true)
    const [flowersDisplayed, setFlowersDisplayed] = useState(false)
    useEffect(() => {
        void init()
    }, [])
    async function init() {
        const response = await fetch('/api/', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        if (!response.ok) {
            const message = "Если на странице нет карточек с товарами, значит backend ещё не успел запуститься.\n\n" +
                "Возможно вы открываете приложение со страницы https://flowershop-t3d1.onrender.com/, " +
                "в этом случае проблема связана с тем, что используется бесплатная версия Render.\n\n" +
                "Необходимо подождать несколько минут, пока backend не запустится."
            alert(message)
        }
    }
    function mainSwitch(status) {
        setMainStatus(status)
        setBouquetsDisplayed(true)
        setFlowersDisplayed(true)
        setTimeout(() => {
            setBouquetsDisplayed(status)
            setFlowersDisplayed(!status)
        }, 1000)
    }
    return (
        <>
            <BackImage page={"main"}/>
            <Header/>
            <SubHeader
                mainSwitch={mainSwitch}
                mainStatus={mainStatus}
                bouquetsDisplayed={bouquetsDisplayed}
                flowersDisplayed={flowersDisplayed}
            ></SubHeader>
            <div className={"main-body"} style={{transform: `translateX(${mainStatus ? "0" : "-100vw"})`}}>
                <div className={"bouquets-container"} style={{
                    transform: `rotate(${mainStatus ? "0" : "35deg"})`,
                    height: bouquetsDisplayed ? 1 : 0,
                    overflow: bouquetsDisplayed ? 'initial' : 'hidden'
                }}>
                    <Bouquets openImage={openImage}/>
                </div>
                <div className={"flowers-container"} style={{
                    transform: `rotate(${mainStatus ? "-35deg" : "0"})`,
                    height: flowersDisplayed ? 1 : 0,
                    overflow: flowersDisplayed ? 'initial' : 'hidden'
                }}>
                    <Flowers openImage={openImage}/>
                </div>
            </div>
        </>
    )
}

function SubHeader({mainSwitch, mainStatus, bouquetsDisplayed, flowersDisplayed}) {
    const [role, setRole] = useState("unauthorized")
    useEffect(() => {
        void getRole()
    }, [])
    async function getRole() {
        const role_response = await fetch('/api/users/me/role', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const role = await role_response.text()
        setRole(role)
    }
    async function createBouquet() {
        const title = prompt("Введите название букета")
        if (title === null) return
        const price = parseInt(prompt("Введите стоимость букета"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch('/api/bouquets', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        window.location.reload()
    }
    async function createFlower() {
        const title = prompt("Введите название цветка")
        if (title === null) return
        const price = parseInt(prompt("Введите стоимость цветка"))
        if (isNaN(price)) return
        const data = {
            title,
            price
        };
        await fetch('/api/flowers', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        });
        window.location.reload()
    }
    return (
        <div className={"sub-header"}>
            <div className={"to-bouquets"} style={{transform: `translateX(${mainStatus ? "-50vw" : "0"})`}}>
                {flowersDisplayed && <button
                    onClick={() => {
                        mainSwitch(true)
                    }}
                    className={"volume-button default-button large-button"}
                ><span>← Выбрать из готовых букетов</span></button>}
            </div>
            <div className={"to-flowers"} style={{transform: `translateX(${mainStatus ? "0" : "50vw"})`}}>
                {bouquetsDisplayed && <button
                    onClick={() => {
                        mainSwitch(false)
                    }}
                    className={"volume-button default-button large-button"}
                ><span>Составить свой букет →</span></button>}
            </div>
            <div className={"create-bouquet"} style={{opacity: mainStatus ? 1 : 0, transform: `translateX(${mainStatus ? "0" : "-200px"})`}}>
                {role === "admin" && bouquetsDisplayed && <button
                    onClick={() => {
                        void createBouquet()
                    }}
                    className={"volume-button default-button azure-button"}
                ><span>Добавить букет в БД</span></button>}
            </div>
            <div className={"create-flower"} style={{opacity: !mainStatus ? 1 : 0, transform: `translateX(${!mainStatus ? "0" : "200px"})`}}>
                {role === "admin" && flowersDisplayed && <button
                    onClick={() => {
                        void createFlower()
                    }}
                    className={"volume-button default-button azure-button"}
                ><span>Добавить цветок в БД</span></button>}
            </div>
        </div>
    )
}

export default Main