import { useState } from "react"
import { Personal } from "./Personal"
import { Data } from "./Data"
import "./AdminPanel.css"

export const AdminPanel = (props) => {
    const [isPersonalInfo, setIsPersonalInfo] = useState(false)
    const [isData, setIsData] = useState(true)

    const changePer = () => {
        setIsData(!isData)
        setIsPersonalInfo(!isPersonalInfo)
    }

    return  (
        <>
            <div className="navBar">
                <button onClick={()=>{changePer()}}>{isPersonalInfo ? "Bank Data" : "Personal Info"}</button>
                <button onClick={()=>{props.onLogOut()}}>Log Out</button>
            </div>
            <div className="mainContainer">
                {isPersonalInfo ? <Personal onChangePIN={props.onChangePIN} onChangePass={props.onChangePass} currentUserData={props.currentUserData}/> : ""}
                {isData ? <Data transfers={props.transfers} onRemoveAccount={props.onRemoveAccount} accounts={props.accounts} currentUserData={props.currentUserData}/> : ""}
            </div>
        </>
    )
}