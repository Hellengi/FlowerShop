import React, {useEffect, useRef, useState} from "react";
import "../Main/Main.css";
import "../Info/Info.css";
import BackImage from "../../components/Back/Back";
import Header from "../../components/Header/Header";
import {useNavigate, useParams} from "react-router-dom";


function Chat({openSearch, infoPage}) {
    return (
        <>
            <BackImage page={"chat"}/>
            <Header openSearch={openSearch} infoPage={infoPage}/>
        </>
    )
}

export default Chat