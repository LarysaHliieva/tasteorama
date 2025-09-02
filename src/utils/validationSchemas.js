import * as Yup from "yup";

export const loginValidationSchema = () =>
  Yup.object({
    email: Yup.string()
      .email('email must be a valid email. Example:"example@gmail.com"')
      .required("email is required!"),
    password: Yup.string().required("password is required"),
  });

export const registerValidationSchema = () =>
  Yup.object({
    name: Yup.string()
      .min(3, "Name should have at least 3 characters")
      .max(16, "Name should have at most 16 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email. Example: 'example@gmail.com'")
      .max(128, "Email should have at most 128 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password should have at least 8 characters")
      .max(128, "Password should have at most 128 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
    // agree: Yup.boolean().when([], {
    //   is: () => window.innerHeight < 768,
    //   then: (schema) => schema.oneOf([true], "You must agree"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    agree: Yup.boolean()
      .oneOf([true], "You must agree to the Terms and Privacy Policy")
      .required("You must agree to the Terms and Privacy Policy"),
  });

export const addRecipeValidationSchema = Yup.object({
  title: Yup.string().max(64).required("Required"),
  description: Yup.string()
    .max(200, "Max 200 characters")
    .required("Description is required"),

  cookingTime: Yup.number()
    .min(1, "Min 1 minute")
    .max(360, "Max 360 minutes")
    .required("time in minutes"),

  calories: Yup.number().min(1, "Min 1 kcal").max(10000, "Max 10000 kcal"),

  category: Yup.string().required("Required"),

  ingredients: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Ingredient name is required"),
        measure: Yup.string()
          .min(2, "Min amount is 2")
          .max(16, "Max amount is 16")
          .required("Ingredient amount is required"),
      })
    )
    .min(1, "At least one ingredient is required"),

  instructions: Yup.string()
    .max(1200, "Max 1200 characters")
    .required("Instructions are required"),

  image: Yup.mixed()
    .test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .nullable(),
});
