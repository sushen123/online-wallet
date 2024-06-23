import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom";

export function Users() {
        const [users, setUsers] = useState([]);
        const [filter, setFilter] = useState("")
        const navigate = useNavigate();

        useEffect(() => {
             fetch(`http://localhost:3000/api/v1/user/search?filter=` + filter,{
                method: "GET",
                headers: {
                    'Authorization' : "Bearer " + localStorage.getItem("token")
                }
             })
           .then(async(response) => {
            const data = await response.json();
            setUsers(data.user)
            
           })
        },[filter])

    return     <div className="w-full px-6">
        <p className="font-semibold text-xl ">Users</p>
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} className="border border-slate-200 mt-2 p-2 w-full rounded-md mx- " type="text" placeholder="Search Users" />
       <div>
       {users.map((user) => {
        
     return   <User key={user._id} user={user} />
       })}
        
       </div>
    </div>

    function  User({user}) {
        return  <div className="flex justify-between px-4">
    <div className="flex items-center my-2">
    <div className=" ml-2 flex w-10 h-10 justify-center items-center bg-slate-400 rounded-full">{user.firstName[0]}</div>
    <div className="font-semibold m-2">{user.firstName} {user.lastName}</div>
    </div>
    <div>
   <Button onClick={() => {
   
    navigate("/send?id="+ user._id + "&name=" + user.firstName);
   }} label={"Send Money"} />
   </div>
</div>
    }
    
}