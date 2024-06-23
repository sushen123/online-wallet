import { Appbar } from "../component/Appbar";
import { Balance } from "../component/Balance";
import { Users } from "../component/Users";


export function Dashboard() {
    return <div>
        <Appbar  />
        <Balance />
       
        <Users />
    </div>
}