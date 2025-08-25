import React from "react";
import AddRecipeForm from "/src/components/AddRecipeForm/AddRecipeForm";

export default function AddRecipePage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Add Recipe</h1>
      <p className="text-gray-600 mb-4">
        Fill in the details below to publish your recipe.
      </p>
      <AddRecipeForm />
    </div>
  );
}
