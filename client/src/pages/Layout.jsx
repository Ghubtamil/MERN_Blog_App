import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  // use navigate hook
  const navigate = useNavigate();

  // grab the user global state
  const { user, setUser } = useContext(UserContext);

  // handle logout
  const handleLogout = () => {
    if (confirm("Confirm Logout?")) {
      // Rest the user state
      setUser({email:null,posts:[] });
      // remove the items from the local storage
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      // navigate hook
      navigate("/");
    }
   
  };
  

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4 max-w-screen-lg mx-auto">
          <Link 
          title="Home" 
          to="/" 
          className="fa-solid fa-house nav-link"
          ></Link>
           
          {user.email ? (
            <div className="flex items-center gap-2">
              <Link
                title="Create Post"
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>

              <Link
                title="Dashboard"
                to="/dashboard"
                className="fa-solid fa-circle-user nav-link"
              ></Link>

              <button
                title="Logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                title="Login"
                to="/login"
                className="fa-solid fa-right-to-bracket nav-link"
              />
              <Link
                title="Register"
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              />
            </div>
          )}
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
