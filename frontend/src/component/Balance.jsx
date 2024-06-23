import {  useState } from "react"
import { useNavigate } from "react-router-dom";

export function Balance () {
    const [balance, setBalance] = useState("");
    const navigate = useNavigate();

    fetch(`http://localhost:3000/api/v1/account/balance`, {
        method: "GET",
        headers: {
            'Authorization' : "Bearer " + localStorage.getItem("token")
        }
    
    }).then(async(response) => {
        const amount = await response.json()
        setBalance(amount.balance)
       
    })
  

    return <div className="flex p-3 px-10 items-center justify-between shadow-sm mb-2">
        <div className="flex">
            <p className="font-semibold">Your Balance</p>
        <p className="px-2">{balance}</p>
        </div>
        <div className="font-semibold">
           <button className="border p-2 bg-lime-500 rounded-2xl hover:bg-lime-200 active:bg-lime-900 " onClick={() => {
                navigate("/statement")
           }}>Statement</button>
        </div>
    </div>
}