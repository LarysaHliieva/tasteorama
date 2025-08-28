import React from "react";
import Hero from "../../components/Hero/Hero";
import { FilterSelect } from "../../components/filterComponent/filterComponent";
import { RecipeList } from "../../components/RecipeList/RecipeList";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <FilterSelect />
      <RecipeList />
    </div>
  );
}
