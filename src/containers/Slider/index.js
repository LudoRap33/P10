import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc ? byDateDesc.length - 1 : 0) ? index + 1 : 0), // corrigé grâce à une ternaire pour éviter un message d'erreur dans la console
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`${idx}-slider`} // on a corrigé le warning de la key dans la console
        >
          <div
            key={event.title}
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${radioIdx}-bullet`} // on a corrigé le warning de la key dans la console
                  type="radio"
                  name="radio-button"
                  checked={radioIdx === index}
                  readOnly // pour éviter le warning dans la console
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
