import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Draver/Draver";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [cartOpened, setCardOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function featchData() {
      setIsLoading(true);
      const cartResponse = await axios.get("https://63123e7cb466aa9b0386fbf7.mockapi.io/cart");
      const favotireResponse = await axios.get(
        "https://63123e7cb466aa9b0386fbf7.mockapi.io/favorite"
      );
      const itemsResponse = await axios.get("https://63123e7cb466aa9b0386fbf7.mockapi.io/Items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorite(favotireResponse.data);
      setItems(itemsResponse.data);
    }

    featchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://63123e7cb466aa9b0386fbf7.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post("https://63123e7cb466aa9b0386fbf7.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удолась добавить в корзину");
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://63123e7cb466aa9b0386fbf7.mockapi.io/favorite/${obj.id}`);
        setFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post(
          "https://63123e7cb466aa9b0386fbf7.mockapi.io/favorite",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63123e7cb466aa9b0386fbf7.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const checkDrawer = () => {
    setCardOpened(!cartOpened);
    const body = document.querySelector("body");
    {
      !cartOpened ? (body.style = "overflow:hidden") : (body.style = "overflow: auto");
    }
  };

  const onChangeSearchInput = (event) => {
    setsearchValue(event.target.value);
  };

  const IsItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorite,
        IsItemAdded,
        onAddToFavorite,
        setCardOpened,
        setCartItems,
        onAddToCart,
        isLoading,
      }}
    >
      <div className="wrapper clear">
        <div>
          <Drawer items={cartItems} onClose={checkDrawer} onRemove={onRemoveItem} opened={cartOpened}/>
        </div>

        <Header onCliclCard={checkDrawer} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchValue={searchValue}
                setsearchValue={setsearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
