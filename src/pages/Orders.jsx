import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import AppContext from "../context";



function Orders() {
  const { onAddToCart, onAddToFavorite } = React.useContext(AppContext)
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    (async () => {
      try{
        const { data } = await axios.get("https://63123e7cb466aa9b0386fbf7.mockapi.io/orders");
      setOrders(data.map(obj => obj.items).flat())
      setIsLoading(false)
      } catch(error){
        alert("Не удалось загруить страницу :(")
        console.log(error);
      }
    })()
  }, [])

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className=" d-flex flex-wrap">
        {orders.map((item) => (
          <Card
            key={item.id}
            isLoading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Orders