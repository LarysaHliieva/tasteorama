import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthAPI } from "../../services/api.js";
import { loginUser } from "../../redux/auth/operations.js";
import { registerValidationSchema } from "./Schemas/registerValidationSchema.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from './registerPage.module.css'



export default function RegisterPage() {
    const validationSchema = registerValidationSchema
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false
    }

    const handleRegister = async (values, { setSubmitting, setFieldError }) => {
        try {
            const res = await AuthAPI.register(values)
            console.log("Register response", res.data);

            localStorage.setItem("accessToken", res.data.data.accessToken)
            localStorage.setItem("refreshToken", res.data.data.refreshToken)
            localStorage.setItem("user", JSON.stringify(res.data.data));

            dispatch(loginUser(res.data.data))
            navigate("/")
        } catch (err) {
            if (err.response?.data?.errors) {
                Object.entries(err.response.data.errors).forEach(([field, message]) => {
                    setFieldError(field, message)
                })
        }
        } finally {
            setSubmitting(false)
        }
    }



        return (
            <div className={styles.container}>
                <Formik
                    className={styles.formik}
                    initialValues={initialValues}
                    validationSchema={validationSchema()}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.formContainer}>
                            <h1 className={styles.registerTitle}>Register</h1>
                            <p className={styles.textDescription}>Join our community of culinary enthusiasts, save your favorite recipes, and share your cooking creations</p>
                            <label className={styles.labelRegisterForm}>Enter your email address</label>
                            <Field
                                className={styles.fieldEmail}
                                name="email"
                                placeholder="email@gmail.com"
                                autoComplete="off"
                            />
                            <ErrorMessage
                            className={styles.errorMessage}
                                name="email"
                                component="strong"
                            />
                            <label className={styles.labelRegisterForm}>Enter your name</label>
                            <Field
                                className={styles.fieldEmail}
                                type="text"
                                name="name"
                                placeholder="Max"
                                autoComplete="off"
                            />
                            <ErrorMessage
                            className={styles.errorMessage}
                                name="name"
                                component="strong"
                            />
                            <label className={styles.labelRegisterForm}>Create a strong password</label>
                            <div className={styles.wrapperForShowBtn}>
                            <Field
                             className={styles.fieldEmail}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="**********"
                                autoComplete="off"
                            />
                            <button 
                            className={styles.btnShowPassword}
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            ><img src="../../../public/eye-crossed.jpg" alt="eyeShowPwd"/></button>
                            </div>
                                <ErrorMessage
                                name="password"
                                component="strong"
                                className={styles.errorMessage}
                            />
                            <label className={styles.labelRegisterForm}>Repeat your password</label>
                            <div className={styles.wrapperForShowBtn}>
                            <Field
                             className={styles.fieldEmail}
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="**********"
                                autoComplete="off"
                            />
                            <button 
                            className={styles.btnShowConfirmPassword}
                                type="button"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            ><img src="../../../public/eye-crossed.jpg" alt="eyeShowPwd"/></button>
                            </div>
                                <ErrorMessage
                                className={styles.errorMessage}
                                name="confirmPassword"
                                component="strong"
                            />
                            <div className={styles.wrapperForCheckbox}>
                                <label htmlFor="agree" className={styles.labelAgree}>
                                    <Field
                                id="agree"
                                type="checkbox"
                                name="agree"
                                className={styles.checkBox}
                            />
                                    <span className={styles.checkBoxFake}></span>
                                    <span className={styles.spanWrapperForPrivacyText}>I agree to the Terms of Service and Privacy Policy</span> 
                                </label>
                                </div>
                            <ErrorMessage
                            className={styles.errorMessagePrivacy}
                                name="agree"
                                component="strong"/>
                            <button className={styles.btnRegister} type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Loading..." : "Create account"}
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className={styles.textRoute}> 
                Already have an account? 
                <Link className={styles.linkToLoginFormRegister} to="/auth/login">Log in</Link>
                </p>
            </div>
        )
    }

