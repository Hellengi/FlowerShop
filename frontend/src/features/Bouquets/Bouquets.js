import React, {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import "../../pages/Main/Main.css"

function Bouquets({openImage}) {
    const [blocks, setBlocks] = useState([])
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

        const blocks = []
        const response = await fetch('/api/bouquets', {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json()
        for (const info of data) {
            blocks.push(<Card
                key={info.id}
                info={info}
                openImage={openImage}
                mode={"bouquet"}
                role={role}
            />)
        }
        setBlocks(blocks)
    }
    return (
        <div className={"container dark-container grid-container"}>
            {blocks}
        </div>
    )
}

export default Bouquets