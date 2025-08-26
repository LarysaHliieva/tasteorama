import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createRecipe } from "../../services/api.js";
import css from "./AddRecipeForm.module.css";

export default function AddRecipeForm() {
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
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        cookingTime: Yup.number().required("Required"),
        category: Yup.string().required("Required"),
        instructions: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createRecipe(values);
          alert("Recipe added successfully!");
          window.location.href = "/recipes";
        } catch (err) {
          alert("Error: " + err.message);
        }
        setSubmitting(false);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.fieldGroup}>
            <h3 className={css.upload}>Upload Photo</h3>
            <input
              type="file"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
              className={css.fileInput}
            />
            {values.image && (
              <img
                src={URL.createObjectURL(values.image)}
                alt="preview"
                className={css.preview}
              />
            )}
          </div>

          <div className={css.fieldGroup}>
            <h3 className={css.subtitle}>General Information</h3>
            <label className={css.label}>Recipe Title</label>
            <Field name="title" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label}>Recipe Description</label>
            <Field as="textarea" name="description" className={css.textarea} />
          </div>

          <div className={css.fieldGroup}>
            <label className={css.label}>Cooking Time in minutes</label>
            <Field name="cookingTime" type="number" className={css.input} />
          </div>

          <div className={css.wraperCalories}>
            <div>
              <label className={css.label}>Calories</label>
              <Field
                name="cookingCalories"
                type="numder"
                className={css.cooking}
              />
            </div>
            <div>
              <label className={css.label}>Category</label>
              <Field as="select" name="category" className={css.select} />
            </div>
          </div>

          <div className={css.ingredients}>
            <h3 className={css.igradientTitle}>Ingredients</h3>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((_, index) => (
                    <div key={index} className={css.ingredientItem}>
                      <div className={css.leftGroup}>
                        <label className={css.labelIngradients}>Name</label>
                        <Field
                          name={`ingredients.${index}.name`}
                          placeholder="Name"
                          className={css.inputName}
                        />
                      </div>
                      <div className={css.rightGroup}>
                        <label className={css.labelIngradients}>Amount</label>
                        <Field
                          name={`ingredients.${index}.amount`}
                          placeholder="Amount"
                          className={css.inputAmount}
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className={css.removeButton}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", amount: "" })}
                    className={css.addButton}
                  >
                    + Add Ingredient
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
          <div>
            <h3 className={css.InstructionsTitle}>Instructions</h3>
            <Field
              as="textarea"
              name="description"
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
