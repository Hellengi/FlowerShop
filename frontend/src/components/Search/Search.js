import React, {useEffect, useRef, useState} from "react";
import "./Search.css"
import {useNavigate} from "react-router-dom";

function Search({search, closeSearch, openInfo}) {
    const [headerHeight, setHeaderHeight] = useState(90);
    const [blocks, setBlocks] = useState([])
    const [infoMap, setInfoMap] = useState(new Map())
    const header = document.getElementById("header");
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.addEventListener("scroll", handleScroll);
        handleScroll()
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])
    function handleScroll() {
        setHeaderHeight(header.offsetHeight - window.scrollY);
    }
    useEffect(() => {
        void searchBouquet()
    }, [search])
    async function searchBouquet() {
        const response = await fetch(`/api/bouquets/search?text=${search}`, {
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
        for (const [_, info] of infoMap) {
            newBlocks.push(<Result
                key={info.id}
                info={info}
                closeSearch={closeSearch}
            />)
        }
        setBlocks(newBlocks)
        // eslint-disable-next-line
    }, [infoMap])
    return (
        <>
            <>
                <div
                    className={"search-full-back"}
                    onClick={closeSearch}
                    style={{ top: headerHeight }}
                ></div>
                <div
                    className={"search-results"}
                    style={{
                        top: `${headerHeight}px`,
                        maxHeight: `calc(100vh - ${headerHeight}px - 30px)`
                }}>
                    {blocks}
                    {blocks.length === 0 && <div className={"no-results"}>Результаты не найдены</div>}
                </div>
            </>
        </>
    )
}

function Result({info, closeSearch}) {
    const image = useRef(null)
    const navigate = useNavigate();
    const src = "bouquet"
    useEffect(() => {
        if (image.current) {
            const handleLoad = () => {
                const portrait = image.current.clientHeight > image.current.clientWidth
                portrait ? image.current.style.maxWidth = "40px" :
                    image.current.style.maxHeight = "40px"
            }
            const currentImage = image.current;
            currentImage.addEventListener("load", handleLoad);
            return () => {
                currentImage.removeEventListener("load", handleLoad);
            };
        }
    }, [])
    return(
        <>
            <div className={"result"}>
                <div className={"result-picture-container"}>
                    <img
                        src={`/${src}s/${info.image}`}
                        onError={e => {
                            e.target.src = 'bouquet.png'
                        }}
                        ref={image}
                        alt={""}
                    />
                </div>
                <div className={"result-title link"} onClick={() => {
                    closeSearch()
                    navigate(`/bouquet/${info.id}`);
                }}>
                    {info.title}
                </div>
                <div className={"result-price"}>
                    {info.price} руб
                </div>
            </div>
        </>
    )
}

export default Search