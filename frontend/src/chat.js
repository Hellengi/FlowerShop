import React, {useEffect, useRef, useState} from "react";
import "./main.css";
import "./info.css";
import BackImage from "./back";
import Header from "./header";
import {useNavigate, useParams} from "react-router-dom";


function Chat() {
    return (
        <>
            <BackImage page={"chat"}/>
            <Header/>
        </>
    )
}

export default Chat