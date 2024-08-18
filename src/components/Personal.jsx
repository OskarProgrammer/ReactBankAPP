import { useState } from "react"
import "./Personal.css"

export const Personal = (props) => {
    const [isChangingPass, setIsChangingPass] = useState(false)
    const [isChangingPIN, setIsChangingPIN] = useState(false)

    let [newPassValue, setNewPassValue] = useState("")
    let [newPIN, setNewPIN] = useState("")

    const changePass = () => {
        if (isChangingPass && newPassValue != ""){
            props.onChangePass(props.currentUserData.key, newPassValue)
            setIsChangingPass(false)
            setNewPassValue("")
        }else{
            setIsChangingPass(!isChangingPass)
        }
    }

    const changePIN = () => {
        if (isChangingPIN && newPIN != ""){
            props.onChangePIN(props.currentUserData.key, newPIN)
            setIsChangingPIN(false)
            setNewPIN("")
        }else{
            setIsChangingPIN(!isChangingPIN)
        }
    }

    return (
        <>
        
            <div className="personalData">
                <div className="image">your image</div>
                <div className="usernameContainer">Name: {props.currentUserData.login}</div>
                <hr />
                <div className="passwordContainer">
                    Password: {props.currentUserData.password}
                    {isChangingPass ? <input value={newPassValue} placeholder="New password" onChange={(e)=>{setNewPassValue(e.target.value)}}/> : ""}
                    <button className="changePasswordButton" onClick={changePass}>{isChangingPass ? "Confirm" : "Change"} Password</button>
                </div>
                <hr />
                <div className="passwordContainer">
                    Key: {props.currentUserData.key}
                </div>
                <hr />
                <div className="passwordContainer">
                    PIN: {props.currentUserData.pin}
                    {isChangingPIN ? <input value={newPIN} placeholder="New PIN" type="number" onChange={(e)=>{setNewPIN(e.target.value)}}/> : ""}
                    <button className="changePasswordButton" onClick={changePIN}>{isChangingPIN ? "Confirm" : "Change"} PIN</button>
                </div>
            </div>

        </>
    )
}