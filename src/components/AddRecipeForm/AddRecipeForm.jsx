import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Icon from "../Icon/index.jsx";

import css from "./AddRecipeForm.module.css";

import {
  selectCategoriesOptions,
  selectIngredientsOptions,
} from "../../redux/filters/selectors";

import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations";

import { addOwnRecipe } from "../../redux/recipes/operations.js";

export default function AddRecipeForm() {
  const [tempIngredients, setTempIngredients] = useState([]);

  const dispatch = useDispatch();

  const categoriesOptions = useSelector(selectCategoriesOptions);
  const ingredientsOptions = useSelector(selectIngredientsOptions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const addIngredient = (ingredient, amount) => {
    if (!ingredient || !amount) return;
    const label =
      ingredientsOptions.find((i) => i.value === ingredient)?.label || "";
    setTempIngredients([...tempIngredients, { ingredient, label, amount }]);
  };
  const removeIngredient = (index) =>
    setTempIngredients(tempIngredients.filter((_, i) => i !== index));

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cookingTime: "",
        calories: "",
        category: "",
        ingredients: [],
        instructions: "",
        image: null,
        ingredient: "",
        amount: "",
      }}
      validationSchema={Yup.object({
        title: Yup.string().max(64).required("Required"),
        description: Yup.string()
          .max(200, "Max 200 characters")
          .required("Description is required"),

        cookingTime: Yup.number()
          .min(1, "Min 1 minute")
          .max(360, "Max 360 minutes")
          .required("time in minutes"),

        calories: Yup.number()
          .min(1, "Min 1 kcal")
          .max(10000, "Max 10000 kcal"),

        category: Yup.string().required("Required"),

        ingredients: Yup.array().of(
          Yup.object({
            name: Yup.string().required("Ingredient name is required"),
            amount: Yup.number()
              .min(2, "Min amount is 2")
              .max(16, "Max amount is 16")
              .required("Ingredient amount is required"),
          })
        ),
        // .min(1, "At least one ingredient is required"),

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
      })}
      onSubmit={async (values) => {
        const syncedIngredients = tempIngredients.map((t) => ({
          name: t.label,
          amount: t.amount,
        }));

        const { ingredient, amount, ...rest } = values;
        const payload = { ...rest, ingredients: syncedIngredients };
        console.log(payload);
        await dispatch(addOwnRecipe(payload)).unwrap();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.ContentRightImg}>
            <h3 className={css.upload}>Upload Photo</h3>
            <input
              id="fileInput"
              type="file"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
              className={css.fileInput}
              hidden
            />
            <div className={css.fileInputNoImage}>
              <label htmlFor="fileInput">
                {values.image ? (
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="preview"
                    className={css.preview}
                  />
                ) : (
                  <Icon
                    name="icon-bag"
                    width={96}
                    height={80}
                    className={css.addFile}
                  />
                )}
              </label>
            </div>
          </div>
          <div className={css.contentLeft}>
            <div className={css.fieldGroup}>
              <h3 className={css.subtitle}>General Information</h3>
              <label className={css.label}>Recipe Title</label>
              <Field
                name="title"
                className={css.input}
                placeholder="Enter the name of your recipe"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Recipe Description</label>
              <Field
                as="textarea"
                name="description"
                className={css.textarea}
                placeholder="Enter a brief description of your recipe"
              />
            </div>

            <div className={css.fieldGroup}>
              <label className={css.label}>Cooking Time in minutes</label>
              <Field name="cookingTime" type="number" className={css.input} />
            </div>

            <div className={css.wraperCalories}>
              <div>
                <label className={css.label}>Calories</label>
                <Field name="calories" type="number" className={css.cooking} />
              </div>
              <div>
                <label className={css.label}>Category</label>
                <Field as="select" name="category" className={css.select}>
                  <option value="">Select a category</option>
                  {categoriesOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
          </div>

          <div className={css.ingredients}>
            <h3 className={css.igradientTitle}>Ingredients</h3>
            <div className={css.wraperIngredients}>
              <Field as="select" name="ingredient" className={css.select}>
                <option value="">Select an ingredient</option>
                {ingredientsOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>

              <Field
                name="amount"
                placeholder="Amount"
                className={css.inputAmount}
                type="number"
              />
            </div>
            <div className={css.addButtonWraper}>
              <button
                type="button"
                onClick={() => {
                  addIngredient(values.ingredient, values.amount);
                  setFieldValue("ingredient", "");
                  setFieldValue("amount", "");
                }}
                className={css.addButton}
              >
                Add new Ingredient
              </button>
            </div>
            <table className={css.ingredientsTable}>
              <thead>
                <tr>
                  <th width="50%">Name</th>
                  <th width="30%">Amount</th>
                  <th width="20%" className={css.deleteTr}>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempIngredients.map((t, index) => {
                  return (
                    <tr key={index}>
                      <td width="50%">{t.label}</td>
                      <td width="30%">{t.amount}</td>
                      <td width="20%">
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className={css.removeButton}
                        >
                          <Icon
                            name="delete"
                            width={32}
                            height={32}
                            color="#000000"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className={css.InstructionsTitle}>Instructions</h3>
            <Field
              as="textarea"
              name="instructions"
              className={css.InstructionsText}
              placeholder="Enter a text"
            />
          </div>

          <button type="submit" className={css.submitButton}>
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
}
