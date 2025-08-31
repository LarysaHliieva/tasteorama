import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/recipes/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

import Icon from "../Icon";
import css from "./RecipeCard.module.css";

export default function RecipeCard({
  variant = "catalog",
  title,
  description,
  thumb,
  time,
  calories,
  isFavorite = false,
  id,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsLoggedIn);

  const handleFavoriteClick = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }
    try {
      if (variant === "favorites") {
        await dispatch(removeFromFavorites(id)).unwrap();
      } else {
        if (isFavorite) {
          await dispatch(removeFromFavorites(id)).unwrap();
        } else {
          await dispatch(addToFavorites(id)).unwrap();
        }
      }
    } catch (e) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  const cls = [
    css.card,
    variant === "catalog" && css.catalog,
    variant === "details" && css.details,
    variant === "favorites" && css.favorites,
  ]
    .filter(Boolean)
    .join(" ");
  const showCTA = true;
  const showFavorite = variant !== "details";

  return (
    <article className={cls} role="group" aria-label={title}>
      <div className={css.imgWrap}>
        {thumb ? (
          <img src={thumb} alt={title} loading="lazy" />
        ) : (
          <div className={css.placeholder}>No image</div>
        )}
      </div>

      <div className={css.top}>
        <h3 className={css.title} title={title}>
          {title}
        </h3>
        {time ? (
          <div className={css.time}>
            <Icon name="clock" width={24} height={24} color="#000000" />
            <span>{time}</span>
          </div>
        ) : null}
      </div>
      {description && <p className={css.desc}>{description}</p>}
      {typeof calories === "number" && (
        <div className={css.meta}>
          <span className={css.cals}>~ {calories} cals</span>
        </div>
      )}

      <div className={css.actions} onClick={(e) => e.stopPropagation()}>
        {showCTA && (
          <button
            type="button"
            className={`${css.cta} ${css.primary}`}
            onClick={() => navigate(`/recipes/${id}`)}
          >
            Learn more
          </button>
        )}
        {showFavorite && (
          <button
            type="button"
            className={[
              css.iconBtn,
              css.fav,
              variant === "favorites" && css.favEmph,
              isFavorite && css.favOn,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={!!isFavorite}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            onClick={handleFavoriteClick}
          >
            <Icon name="bookmark-alternative" width={24} height={24} />
          </button>
        )}
      </div>
    </article>
  );
}
