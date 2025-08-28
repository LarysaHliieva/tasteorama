import React from "react";
import Hero from "../../components/Hero/Hero";
import { FilterSelect } from "../../components/filterComponent/filterComponent";
import { RecipeList } from "../../components/RecipeList/RecipeList";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

import { recipes } from "../../utils/recipes";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <FilterSelect />
      <RecipeList />
      <RecipeCard {...recipes[3]} />
      <RecipeCard {...recipes[3]} variant="details" />
      <RecipeCard {...recipes[3]} variant="favorites" />
    </div>
  );
}
