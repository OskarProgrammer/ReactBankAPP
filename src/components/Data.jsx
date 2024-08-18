import { useState } from "react"
import "./Data.css"
import { BankAccount } from "./BankAccount"
import { AccountDetails } from "./AccountDetails"


export const Data = (props) => {
    const [keyPhrase, setKeyPhrase] = useState("")
    const [isDetails, setIsDetails] = useState(false)
    
    let [currentAccountInfo, setCurrentAccoutInfo] = useState({})

    const checkDetails = (accountKey) => {
        setIsDetails(true)

        props.accounts.map((account)=>{
            if(accountKey == account.accountKey) {
                currentAccountInfo = account
            }
        })

        setCurrentAccoutInfo(currentAccountInfo)
    }

    const backTo = () => {
        setIsDetails(false)
        setCurrentAccoutInfo({})
    }

    return (
        <>
            {props.currentUserData.isAdmin == "true" ? <div className="searchBar">
                <input type="text" onChange={(e)=>{setKeyPhrase(e.target.value)}} value={keyPhrase} placeholder="Search accounts by typing account key, owner key, owner name"/>
            </div>:""}

            <div className="accounts">
                {!isDetails ? props.accounts.map((account)=>{
                    if (props.currentUserData.isAdmin == "false") {
                        if (account.ownerKey == props.currentUserData.key) {
                            return <BankAccount onRemoveAccount={props.onRemoveAccount} onCheckDetails={checkDetails} accountInfo={account} />
                        }
                    }else{
                        if (keyPhrase == ""){
                            return <BankAccount onRemoveAccount={props.onRemoveAccount} onCheckDetails={checkDetails} accountInfo={account} />
                        }else if (keyPhrase !== ""){
                            if (account.ownerKey == keyPhrase || account.accountKey == keyPhrase || account.ownerName == keyPhrase){
                                return <BankAccount onRemoveAccount={props.onRemoveAccount} onCheckDetails={checkDetails} accountInfo={account} />
                            }
                        }
                    }
                }) : <AccountDetails transfers={props.transfers} onBack={backTo} accountInfo={currentAccountInfo}/>}
            </div>
        </>
    )
}