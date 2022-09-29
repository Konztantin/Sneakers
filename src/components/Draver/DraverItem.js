import React from "react";

function DraverItem(props) {
  return (
    <div key={props.id} className="cartItem d-flex align-center mb-20">
      <div style={{ backgroundImage: `url(${props.url})` }} className="cartItemImg"></div>
      <div className="mr-20 flex">
        <p className="mb-5">{props.title}</p>
        <b>{props.price}</b>
      </div>
      <img
        onClick={() => props.onRemove(props.id)}
        className="removeBtn"
        src="/img/btn-remove.svg"
        alt="Remove"
      />
    </div>
  );
}

export default DraverItem;
