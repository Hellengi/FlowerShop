import React, {useEffect} from "react";
import "./Image.css"

function Image({image, closeImage}) {
    useEffect(() => {
        document.addEventListener("keydown", escPressed)
        return () => {
            document.removeEventListener("keydown", escPressed)
        }
    }, [])
    function escPressed(event) {
        if (event.key === "Escape") {
            closeImage()
        }
    }
    return (
        <>
            <div
                className={"image-full-back"}
                onClick={closeImage}
            ></div>
            <img
                src={image.src}
                alt={""}
                className={"image-full"}
            ></img>
        </>
    )
}

export default Image