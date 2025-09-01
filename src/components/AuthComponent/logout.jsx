import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth/slice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const checkTOken = () => {

      try {
        const decoded = jwtDecode(token);

        if (decoded.expire < Date.now()) {
          
          toast.error("Your session expired");
          dispatch(logout());
          localStorage.removeItem("token");
          navigate("/auth/login");
        }
      } catch (error) {
        
        toast.error("Your session expired");
        console.error("Invalid toke:", error);
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    };
    checkTOken();

    const interval = setInterval(checkTOken, 60000);
    return () => clearInterval(interval);
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  return handleLogout;
}
