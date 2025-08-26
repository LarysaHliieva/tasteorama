import React from "react";
import AddRecipeForm from "/src/components/AddRecipeForm/AddRecipeForm";
import css from "../../components/AddRecipeForm/AddRecipeForm.module.css";

export default function AddRecipePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Add Recipe</h1>

      <AddRecipeForm />
    </div>
  );
}
