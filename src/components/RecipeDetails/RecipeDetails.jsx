import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FadeLoader, ClipLoader } from "react-spinners";
import { fetchIngredients } from "../../redux/filters/operations";
import { selectIngredientsOptions } from "../../redux/filters/selectors";
import { getFavorites } from "../../redux/recipes/operations";
import {
  getRecipeById,
  addToFavorites,
  removeFromFavorites,
} from "../../redux/recipes/operations";
import {
  selectCurrentRecipe,
  selectRecipesLoading,
} from "../../redux/recipes/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { clearCurrentRecipe } from "../../redux/recipes/slice";
import Icon from "../Icon";
import css from "./RecipeDetails.module.css";

import { selectRecipesFavorites } from "../../redux/recipes/selectors";

const RecipeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const recipe = useSelector(selectCurrentRecipe);
  const isLoading = useSelector(selectRecipesLoading);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const ingredientsOptions = useSelector(selectIngredientsOptions);

  const [mappedIngredients, setMappedIngredients] = useState([]);
  const [isInitialRequest, setIsInitialRequest] = useState(true);
  const [isLoagingFavotite, setIsLoagingFavotite] = useState(false);

  const favorites = useSelector(selectRecipesFavorites);
  const isFavorite = favorites.some((fav) => fav._id === id);

  useEffect(() => {
    isLoggedIn && dispatch(getFavorites({ limit: 1000 }));
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        dispatch(clearCurrentRecipe());
        await dispatch(getRecipeById(id)).unwrap();
        dispatch(fetchIngredients());
        setIsInitialRequest(false);
      } catch (err) {
        navigate("/not-found");
      }
    };

    fetchRecipe();
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (recipe && ingredientsOptions.length) {
      const mapped = recipe.ingredients.map((ing) => {
        const ingredientData = ingredientsOptions.find(
          (opt) => opt.value === ing.id
        );
        return {
          ...ing,
          name: ingredientData?.label || "Unknown",
        };
      });
      setMappedIngredients(mapped);
    }
  }, [recipe, ingredientsOptions]);

  const handleClick = async () => {
    if (!isLoggedIn) return navigate("/auth");

    setIsLoagingFavotite(true);

    try {
      if (isFavorite) {
        await dispatch(removeFromFavorites(id));
      } else {
        await dispatch(addToFavorites(id));
      }

      isLoggedIn && dispatch(getFavorites({ limit: 1000 }));
    } finally {
      setIsLoagingFavotite(false);
    }
  };

  if ((isLoading || !recipe) && isInitialRequest) {
    return (
      <div className={css.loaderWrap}>
        <FadeLoader color="#9b6c43" />
      </div>
    );
  }

  const { title, category, instructions, description, thumb, time } = recipe;

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

            <button
              className={css.btn}
              onClick={handleClick}
              disabled={isLoagingFavotite}
            >
              {isLoagingFavotite ? (
                <ClipLoader color="white" size={16} />
              ) : isFavorite ? (
                <>
                  Unsave{" "}
                  <Icon
                    name="bookmark-saved"
                    width={24}
                    height={24}
                    color="white"
                  />
                </>
              ) : (
                <>
                  Save{" "}
                  <Icon
                    name="bookmark-unsaved"
                    width={24}
                    height={24}
                    color="white"
                  />
                </>
              )}
            </button>
          </div>

          <div className={css.aboutWrapper}>
            <h2 className={css.title}>About recipe</h2>
            <p className={css.text}>{description}</p>
            <h2 className={css.title}>Ingredients:</h2>
            <ul className={css.ingrediensList}>
              {mappedIngredients.map((ing) => (
                <li key={ing.id} className={css.ingredientsItem}>
                  {ing.name} — {ing.measure}
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
