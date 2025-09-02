import { useState } from "react";
import { AuthAPI } from "../../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../redux/auth/slice.js";
import styles from "./loginPage.module.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await AuthAPI.login({ email, password });
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
        setError(messages.join(", "));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form className={styles.formContainer}>
            <h2 className={styles.loginTitle}>Login</h2>

            <label className={styles.labelLoginForm}>
              Enter your email address
            </label>
            <Field
              className={styles.fieldEmail}
              type="email"
              name="email"
              placeholder="email@gmail.com"
              autoComplete="off"
            />
            <ErrorMessage
              name="email"
              component="strong"
              className={styles.errorMessage}
            />

            <label className={styles.labelLoginForm}>
              Enter your password
            </label>
            <div className={styles.wrapperForShowBtn}>
              <Field
                className={styles.fieldEmail}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
              />
              <button
                className={styles.btnShowPassword}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src="../../../public/eye-crossed.jpg" alt="Eye" />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="strong"
              className={styles.errorMessage}
            />

            {error && <p className={styles.errorMessage}>{error}</p>}

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
