import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreButton = ({ onClick, disabled, children }) => {
  return (
    <button className={css.loadmorebtn} onClick={onClick} disabled={disabled}>
      {children || "Load More"}
    </button>
  );
};

export default LoadMoreButton;
