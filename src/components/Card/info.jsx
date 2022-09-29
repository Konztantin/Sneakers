import React from 'react';
import AppContext from '../../context';


function Info({ title, image, description }) {
  const { setCardOpened } = React.useContext(AppContext)
  return (
    <div className="d-flex align-center justify-center flex-column flex">
      <img className='mb-20' width={120} height={120} src={image} alt="Box" />
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="/img/arrow_left.svg" alt="arrow" /> Вернуться назад
      </button>
    </div>);
}

export default Info;