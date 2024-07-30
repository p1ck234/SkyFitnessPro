export function Card() {
  return (
    <div className="card__container">
      <div className="card__image">
        <img src="../src/images/yoga.png" alt="yoga" />
        <button className="card__view"></button>
      </div>
      <div className="card__description">
        <h3 className="card__header"></h3>
        <div className="properties">
          <div className="prop">
            <img src=""></img>
            <p>Дни</p>
          </div>
          <div className="prop">
          <img src=""></img>
            <p>Время</p>
          </div>
          <div className="prop">
          <img src=""></img>
            <p>Сложнось</p>
          </div>
        </div>
      </div>
    </div>
  );
}
