import React, { useState } from "react";

import styles from "./Card.module.scss";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";

function Card({ id, onFavorite, img, name, price, onPlus, favorited = false, isLoading = false }) {
  const { IsItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ img, name, price, id });
  };

  const onClicFavotir = () => {
    onFavorite({ img, name, price, id });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader
          key={id}
          speed={2}
          width={150}
          height={240}
          viewBox="0 0 150 250"
          backgroundColor="#e6e6e6"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="130" />
          <rect x="0" y="140" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="140" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="180" rx="5" ry="5" width="80" height="24" />
          <rect x="102" y="180" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClicFavotir}>
              <img
                src={isFavorite ? "/img/herd-liked.svg" : "/img/herd-unliked.svg"}
                alt="unliked"
              />
            </div>
          )}
          <img width={133} height={130} src={img} alt="Sneakers" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена: </span>
              <b>{price}</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={IsItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
