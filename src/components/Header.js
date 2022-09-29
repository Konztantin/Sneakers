import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./hooks/useCart";

function Header(props) {
  const { priseEnd } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />
          <div>
            <h3 className="text-uppercase">React sneakers</h3>
            <p className="opacity-5">магазин лучших кровок</p>
          </div>
        </div>
      </Link>
      <div>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={props.onCliclCard}>
            <img width={18} height={18} src="/img/cart.svg" />
            <span>{priseEnd} руб. </span>
          </li>
          <li className="cu-p">
            <Link to="/favorite">
              <img width={18} height={18} src="/img/Favorite.svg" />
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="/img/user.svg" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
