import React from "react";
import Card from "../../components/Card/Card";
import "../../pages/Main/Main.css"

class Bouquets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: []
        }
    }
    componentDidMount() {
        void this.init()
    }
    async init() {
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
                openImage={this.props.openImage}
                mode={"bouquet"}
                role={role}
            />)
        }
        this.setState({
            blocks
        })
    }
    render() {
        return (
            <div className={"container dark-container grid-container"}>
                {this.state.blocks}
            </div>
        )
    }
}

export default Bouquets