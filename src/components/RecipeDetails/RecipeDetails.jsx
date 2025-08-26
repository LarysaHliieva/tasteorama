import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Icon from "../Icon/index.jsx";

import {
  getRecipeById,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/recipes/operations.js";

import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
// import { selectUser } from "../../redux/auth/selectors.js"; //-------імпортувати з юзерів

import css from "./RecipeDetails.module.css";

// import { selectCurrentRecipe } from "../../redux/recepies/selectors.js";

// delete after connection api
import { recipes } from "../../utils/recipes.js";

const RecipeDetails = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const recipe = useSelector(selectCurrentRecipe);

  // const user = useSelector(selectUser); //---------треба буде витягнути з юзера
  // const isFavorite = user?.favorites?.some((favId) => favId === id); //-----------тут перевіримо, чи рецепт в улюблених в користувача
  const isFavorite = true; // ---------заглушка

  // delete after connection api
  const recipe = recipes[0];

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  const { title, category, instructions, description, thumb, time } = recipe;

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }

    isFavorite
      ? dispatch(removeFromFavorites(id))
      : dispatch(addToFavorites(id));
  };

  return (
    <div className={css.section}>
      <div className="container">
        <div className={css.heroWrapper}>
          <div className={css.heroImgContainer}>
            <img className={css.heroImg} src={thumb} alt={title} />
          </div>
          <h1 className={css.heroTitle}>{title}</h1>
        </div>

        <div className={css.wrapper}>
          <div className={css.infoWrapper}>
            <div className={css.infoCard}>
              <h3 className={css.cardTitle}>General informations</h3>
              <ul className={css.infoList}>
                <li className={css.infoItem}>
                  <span className={css.span}>Category: </span>
                  {category}
                </li>

                <li className={css.infoItem}>
                  <span className={css.span}>Cooking time: </span>
                  {time} min
                </li>

                <li className={css.infoItem}>
                  <span className={css.span}>Caloric content: </span>
                  Approximately 200 kcal per serving
                </li>
              </ul>
            </div>

            <button className={css.btn} onClick={handleClick}>
              Save
              {isFavorite ? (
                <Icon
                  name="bookmark-saved"
                  width="24"
                  height="24"
                  color="white"
                />
              ) : (
                <Icon
                  name="bookmark-unsaved"
                  width="24"
                  height="24"
                  color="white"
                />
              )}
            </button>
          </div>
          <div className={css.aboutWrapper}>
            <h2 className={css.title}>About recipe</h2>
            <p className={css.text}>{description}</p>
            <h2 className={css.title}>Ingredients:</h2>
            {/* <ul className={css.ingrediensList}>
              <li className={css.ingredientsItem}>Eggs — 3</li>
              <li className={css.ingredientsItem}>
                Butter — 1 tbsp (about 15 g)
              </li>
              <li className={css.ingredientsItem}>Salt — a pinch</li>
              <li className={css.ingredientsItem}>Black pepper — to taste</li>
              <li className={css.ingredientsItem}>
                Fresh herbs (parsley, dill, or green onions) — for garnish
                (optional)
              </li>
            </ul> */}

            <ul className={css.ingrediensList}>
              {recipe.ingredients.map((ing) => (
                <li key={ing.id._id} className={css.ingredientsItem}>
                  {ing.id.name} — {ing.measure}
                </li>
              ))}
            </ul>

            <h2 className={css.preparationTitle}>Preparation Steps:</h2>
            <p className={css.preparationText}>{instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
