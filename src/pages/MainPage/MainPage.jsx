import React from "react";
import Hero from "../../components/Hero/Hero";
import { FilterSelect } from "../../components/filterComponent/filterComponent";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <br />
      <FilterSelect />
      <br />
      RecipeList
      <br />
      <LoadMoreBtn />
      Loader
    </div>
  );
}
