import ReactDOM from 'react-dom'
import './index.css'
function HelloWorld(props) {
    return (<h1>Hello, world!! My name is {props.name}</h1>)
}
const Root = ReactDOM.createRoot(document.getElementById("root"))
Root.render(HelloWorld({name: "Eugene"}))