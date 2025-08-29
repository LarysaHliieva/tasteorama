import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => {
        setError(typeof err === "string" ? err : err?.message || "Login failed");
      });
  };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <label>Enter your email address</label>
                <input
                    type="text"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Enter your password</label>
                <input
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>Don`t have an account?
                <Link to={"/auth/register"}>Register</Link>
            </p>
                        {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
};

