import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../redux/auth/slice"


export default function Logout() {
    
const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogout = () => {
    dispatch(logout())
    navigate("/auth/login")
    }
    return handleLogout
};
