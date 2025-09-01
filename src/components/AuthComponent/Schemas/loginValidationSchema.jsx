import * as Yup from 'yup'


export const loginValidationSchema = () => Yup.object({
    email: Yup.string()
        .email('email must be a valid email. Example:"example@gmail.com"')
        .required('email is required!'),
    password: Yup.string()
        .required("password is required")
})