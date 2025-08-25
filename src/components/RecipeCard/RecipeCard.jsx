import css from "./RecipeCard.module.css";

export default function RecipeCard({
  variant = "catalog",
  title,
  description,
  thumb,
  time,
  calories,
  isFavorite = false,
  onOpen,
  onToggleFavorite,
}) {
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
    <article
      className={cls}
      role="group"
      aria-label={title}
      onClick={() => onOpen?.()}
    >
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
        {time ? <span className={css.time}>{time}</span> : null}
      </div>
      {description && <p className={css.desc}>{description}</p>}
      {typeof calories === "number" && (
        <div className={css.meta}>
          <span className={css.cals}>{calories} cals</span>
        </div>
      )}

      <div className={css.actions} onClick={(e) => e.stopPropagation()}>
        {showCTA && (
          <button
            type="button"
            className={`${css.cta} ${css.primary}`}
            onClick={() => onOpen?.()}
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
            onClick={() => onToggleFavorite?.()}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M12 21s-6.7-4.35-9.33-7A5.9 5.9 0 1 1 12 6.24 5.9 5.9 0 1 1 21.33 14c-2.63 2.65-9.33 7-9.33 7z"
                fill="currentColor"
              />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
