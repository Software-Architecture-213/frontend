const AdminLoginForm = () => {
    return(
        <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 text-black color bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 text-black border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-f75f07"
        />
        <button className="w-full py-3 main-text bg-white  bg-f75f07 text-white rounded-md hover:bg-f75f07/90 focus:outline-none">
          Login as Admin
        </button>
      </div>
    )
  
}
export default AdminLoginForm