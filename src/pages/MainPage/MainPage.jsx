import React from "react";
import Hero from "../../components/Hero/Hero";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

export default function MainPage() {
  return (
    <div>
      <Hero />
      <br />
      Filters
      <br />
      RecipeList
      <br />
      Loader
      <LoadMoreBtn />
    </div>
  );
}
