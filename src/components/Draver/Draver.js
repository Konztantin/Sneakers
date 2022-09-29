import axios from "axios";
import React, { useState } from "react";
import styles from "./Draver.module.scss"

import Info from "../Card/info";
import { useCart } from "../hooks/useCart";
import DraverItem from "./DraverItem";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, priseEnd } = useCart();
  const [isOrderComplitet, setIsOrderComplite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("https://63123e7cb466aa9b0386fbf7.mockapi.io/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplite(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://63123e7cb466aa9b0386fbf7.mockapi.io/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось оформить заказ, повторите позже");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <DraverItem
                  id={obj.id}
                  key={obj.name}
                  onRemove={onRemove}
                  url={obj.img}
                  title={obj.name}
                  prise={obj.prise}
                />
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{priseEnd} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((priseEnd / 100) * 5)} руб. </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplitet ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplitet
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы один товар в корзмну "
            }
            image={isOrderComplitet ? "/img/complite-order.jpg" : "/img/box.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
