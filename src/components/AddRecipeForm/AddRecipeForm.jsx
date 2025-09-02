import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addRecipeValidationSchema } from "../../utils/validationSchemas.js";
import clsx from "clsx";

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
  const dispatch = useDispatch();

  const categoriesOptions = useSelector(selectCategoriesOptions);
  const ingredientsOptions = useSelector(selectIngredientsOptions);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);

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
        measure: "",
      }}
      validationSchema={addRecipeValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        const { ingredient, measure, ...rest } = values;

        const payload = { ...rest };

        console.log("Payload for dispatch:", payload);

        try {
          await dispatch(addOwnRecipe(payload)).unwrap();
          resetForm();
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {({ values, setFieldValue, errors, touched }) => {
        const addIngredient = () => {
          const ingredientValue = values.ingredient;
          const measureValue = values.measure;

          if (!ingredientValue || !measureValue) return;

          const label =
            ingredientsOptions.find((i) => i.value === ingredientValue)
              ?.label || "";

          setFieldValue("ingredients", [
            ...values.ingredients,
            { id: ingredientValue, label: label, measure: measureValue },
          ]);

          setFieldValue("ingredient", "");
          setFieldValue("measure", "");
        };

        const removeIngredient = (index) => {
          setFieldValue(
            "ingredients",
            values.ingredients.filter((_, i) => i !== index)
          );
        };

        const getFieldClass = (fieldName, className) => {
          return clsx(
            className,
            errors[fieldName] && touched[fieldName] && css.inputError
          );
        };

        return (
          <Form className={css.form}>
            <div className={css.ContentRightImg}>
              <h3 className={css.upload}>Upload Photo</h3>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
                className={css.fileInput}
                hidden
              />
              <div className={css.fileInputNoImage}>
                <label htmlFor="fileInput" className={css.labelFull}>
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
              <ErrorMessage
                name="fileInput"
                component="div"
                className={css.error}
              />
            </div>
            <div className={css.contentLeft}>
              <div className={css.fieldGroup}>
                <h3 className={css.subtitle}>General Information</h3>
                <label className={css.label}>Recipe Title</label>
                <Field
                  name="title"
                  className={getFieldClass("title", css.input)}
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
                  className={getFieldClass("description", css.textarea)}
                  placeholder="Enter a brief description of your recipe"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <label className={css.label}>Cooking Time in minutes</label>
                <Field
                  name="cookingTime"
                  type="number"
                  className={getFieldClass("cookingTime", css.input)}
                />
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.wraperCalories}>
                <div>
                  <label className={css.label}>Calories</label>
                  <Field
                    name="calories"
                    type="number"
                    className={getFieldClass("calories", css.cooking)}
                  />
                  <ErrorMessage
                    name="calories"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div>
                  <label className={css.label}>Category</label>
                  <Field
                    as="select"
                    name="category"
                    className={getFieldClass("category", css.select)}
                  >
                    <option value="">Select a category</option>
                    {categoriesOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className={css.error}
                  />
                </div>
              </div>
            </div>

            <div className={css.ingredients}>
              <h3 className={css.igradientTitle}>Ingredients</h3>
              <div className={css.wraperIngredients}>
                <div>
                  <Field
                    as="select"
                    name="ingredient"
                    className={getFieldClass("ingredients", css.select)}
                  >
                    <option value="">Select an ingredient</option>
                    {ingredientsOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="ingredients"
                    component="div"
                    className={css.error}
                  />
                </div>

                <Field
                  name="measure"
                  placeholder="Amount"
                  className={getFieldClass("ingredients", css.inputAmount)}
                  type="text"
                />
              </div>

              <div className={css.addButtonWraper}>
                <button
                  type="button"
                  onClick={() => {
                    addIngredient(values.ingredient, values.measure);
                    setFieldValue("ingredient", "");
                    setFieldValue("measure", "");
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
                  {values.ingredients.map((t, index) => {
                    return (
                      <tr key={index}>
                        <td width="50%">{t.label}</td>
                        <td width="30%">{t.measure}</td>
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
                className={getFieldClass("instructions", css.InstructionsText)}
                placeholder="Enter a text"
              />
              <ErrorMessage
                name="instructions"
                component="div"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.submitButton}>
              Publish Recipe
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
