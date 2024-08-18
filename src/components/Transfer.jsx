import "./Transfer.css"

export const Transfer = (props) => {

    return (
        <>
            <div className="transferDiv">
                <h2>{props.transferInfo.title}</h2>
                <p>From key: {props.transferInfo.fromKey} <br /> To key: {props.transferInfo.toKey}</p>
                <p>From name: {props.transferInfo.fromName} <br /> To name: {props.transferInfo.toName}</p>
                <p>Value : {props.transferInfo.amount}</p>  
            </div>
            
        </>
    )
}