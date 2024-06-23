import { Button } from "../component/Button";
import { Description } from "../component/Description";
import { Header } from "../component/Header";
import { WarningButton } from "../component/WarningButton";
import { useEffect, useState } from "react";
import { Input } from "../component/Input";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";


export function Singup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null)
    const navigate = useNavigate();


    
    return <div className="flex justify-center w-full h-screen items-center bg-blue-200">
        <div className="bg-white shadow-md w-80 pb-2 rounded-lg">
            <Header label={"Sign Up"} />
            <Description label={"Enter your information to create an account"}  />
            <Input onChange={e => {
                setFirstName(e.target.value)
            }} label={"First Name"} placeholder={"Sushen"}  />
            <Input onChange={e => {
                setlastName(e.target.value)
            }} label={"Last Name"} placeholder={"Oli"}  />
            <Input onChange={e => {
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"sushen@gmail.com"}  />
            <Input onChange={e => {
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"Password"}  />
            <Button onClick={async() => {
              const response  =  await fetch(`${window.location.origin}/api/v1/user/signup`, {
                   method: "POST" ,
                   headers: {
                    'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                })
                }
                
            );
            const data = await response.json();
            if(!response.ok) {
                setErr(data.message)
            }
            else {
                localStorage.setItem("token", data.token)
            navigate('/dashboard')
            }
            }} label={"Sign up"} />
            {err && <div className="text-center text-red-500">
                {err}
            </div>}
            <WarningButton label={"Sign in"} text={"Already have an account?"} to={"/signin"}  />
        </div>
    </div>
}