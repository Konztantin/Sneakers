import React from "react";
import Card from "../components/Card/Card";
import AppContext from '../context'


function Home({
  searchValue,
  setsearchValue,
  onChangeSearchInput,
  onAddToCart,
  onAddToFavorite,
  isLoading }) {
  const { items } = React.useContext(AppContext)

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(12)] : filtredItems)
      .map((item, index) => (
        <Card
          key={index}
          onPlus={(obj) => onAddToCart(obj)}
          onFavorite={(obj) => onAddToFavorite(obj)}
          isLoading={isLoading}
          {...item}
        />
      ))

  }

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setsearchValue("")}
              className="clear"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className=" d-flex flex-wrap">
        {renderItems()}
      </div>
    </div>
  )
}

export default Home