import React from "react";
import Hero from "../../components/Hero/Hero";
import { FilterSelect } from "../../components/filterComponent/filterComponent";
import { RecipeContainer } from "../../components/containers/recipesContainer";
import css from "./list.module.css";


export default function MainPage() {
  return (
    <div>
      <Hero/>
      <div className={`${css.wrapper} container`}>
        <FilterSelect />
        <RecipeContainer />
      </div>
    </div>
  );
}
