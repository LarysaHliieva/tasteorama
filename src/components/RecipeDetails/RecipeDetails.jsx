import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { fetchRecipeById } from "../../redux/recepies/operations.js";

import filledSaveIcon from "../../assets/FilledSaveIcon.svg";
import outlineSaveIcon from "../../assets/OutlineSaveIcon.svg";

import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./RecipeDetails.module.css";

import { selectCurrentRecipe } from "../../redux/recepies/selectors.js";

const RecipeDetails = () => {
  const [saved, setSaved] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const recipe = useSelector(selectCurrentRecipe);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
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
    setSaved((prev) => !prev);
  };

  return (
    <div className={css.section}>
      <div className={css.heroWrapper}>
        <img className={css.heroImg} src={thumb} alt={title} />
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
                `${time} min`
              </li>

              <li className={css.infoItem}>
                <span className={css.span}>Caloric content: </span>Approximately
                200 kcal per serving
              </li>
            </ul>
          </div>
          <button className={css.btn} onClick={handleClick}>
            Save
            <img
              src={saved ? filledSaveIcon : outlineSaveIcon}
              alt="Save"
              className={css.icon}
            />
          </button>
        </div>
        <div className={css.aboutWrapper}>
          <h2 className={css.title}>About recipe</h2>
          <p className={css.text}>{description}</p>
          <h2 className={css.title}>Ingredients:</h2>
          <ul className={css.ingrediensList}>
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
          </ul>
          <h2 className={css.preparationTitle}>Preparation Steps:</h2>
          <p className={css.preparationText}>{instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
