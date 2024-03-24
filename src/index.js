import React from "react";
import ReactDOM from 'react-dom/client'
import BackImage from "./back";
import Header from "./header";
import Main from "./main";
import './index.css'
const Root = ReactDOM.createRoot(document.getElementById("root"))
class Body extends React.Component {
    render() {
        return (
            <>
                <BackImage/>
                <Header/>
                <Main/>
            </>
        )
    }
}
Root.render(<Body/>)