import { useState } from "react";
import { AuthAPI } from "../../services/api.js";
import { login } from "../../redux/auth/slice.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { registerValidationSchema } from "../../utils/validationSchemas.js";
import styles from "./registerPage.module.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const { name, email, password, confirmPassword } = values;
      const res = await AuthAPI.register({
        name,
        email,
        password,
        confirmPassword,
      });

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
        onSubmit={handleRegister}
        validationSchema={registerValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.formContainer}>
            <h1 className={styles.registerTitle}>Register</h1>
            <p className={styles.textDescription}>
              Join our community of culinary enthusiasts, save your favorite
              recipes, and share your cooking creations
            </p>

            <label className={styles.labelRegisterForm}>Enter your name</label>
            <Field
              className={`${styles.fieldEmail} ${
                errors.name ? styles.inputError : ""
              }`}
              type="text"
              name="name"
              placeholder="Max"
              autoComplete="off"
            />
            <ErrorMessage
              className={styles.error}
              name="name"
              component="strong"
            />

            <label className={styles.labelRegisterForm}>
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
              className={styles.error}
              name="email"
              component="strong"
            />

            <label className={styles.labelRegisterForm}>
              Create a strong password
            </label>
            <div className={styles.wrapperForShowBtn}>
              <Field
                className={`${styles.fieldEmail} ${
                  errors.password ? styles.inputError : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="**********"
                autoComplete="off"
              />
              <button
                className={styles.btnShowPassword}
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img src="../../../public/eye-crossed.jpg" alt="eyeShowPwd" />
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="strong"
              className={styles.error}
            />

            <label className={styles.labelRegisterForm}>
              Repeat your password
            </label>
            <div className={styles.wrapperForShowBtn}>
              <Field
                className={`${styles.fieldEmail} ${
                  errors.confirmPassword ? styles.inputError : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="**********"
                autoComplete="off"
              />
              <button
                className={styles.btnShowConfirmPassword}
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <img src="../../../public/eye-crossed.jpg" alt="eyeShowPwd" />
              </button>
            </div>
            <ErrorMessage
              className={styles.error}
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
                <span className={styles.spanWrapperForPrivacyText}>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>
            <ErrorMessage
              className={styles.error}
              name="agree"
              component="strong"
            />

            <button
              className={styles.btnRegister}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Create account"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.textRoute}>
        Already have an account?{" "}
        <Link className={styles.linkToLoginFormRegister} to="/auth/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
