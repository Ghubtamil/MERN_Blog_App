const Alert = ({msg}) =>{
    return <div className="bg-red-600 text-white p-2 rounded-md mt-6 text-sm">
    <i className="fa-solid fa-triangle-exclamation"></i>
    {msg}
    </div>
}
export default Alert