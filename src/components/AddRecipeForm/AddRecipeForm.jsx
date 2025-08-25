import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createRecipe } from "../../services/api.js";
import styles from "./AddRecipeForm.module.css";

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
        <Form className="flex flex-col gap-3">
          <div>
            <label>Title</label>
            <Field name="title" className="border p-2 w-full" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>

          <div>
            <label>Description</label>
            <Field
              as="textarea"
              name="description"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Cooking Time (min)</label>
            <Field
              name="cookingTime"
              type="number"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Calories (optional)</label>
            <Field
              name="calories"
              type="number"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Category</label>
            <Field as="select" name="category" className="border p-2 w-full">
              <option value="">Select category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </Field>
          </div>

          <div>
            <label>Ingredients</label>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((_, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Field
                        name={`ingredients.${index}.name`}
                        placeholder="Ingredient"
                        className="border p-2"
                      />
                      <Field
                        name={`ingredients.${index}.amount`}
                        placeholder="Amount"
                        className="border p-2"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="bg-red-500 text-white px-2"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: "", amount: "" })}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    + Add Ingredient
                  </button>
                </div>
              )}
            </FieldArray>
          </div>

          <div>
            <label>Instructions</label>
            <Field
              as="textarea"
              name="instructions"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Photo</label>
            <input
              type="file"
              onChange={(e) => setFieldValue("image", e.target.files[0])}
            />
            {values.image && (
              <img
                src={URL.createObjectURL(values.image)}
                alt="preview"
                className="mt-2 w-32"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded"
          >
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
}
