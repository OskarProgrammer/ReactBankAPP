import "./AccountDetails.css"
import { Transfer } from "./Transfer"


export const AccountDetails = (props) => {

    const back = () => {
        props.onBack()
    }

    return (
        <>
            <div className="detailsAccount">
                <div className="barWithButton">
                    <div>Owner: {props.accountInfo.ownerName}</div>
                    <button onClick={()=>{back()}}>Back</button>
                </div>
                <div className="details">
                    <div  className="incoming">
                        <p style={{color: "green"}}>Incoming</p> 

                        {props.transfers.map((transfer)=>{
                            if(transfer.toKey == props.accountInfo.accountKey) {
                                return <Transfer transferInfo={transfer}/>
                            }
                        })}

                    </div>
                    <div  className="outcoming">
                        <p style={{color: "red", fontWeight: "bold"}}>Outcoming</p>

                        {props.transfers.map((transfer)=>{
                            if(transfer.fromKey == props.accountInfo.accountKey) {
                                return <Transfer transferInfo={transfer}/>
                            }
                        })}

                    </div>
                </div>

                <div className="ogolne">
                    <p>Account Name: {props.accountInfo.name}</p>
                    <p>Amount of money: {props.accountInfo.saldo}</p>
                    <p>Owner Key: {props.accountInfo.ownerKey} </p>
                    <p>Account Key: {props.accountInfo.accountKey}</p>
                </div>
            </div>
        </>
    )
}