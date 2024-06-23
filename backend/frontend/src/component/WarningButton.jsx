import { Link } from "react-router-dom"

export function WarningButton({text, label, to}) {

    return <div className="flex justify-center mb-2 text-sm font-medium text-slate-700">
        <p className="">{text}</p>
        <Link className=" underline ml-2 hover:text-blue-500 font-semibold" to={to} >{label}</Link>
    </div>
}