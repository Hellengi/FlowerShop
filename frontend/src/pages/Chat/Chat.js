import React, {useEffect, useState} from "react";
import "../Main/Main.css";
import "../Info/Info.css";
import "./Chat.css";
import BackImage from "../../components/Back/Back";
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";


function Chat({openSearch, infoPage}) {
    const { id } = useParams()
    const [update, setUpdate] = useState("")
    return (
        <>
            <BackImage page={"chat"}/>
            <Header openSearch={openSearch} infoPage={infoPage}/>
            <div className={"chat-page-container"}>
                <ChatList update={update}/>
                {id && <MessageList setUpdate={setUpdate}/>}
            </div>
        </>
    )
}

function ChatList({update}) {
    const { id } = useParams()
    const [info, setInfo] = useState([])
    const [chats, setChats] = useState([])
    useEffect(() => {
        void init()
    }, [id])
    useEffect(() => {
        void init()
    }, [update])
    async function init() {
        const response = await fetch(`/api/messages`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setInfo(data)
    }
    const navigate = useNavigate()
    useEffect(() => {
        const chatList = info.map((cht, index) => (
            <div className="chat" onClick={() => {navigate(`/chat/${cht.id}`)}} key={index}>
                <div>
                    {cht.legalName === "" ? cht.name : cht.legalName}
                </div>
            </div>
        ))
        setChats(chatList)
    }, [info])
    return (
        <>
            <div className={"chats-container"}>
                {chats}
            </div>
        </>
    )
}

function MessageList({setUpdate}) {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [info, setInfo] = useState([])
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")
    useEffect(() => {
        void init()
    }, [id])
    async function init() {
        const response = await fetch(`/api/messages/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        setInfo(data)

        const response_2 = await fetch(`/api/users/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data_2 = await response_2.json()
        if (data_2.legalName === "") setName(data_2.name)
        else setName(data_2.legalName)
    }
    useEffect(() => {
        const messageList = info.map((msg, index) => (
            <div className={`message ${String(id) !== String(msg.from.id) ? "message-other" : ""}`} key={index}>
                <div className={"message-content"}>{msg.message}</div>
                <div className={"message-time"}>
                    <div className={"message-time-1"}>{msg.createdAt.replace('T', ' ').slice(11, 19)}</div>
                    <div className={"message-time-2"}>{msg.createdAt.replace('T', ' ').slice(0, 10)}</div>
                </div>
            </div>
        ))
        setMessages(messageList)
    }, [info])
    const handleMessage = event => {
        const text = event.target.value
        setText(text)
    }
    const handleKeyDown = async (event) => {
        if (event.key === "Enter" && text.trim() !== "") {
            await sendMessage(text)
            setText("")
        }
    }
    const sendMessage = async (text) => {
        await fetch(`/api/messages/${id}?message=${text}`, {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'}
        })
        await setUpdate(text)
        await init()
    }
    return (
        <>
            <div className={"messages-container"}>
                <div className={"messages-name"}>{name}</div>
                <div className={"messages-cont"}>
                    {messages}
                </div>
                <div className={"messages-input-container"}>
                    <input type={"text"}
                           value={text}
                           onInput={handleMessage}
                           onKeyDown={handleKeyDown}
                           className={"messages-input"}>
                    </input>
                </div>
            </div>
        </>
    )
}
export default Chat