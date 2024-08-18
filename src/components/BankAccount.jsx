import "./BankAccount.css"


export const BankAccount = (props) => {
    
    const checkDetails = () => {
        props.onCheckDetails(props.accountInfo.accountKey)
    }

    const removeAccount = () => {
        props.onRemoveAccount(props.accountInfo.accountKey)
    }

    return (
        <>
            <div className="accountDiv">
                <div onClick={() => {checkDetails()}} className="info">
                    <p style={{fontWeight: "bold"}}>{props.accountInfo.name}</p>
                    <p>{props.accountInfo.ownerName} : {props.accountInfo.ownerKey}</p>
                    <p>Account Key: {props.accountInfo.accountKey}</p>
                    <p>Saldo: {props.accountInfo.saldo}</p>
                </div>
                <div className="buttons">
                    <button onClick={() => {removeAccount()}} className="removeButton">Remove</button>
                </div>
            </div>
        </>
    )
}