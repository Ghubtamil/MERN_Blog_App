import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import Alert from "../../Components/Alert";

const Login = () => {
  
  const {setUser} = useContext(UserContext)

  const navigate = useNavigate() 

  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =async (e) =>{
    e.preventDefault()
    try {
        await loginUser(email,password)

        setUser ({email,posts:[]})
        navigate('/dashboard')
    } catch (error) {
        setError(error.message)
    }
  }

  return (

    <section className="card">
      <h1 className="title">Login to your Account</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn">Login</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};
export default Login;
