import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function Appbar() {
    const navigate = useNavigate();
    const [name, setName] = useState("")

    fetch(`${window.location.origin}/api/v1/user/name`, {
        method: "GET",
        headers: {
            'Authorization' : "Bearer " + localStorage.getItem("token")
        }
    }).then(async(response) => {
        const data = await response.json();
        setName(data.name)
        if(!response.ok) {
            if(response.status=== 401){
                navigate("/signin")
            }
        }
    })

    return <div className="shadow-md">
        <div className="flex justify-between items-center mx-5 py-3">
            <button onClick={() => {
                navigate("/dashboard")
            }} className="font-semibold text-slate-700 bg-green-400 p-3 px-7 rounded-3xl">E-Pay</button>
            <div className="flex justify-around align-middle items-center cursor-pointer" onClick={() => {
               navigate("/profile")
            }}>
                <div className="font-semibold">{name}</div>
                <div className=" ml-2 flex w-10 h-10 justify-center items-center bg-slate-400 rounded-full">{name[0]}</div>
            </div>
        </div>
    </div>
}