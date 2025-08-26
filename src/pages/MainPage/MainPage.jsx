import React from "react";
import Hero from "../../components/Hero/Hero";

import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import { FilterSelect } from "../../components/filterComponent/filterComponent.jsx";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <br />
      <FilterSelect />
      <br />
      RecipeList
      <br />
      Loader
      <LoadMoreBtn />
    </div>
  );
}
