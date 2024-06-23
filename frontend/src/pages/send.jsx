import { useState } from "react";
import { Header } from "../component/Header"
import { useNavigate, useSearchParams } from "react-router-dom"

export function Send() {
        const [searchParams] = useSearchParams();
        const id = searchParams.get("id");
        const name = searchParams.get("name");
        const [amount, setAmount] = useState(0);
        const [err, setErr] = useState(null);
        const navigate = useNavigate();

        const handleKeyDown = (e) => {
         
            if(e.key === '-' || e.key === '+' || e.key === '*' || e.key === '/' || e.key === 'e' || e.key==="E"){
                e.preventDefault();
            }
        };

    return <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className=" shadow-xl p-5 rounded-lg bg-white">
       <Header label={"Send Money"}></Header>
       <div className="flex items-center my-2 mt-10">
    <div className="font-semibold ml-2 flex w-10 h-10 justify-center items-center bg-green-400 rounded-full text-white">{name[0]}</div>
    <div className="font-semibold m-2">{name}</div>
    </div>
    <div className="font-semibold text-sm ml-2 mb-2">
        Amount (In Rs)
    </div>
    <div className="mx-2">
        <input onKeyDown={handleKeyDown} type="number" placeholder="Enter amount" className="border w-80 rounded-md p-2 " onChange={(e) => {
            setAmount(parseInt(e.target.value));
        }} />
        <br />
        <button onClick={async() => {
            const response = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
                method: "POST",
                headers: {
                     'Content-Type': 'application/json',
                     Authorization: "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    toAccountId: id,
                    balance: amount
                })
            })
            if (!response.ok) {
                if(response.status===401) {
                    navigate("/signin")
                }

                const errorData = await response.json();
                setErr(errorData.message || "An error occured")
            }
            else {
                setErr(null)
                const data = await response.json();
                const senderName = data.senderName;
                const recieverName = data.recieverName;
                const transactionId = data.transactionId
                navigate("/success", {
                    state: {senderName, recieverName, transactionId, amount}})
            }
            
        }} type="button" className="text-white bg-emerald-400 hover:bg-gray-900  focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5  mb-2 mt-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 my-2   active:bg-slate-500 px-5 w-full">Transfer</button>
       
        {err &&  <div className="text-red-500 mt-2">{err}</div> }
    </div>
    </div>
    </div>
}