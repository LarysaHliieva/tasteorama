import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";

import Icon from "../Icon/index.jsx";

import {
  getRecipeById,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/recipes/operations.js";

import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectCurrentRecipe } from "../../redux/recipes/selectors.js";
import { clearCurrentRecipe } from "../../redux/recipes/slice.js";

import css from "./RecipeDetails.module.css";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const recipe = useSelector(selectCurrentRecipe);
  const user = useSelector(selectUser);
  const { error, isLoading } = useSelector((state) => state.recipes);

  const isFavorite = user?.favorites?.some((favId) => favId === id) ?? false;

  useEffect(() => {
    dispatch(clearCurrentRecipe());
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  if (isLoading || !recipe) {
    return (
      <div className={css.loaderWrap}>
        <FadeLoader color="#9b6c43" />
      </div>
    );
  }

  const {
    title,
    category,
    instructions,
    description,
    thumb,
    time,
    ingredients,
  } = recipe;

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

            <ul className={css.ingrediensList}>
              {ingredients.map((ing) => (
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
