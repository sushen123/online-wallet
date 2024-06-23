import { useState } from "react";
import { Button } from "../component/Button";
import { Description } from "../component/Description";
import { Header } from "../component/Header";
import { Input } from "../component/Input";
import { WarningButton } from "../component/WarningButton";
import { parsePath, useNavigate } from "react-router-dom";


export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate();


    return <div className="flex justify-center w-full h-screen items-center bg-blue-200">
        <div className="bg-white shadow-md pb-1.5 w-80 rounded-lg">
        <Header label={"Sign In"} />
        <Description label={"Enter your information for Log In"} />
        <Input label={"Email"} placeholder={"sushen@gmail.com"} onChange={(e) => {
            setUsername(e.target.value)
        }} />
        <Input label={"Password"} placeholder={"1234"} onChange={(e) => {
            setPassword(e.target.value)
        }} />
        <Button onClick={async() => {
            const response = await fetch("http://localhost:3000/api/v1/user/signin", {
                method: "POST",

                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
    
                }
            })
            const data = await response.json();
            if(!response.ok){
                setErr(data.message)
            }
            else{
                
            localStorage.setItem("token", data.token)
            navigate("/dashboard");
            }
            
        }} label={"Sign in"} />
        {err && <div className="text-center text-red-500">
                {err}
            </div>}
        <WarningButton label={"Sign Up"} text={"Do not have an account?"} to={"/"} />
        </div>

    </div>
}