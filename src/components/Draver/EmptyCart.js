import React from "react";
import styles from "./EmptyCart.modules.scss";

function EmptyCart({onClose}) {
  return (
    <div className="draverBox">
      <img width={120} height={120} src="/img/box.jpg" alt="Box" />
      <div className="draverInfo">
        <h2>Корзина пустая</h2>
        <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
      </div>
      <button onClick={onClose} className="greenButton">
        <img src="/img/arrow_left.svg" alt="arrow" /> Вернуться назад
      </button>
    </div>
  );
}

export default EmptyCart;
