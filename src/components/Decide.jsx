import "./Decide.css"

export const Decide = (props) => {



    return(
        <>
        
            <div className="decisionContainer">
                <h2>Decision</h2>
                <p>You have logged into administrator account</p>
                <p>Do you want to continue as admin or as customer?</p>
                <div className="buttonsContainer">
                    <button className="adminPanel" onClick={()=>{props.onChoice(true)}}>Admin</button>
                    <button className="customerPanel" onClick={()=>{props.onChoice(false)}}>Customer</button>
                </div>
            </div>

        </>
    )
}