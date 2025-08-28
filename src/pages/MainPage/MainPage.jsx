import React, { useState } from "react";
import Hero from "../../components/Hero/Hero";
import { FilterSelect } from "../../components/filterComponent/filterComponent";
import { RecipeList } from "../../components/RecipeList/RecipeList";

import Modal from "../../components/Modal/Modal";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Hero />
      <FilterSelect />
      <RecipeList />

      <button onClick={() => setIsOpen(true)}>Відкрити модалку</button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Error while saving"
          desc="To save this recipe, you need to thorize first"
          confirmText="Log in"
          cancelText="Register"
          type="navigate"
        />
      )}
    </div>
  );
}
