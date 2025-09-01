import * as Yup from 'yup';

export const registerValidationSchema = () => Yup.object({
  name: Yup.string()
    .min(3, 'Name should have at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email("Email must be a valid email. Example: 'example@gmail.com'")
    .required("Email is required"),
  password: Yup.string()
    .min(5, 'Password should have at least 5 characters')
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Password confirmation is required"),
  agree: Yup.boolean().when([], {
    is: () => window.innerHeight <= 768,
    then: (schema) => schema.oneOf([true], 'You must agree'),
    otherwise: (schema) => schema.notRequired()
  })
})
