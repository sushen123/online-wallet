import { useState, useRef, useEffect } from "react";
import App from "../App";
import { Appbar } from "../component/Appbar";
import { useNavigate } from "react-router-dom";


export function Profile() {
    const [name, setName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/name", {
            method: "GET",
            headers: {
                'Authorization' : "Bearer " + localStorage.getItem("token")
            }
        }).then(async(response) => {
            const data = await response.json();
            setName(data.name)
          
        })
    },[])
    
    const handleSave = () => {
        if (value.length < 3) {
            setError("Length of the name should be more than 3 characters");
        } else {
            if (value !== name) {
                updateUserName(value);
                
            }
            setError("");
            toggleEdit();
        }
    };

 

    const updateUserName = (newName) => {
        fetch("http://localhost:3000/api/v1/user/update", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                firstName: newName
            })
        })
        .then(async (response) => {
            const data = await response.json();
            setName(newName);
           
        })
        .catch(error => {
            console.error('Error updating user name:', error);
         
        });
    };



    useEffect(() => {
        if(isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    },[isEditing]);


    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setValue(name)
        setError("")
    }

  

    return <div>
        <Appbar username={name} firstletter={name[0]} />
        <div className="p-3 font-extralight shadow-sm justify-center">
            <div className="flex justify-center">
        <div className=" ml-2 flex w-20 h-20 justify-center text-4xl font-bold items-center bg-slate-400 rounded-full">{name[0]}</div>
        </div>
        <div>
        <div className={`ml-2 mt-2 justify-center text-2xl font-semibold items-center ${isEditing ? 'hidden' : 'flex' } `}>
            {name}
            <button onClick={toggleEdit} className="pl-2 text-green-500"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
            </button>
            </div> 
        <div className={` ${isEditing ? 'flex' : 'hidden'} justify-center pt-3`}>
                <input value={value} ref={inputRef} onChange={(e) => {
                   
                    setValue(e.target.value);
                }} type="text" className="border text-lg px-2 p-1.5 rounded-s-2xl" />
                <button onClick={handleSave} className="text-sm bg-green-400 px-4 rounded-r-2xl font-semibold" >
                    Save
                </button>          
          </div>
          {error && (<div className="text-red-500 text-center mt-2">
                {error}
            </div>)}
        </div>
        </div> 
        <div> 
            
            <div className="text-center">
              
               <button onClick={() => {
                localStorage.removeItem("token")
                navigate("/signin")
               }} className="border p-2 mt-5 rounded-xl bg-slate-700 text-green-400 ">
                Logout
               </button>
            </div>
        </div>
    </div>
}