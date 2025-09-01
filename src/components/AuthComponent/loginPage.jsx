import {  Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/operations.js";
import { AuthAPI } from "../../services/api.js";
import { loginValidationSchema } from "./Schemas/loginValidationSchema.jsx";
import { Formik, Field, ErrorMessage, Form } from "formik";
import styles from './loginPage.module.css'
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = loginValidationSchema
  const [showPassword, setShowPassword] = useState("false")

  const initialValues = {
    email: "",
    password: ""
  }

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const res = await AuthAPI.login(values)
      console.log("LOGIN RESPONSE:", res.data);
      
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      dispatch(loginUser(res.data.data));
      navigate("/");
    } catch (err) {
      if (err.response) {
        const messages = err.response.data.errors || [err.response.data.message]
        setFieldError("email", messages.join(", "))
      }
    } finally {
        setSubmitting(false)
      }
    }

    return (
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema()}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className={styles.formContainer}>
              <h2 className={styles.loginTitle}>Login</h2>
              <label className={styles.labelLoginForm}>Enter your email address</label>
              <Field className={styles.fieldEmail} type="email" name="email" placeholder="email@gmail.com" autoComplete="off" />
              <ErrorMessage
                name="email"
                component="strong"
                className={styles.errorMessage}
              />
              
              <label className={styles.labelLoginForm}>Create a strong password</label>
              <div className={styles.wrapperForShowBtn}>
                <Field
                  className={styles.fieldEmail}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                />
                <button className={styles.btnShowPassword} type="button" onClick={() => setShowPassword(prev => !prev)}>
                  <img src="../../../public/eye-crossed.jpg" alt="Eye" /></button>
                </div>
              <ErrorMessage
                name="password"
                component="strong"
                className={styles.errorMessage}
              />

              <button className={styles.btnLogin}
                type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Login"}
              </button>
            </Form>
)}
        </Formik>
              <p className={styles.textRoute}>
        Don`t have an account? <Link className={styles.linkToRegister} to={"/auth/register"}>Register</Link>
      </p>
      </div>
    );
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await AuthAPI.login({ email, password });
  //     console.log({ res });
  //     localStorage.setItem("accessToken", res.data.data.accessToken);
  //     localStorage.setItem("refreshToken", res.data.data.refreshToken);
  //     localStorage.setItem("user", JSON.stringify(res.data.data));
  //     dispatch(loginUser(res.data.data));
  //     navigate("/");
  //   } catch (err) {
  //     if (err.response) {
  //       const messages = err.response.data.errors || [
  //         err.response.data.message,
  //       ];
  //       setError(messages.join(", "));
  //     }
  //   }
  // };