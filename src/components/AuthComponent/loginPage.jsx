import { useState } from "react";
import { AuthAPI } from "../../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { loginValidationSchema } from "../../utils/validationSchemas.js";
import { login } from "../../redux/auth/slice.js";
import Icon from "../Icon/index.jsx";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await AuthAPI.login(values);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      dispatch(login(res.data.data));
      navigate("/");
    } catch (err) {
      if (err.response) {
        const messages = err.response.data.errors || [
          err.response.data.message,
        ];
        toast.error(messages.join(", "));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={loginValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.formContainer}>
            <h2 className={styles.loginTitle}>Login</h2>

            <label className={styles.labelLoginForm}>
              Enter your email address
            </label>
            <Field
              className={`${styles.fieldEmail} ${
                errors.email ? styles.inputError : ""
              }`}
              type="email"
              name="email"
              placeholder="email@gmail.com"
              autoComplete="off"
            />
            <ErrorMessage
              name="email"
              component="strong"
              className={styles.error}
            />

            <label className={styles.labelLoginForm}>Enter your password</label>
            <div className={styles.wrapperForShowBtn}>
              <Field
                className={`${styles.fieldEmail} ${
                  errors.password ? styles.inputError : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
              />
              <button
                className={styles.btnShowPassword}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon width={24} height={24} name="eye-crossed" />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="strong"
              className={styles.error}
            />

            <button
              className={styles.btnLogin}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.textRoute}>
        Don`t have an account?{" "}
        <Link className={styles.linkToRegister} to={"/auth/register"}>
          Register
        </Link>
      </p>
    </div>
  );
}
