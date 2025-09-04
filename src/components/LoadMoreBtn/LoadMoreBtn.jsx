import React from "react";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick, children, loading }) => {
  return (
    <button className={css.loadmorebtn} onClick={onClick} disabled={loading}>
      {loading ? "Loading" : children || "Load More"}
    </button>
  );
};

export default LoadMoreBtn;
