import { useLocation, useNavigate } from "react-router-dom";
import { Appbar } from "../component/Appbar";


export function TransactionSuccess () {
    const location = useLocation();
    const navigate = useNavigate();
    const {senderName, recieverName, transactionId, amount} = location.state 
  
    

    return <div>
             <Appbar username={"Sushen"} firstletter={"S"} />
            <div className="bg-green-200 h-52">
                <h2 className="text-center my-2 py-2 shadow-sm text-green-400 font-semibold">Transfer Statement </h2>
            <div className="flex justify-around font-mono font-semibold text-slate-500 my-10 ">
                <p>Sender Name:{senderName}</p>
                <p>Transaction ID: {transactionId}</p>
            </div>
            <div className="flex justify-around font-mono font-semibold text-slate-500 my-10 ">
                <p>Reciever Name: {recieverName}</p>
                <p>Amount: {amount}</p>
            </div>
            </div> 
            <div className="text-center my-5">
            <button onClick={() => {
                navigate("/dashboard")
            }} className="border text-center p-2 rounded-md bg-green-400">Home Page</button>
            </div>
        



    </div>
   
}