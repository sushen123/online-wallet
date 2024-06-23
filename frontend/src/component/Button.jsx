
export function Button({label,onClick}) {
    return <div className="ml-3.5 mr-2">
        <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900  focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5  mb-2 mt-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 my-2  w-full active:bg-slate-500 px-5">{label}</button>
    </div>
}