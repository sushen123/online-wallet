

export function Input({label, placeholder, onChange}) {

    return <div className="  p-1 mx-2 ">
        <label className="text-sm font-semibold" htmlFor={label}>{label}</label>
       <br />
        <input className="border p-1.5 mt-1.5 rounded-lg w-full " type="text" name={label} placeholder={placeholder} onChange={onChange}/>
    </div>
}