import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Icon from "../Icon/index.jsx";

import css from "./AddRecipeForm.module.css";

// тимчасово, потім підключити фільтри та категорії з беку
import { ingredients as ingredientsList } from "../../utils/ingredients.js";
import { categories as categoriesList } from "../../utils/categories.js";

export default function AddRecipeForm() {
  const [tempIngredients, setTempIngredients] = useState([]);

  const addIngredient = (ingredient, amount) => {
    if (!ingredient || !amount) return;
    setTempIngredients([...tempIngredients, { ingredient, amount }]);
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
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        cookingTime: Yup.number().required("Required"),
        category: Yup.string().required("Required"),
        instructions: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        const ingredients = tempIngredients.map((t) => ({
          _id: t.ingredient,
          amount: t.amount,
        }));
        const { ingredient, amount, ...rest } = values;
        const payload = { ...rest, ingredients };
        console.log(payload);
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
                  <Icon name="icon-bag" width={96} height={80} />
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
                  {categoriesList.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
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
                {ingredientsList.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
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
                  const ingredientName =
                    ingredientsList.find((i) => i._id === t.ingredient)?.name ||
                    "";
                  return (
                    <tr key={index}>
                      <td width="50%">{ingredientName}</td>
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
