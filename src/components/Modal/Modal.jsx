import React from "react";
import Modal from "react-modal";

import Icon from "../Icon/index.jsx";

import css from "./Modal.module.css";

Modal.setAppElement("#root");

export default function CustomModal({
  isOpen,
  onClose,
  title,
  desc,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = "confirm",
}) {
  const cls = [
    css.btn,
    type === "confirm" && css.confirm,
    type === "navigate" && css.navigate,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeBtn} onClick={onClose}>
        <Icon name="close" width={24} height={24} />
      </button>

      {title && <h2 className={css.title}>{title}</h2>}
      {desc && <p className={css.desc}>{desc}</p>}

      <div className={css.actions}>
        <button
          className={cls}
          onClick={() => {
            if (onConfirm) onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </button>

        <button
          className={cls}
          onClick={() => {
            if (onCancel) onCancel();
            onClose();
          }}
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  );
}
