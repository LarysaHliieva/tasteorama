import * as Yup from "yup";

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
