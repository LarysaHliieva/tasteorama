import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../services/api.js";
import { loginUser } from "../../redux/auth/operations.js";



export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


const handleRegister = async (e) => {
    e.preventDefault()
    try {
        const res = await AuthAPI.register({ name, email, password, confirmPassword })
        console.log("REGISTER RESPONSE:", res.data)
        localStorage.setItem("accessToken", res.data.data.accessToken)
        localStorage.setItem("refreshToken", res.data.data.refreshToken)
        localStorage.setItem("user", JSON.stringify(res.data.data));
        
        dispatch(loginUser(res.data.data))
        navigate('/')
    } catch (err) {
        if (err.response) {
            const messages = err.response.data.errors || [err.response.data.message]
            setError(messages.join(", "))
        }
    }
    
    };


        return (
            <div>
                <form onSubmit={handleRegister}>
                    <h1>Register</h1>
                    <p>Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations</p>
                    <label>Enter your name</label>
                    <input
                        type="text"
                        placeholder="Max"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Enter your email address</label>
                    <input
                        type="text"
                        placeholder="email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Create a strong password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                    <label>Repeat your password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="**********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "Show" : "Close"}
                    </button>
                    <button type="submit">Create account</button>
                </form>
                <p>Already have an account?
                    <Link to='/auth/login'>Log in</Link>
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        )
    }
