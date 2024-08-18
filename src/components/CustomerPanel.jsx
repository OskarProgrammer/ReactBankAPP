import { useState } from "react"
import { Personal } from "./Personal"
import { Data } from "./Data"
import "./CustomerPanel.css"

export const CustomerPanel = (props) => {
    const [isPersonalInfo, setIsPersonalInfo] = useState(false)
    const [isData, setIsData] = useState(true)
    const [isCreatingTransfer, setIsCreatingTransfer] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false)

    let [destinationAccount, setDestinationAccount] = useState("")
    let [titleOfTransfer, setTitleOfTransfer] = useState("")
    let [valueOfTransfer, setValueOfTransfer] = useState(0)
    let [homeAccount, setHomeAccount] = useState("")
    let [nameOfAccount, setNameOfAccount] = useState("")

    const changePer = () => {
        setIsData(!isData)
        setIsPersonalInfo(!isPersonalInfo)
    }

    const sendTransfer = () => {
        let i = 0
        props.accounts.map((account)=>{
            if (homeAccount == account.accountKey && props.currentUserData.key == account.ownerKey && account.saldo >= parseInt(valueOfTransfer)){
                i = 1
            }
        })

        if (i != 1) {
            setIsError(true)
            return
        }

        i = 0

        props.accounts.map((account)=>{
            if (destinationAccount == account.accountKey){
                i = 1
            }
        })

        if (i != 1) {
            setIsError(true)
            return
        }

        props.onTransfer(homeAccount, destinationAccount, titleOfTransfer, valueOfTransfer)
        setDestinationAccount("")
        setHomeAccount("")
        setIsCreatingTransfer(false)
        setTitleOfTransfer("")
        setValueOfTransfer(0)
    }

    const createNewAccount = () => {
        if (nameOfAccount != ""){
            props.onCreateAccount(nameOfAccount, props.currentUserData.key,props.currentUserData.login)
            setIsCreatingNewAccount(false)
            setNameOfAccount("")
        }else{
            setIsError(true)
        }
    }



    return  (
        <>
            <div className="navBar">
                <button onClick={()=>{changePer()}}>{isPersonalInfo ? "Bank Data" : "Personal Info"}</button>
                <button onClick={()=>{setIsCreatingTransfer(!isCreatingTransfer)}}> {isCreatingTransfer ? "Cancel" : "Make"} a transfer</button>
                <button onClick={()=>{setIsCreatingNewAccount(!isCreatingNewAccount)}}>{isCreatingNewAccount ? "Cancel creating new account" : "Create an account"}</button>
                <button onClick={()=>{props.onLogOut()}}>Log Out</button>
            </div>
            {!isCreatingTransfer && !isCreatingNewAccount? <div className="mainContainer">
                {isPersonalInfo ? <Personal onChangePIN={props.onChangePIN} onChangePass={props.onChangePass} currentUserData={props.currentUserData}/> : ""}
                {isData ? <Data transfers={props.transfers} onRemoveAccount={props.onRemoveAccount} accounts={props.accounts} currentUserData={props.currentUserData}/> : ""}
            </div> : ""}

            {isCreatingTransfer ? 

                <div className="newTransferDiv" onChange={()=>{setIsError(false)}}>

                    <div>
                        <h1>New Transfer Form</h1>
                        <p><input type="text" value={titleOfTransfer} placeholder="Title" onChange={(e)=>{setTitleOfTransfer(e.target.value)}}/></p>
                        <p><input type="text" value={homeAccount} placeholder="From" onChange={(e)=>{setHomeAccount(e.target.value)}}/>
                        <input type="text" value={destinationAccount} placeholder="To" onChange={(e)=>{setDestinationAccount(e.target.value)}}/></p>
                        <p><input type="number" value={valueOfTransfer} placeholder="Amount" onChange={(e)=>{setValueOfTransfer(e.target.value)}}/></p>
                        <button className="sentTransferButton" onClick={()=>{sendTransfer()}}> Send </button>
                        {isError ? <p className="errorMessage">ERROR</p> : ""}
                    </div>
                
                </div> 
            
            : ""}

            {isCreatingNewAccount ? 
            
            <div className="newTransferDiv" onChange={()=>{setIsError(false)}}>

                    <div>
                        <h1>New Account Form</h1>
                        <p><input type="text" value={nameOfAccount} placeholder="Name of account" onChange={(e)=>{setNameOfAccount(e.target.value)}}/></p>
                        <button className="sentTransferButton" onClick={()=>{createNewAccount()}}> Send </button>
                        {isError ? <p className="errorMessage">ERROR</p> : ""}
                    </div>
                
            </div> : ""}
        </>
    )
}