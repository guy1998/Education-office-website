import React from "react";
import "../styles/navbar.css";

function HomePageCard({ title, content, img, id }) {
  return (
    <div class="card" id={id}>
      <img alt="imazhi" src={img}/>
      <div class="card__content">
      <p class="card__title">{title}</p>
        <p class="card__description">
          {content}
        </p>
      </div>
    </div>
  );
}

export default HomePageCard;
