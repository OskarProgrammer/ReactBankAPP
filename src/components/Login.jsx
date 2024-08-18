import { useState } from "react"
import "./Login.css"

export const Login = (props) => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [pin, setPin] = useState("")

    const [isError, setIsError] = useState(false)

    const logIn = () => {
        if (login == "" || password == "" || pin == ""){
            setIsError(true)
        }else if (!props.onLogin(login,password,pin)){
            setIsError(true)
        }
    }

    return (
        <>
        
            <div className="loginForm" onChange={()=>{setIsError(false)}}>
                <h2>Crow Bank System</h2>
                <div><input onChange={(e)=>{setLogin(e.target.value)}} value={login} placeholder="Login" type="text" /></div>
                <div><input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="Password" type="password" /></div>
                <div><input onChange={(e)=>{setPin(e.target.value)}} value={pin} placeholder="PIN" type="number" /></div>
                <button className="loginButton" onClick={()=>{logIn()}}>Login to system</button>
                {isError ? <p className="errorMessage">Error</p> : ""}
            </div>

        </>
    )
}