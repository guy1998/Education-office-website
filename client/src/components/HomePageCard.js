import React from "react";
import "../styles/navbar.css";

function HomePageCard({ title, content, img, id, href }) {
  return (
    <div
      class="card"
      id={id}
      onClick={() => {
        const clickEvent = new Event("click", { bubbles: true });
        document.getElementById(id + "link").dispatchEvent(clickEvent);
      }}
    >
      <img alt="imazhi" src={img} />
      <div class="card__content">
        <p class="card__title">
          {title}
        </p>
        <p class="card__description">
          {content}
        </p>
      </div>
      <a
        style={{ display: "none" }}
        onClick={() => {
          if(href)
            document.getElementById(href).scrollIntoView({ behavior: "smooth" });
        }}
        id={id + "link"}
      />
    </div>
  );
}

export default HomePageCard;
