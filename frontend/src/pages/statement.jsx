import { useEffect, useState } from "react";
import { Appbar } from "../component/Appbar";


export function Statement() {
    const [statements, setStatement] = useState([])
    


     useEffect(() => {
        fetch(`http://localhost:3000/api/v1/account/statement`, {
            method: "GET" ,
            headers: {
             'Content-Type': 'application/json',
             Authorization: "Bearer " + localStorage.getItem("token")
            }
        
         }).then(async(response) => {
                const data = await response.json();
                setStatement(data.statements)
               
         })

     },[]) 

     let SN =1;

    return <div>
        <Appbar username={"Sushen"} firstletter={"S"} />
        <div>
            <h4 className="font-semibold px-6 p-2 text-center shadow-sm text-green-500">Statement</h4>
            <div className="grid grid-cols-10 text-center shadow-sm">
                <p className="px-5 p-2 font-semibold col-span-1">S.N</p>
                <p className="px-5 p-2 font-semibold col-span-1">Transcation ID</p>
                <p className="px-5 p-2 font-semibold col-span-2">Name</p>
                <p className="px-5 p-2 font-semibold col-span-2">Status</p>
                <p className="px-5 p-2 font-semibold col-span-2">Amount</p>
                <p className="px-5 p-2 font-semibold col-span-2">Date</p>
       
            </div>
           
          {statements.map((statement) => (
           
         <StatementDetails  key={statement.transactionId} sn={SN++} name={statement.name} status={statement.status} amount={statement.transactionAmount} date={statement.transactionDate} transactionID={statement.transactionId} />
               
              
          ))}
        
        

        </div>
    </div>

    }

    
    function StatementDetails({ sn, name, status, amount, date, transactionID }) {
        
        
        return   <div className={divColor({status})}>
              <p className="px-5 p-2 font-semibold col-span-1">{sn}</p>
              <p className="px-5 p-2 font-semibold col-span-1">{transactionID}</p>
                <p className= "px-5 p-2 font-semibold col-span-2"  >{name}</p>
                <p  className="px-5 p-2 font-semibold col-span-2" >{status}</p>
                <p className="px-5 p-2 font-semibold col-span-2">{amount}</p>
                <p className="px-5 p-2 font-semibold col-span-2">{date}</p>
               
        </div>
    }

    function divColor({status}) {
        if(status=="Send") {
         return   "grid grid-cols-10 text-center shadow-sm text-slate-700 bg-red-500" }
            else {
           return  "grid grid-cols-10 text-center  shadow-sm text-slate-700 bg-green-500" }
            }