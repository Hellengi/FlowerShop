import React from "react";
import Card from "./card";
import "./flowers.css"

class Flowers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusReady: false,
            listOfSelectedFlowers: []
        }
        this.changeStatusReady = this.changeStatusReady.bind(this)
        this.selectFlowers = this.selectFlowers.bind(this)
        this.removeFlowers = this.removeFlowers.bind(this)
    }
    changeStatusReady(status) {
        this.setState({
            statusReady: status
        })
    }
    selectFlowers(id) {
        const listOfSelectedFlowers = this.state.listOfSelectedFlowers
        listOfSelectedFlowers.push(
            <p key={0}>Selected Flower</p>
        )
        this.setState({
            listOfSelectedFlowers: [listOfSelectedFlowers]
        })
    }
    removeFlowers(id) {
        const listOfSelectedFlowers = this.state.listOfSelectedFlowers
        const index = listOfSelectedFlowers.indexOf(<p>Selected Flower</p>)
        if (index) listOfSelectedFlowers.splice(index, 1)
        this.setState({
            listOfSelectedFlowers: [listOfSelectedFlowers]
        })
    }
    render() {
        return (
            <>
                <div className={"flowers"}>
                    <div className={"list-of-flowers-container"}>
                        <ListOfFlowers openImage={this.props.openImage}/>
                    </div>
                    {!this.state.statusReady && <SelectedFlowers changeStatusReady={this.changeStatusReady} listOfSelectedFlowers={this.state.listOfSelectedFlowers}/>}
                    {this.state.statusReady && <BouquetCreated changeStatusReady={this.changeStatusReady}/>}
                </div>
            </>
        )
    }
}
class ListOfFlowers extends React.Component {
    constructor(props) {
        super(props);
        this.blocks = []
        for (let i = 0; i < 24; i++) {
            this.blocks.push(<Card key={i} openImage={this.props.openImage} minimized={true}/>)
        }
        this.state = {
            blocks: this.blocks
        }
    }
    render() {
        return (
            <div>
                <input className={"list-of-flowers-search"} type={"text"} placeholder={"Поиск..."}/>
                <div className={"list-of-flowers"}>
                    {this.state.blocks}
                </div>
            </div>
        )
    }
}
function SelectedFlowers({changeStatusReady, listOfSelectedFlowers}) {
    return (
        <div className={"selected-flowers-container selected-flowers"}>
            <h1>Выбранные цветы</h1>
            {listOfSelectedFlowers}
            <button
                className={"standard-button"}
                onClick={() => {
                    changeStatusReady(true)
                }}
            >Добавить букет в корзину</button>
        </div>
    )
}
function BouquetCreated({changeStatusReady}) {
    return (
        <div className={"selected-flowers-container bouquet-created"}>
            <h1>Готово!</h1>
            <button
                className={"standard-button"}
                onClick={() => {
                    changeStatusReady(false)
                }}
            >Новый букет</button>
        </div>
    )
}

export default Flowers