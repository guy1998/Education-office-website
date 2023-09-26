import React from "react";
import Card from "react-bootstrap/Card";

function NewsCard({ news, selectNews }) {
  return (
    <Card onClick={()=>selectNews(news)} className="newsCard">
      <Card.Img
        variant="top"
        alt=""
        className="newsImage"
        src={"https://drive.google.com/uc?export=view&id=" + news.photo}
      />
      <Card.Body>
        <Card.Text className="newsText">
          {news.title}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
