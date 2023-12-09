import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/carousel.css";

function ImageCarousel({ news }) {
  return (
    <>
      <div className="carouselContainer">
        <Carousel indicators={false} indicatorLabels={false}>
          {news.map((item) => {
            return (<Carousel.Item>
              <img src={"https://drive.google.com/uc?export=view&id=" + item.photo} width="900" height="500"></img>
              <Carousel.Caption as="div" className="dynamicNews">
                <h3>{item.title}</h3>
                <p>
                  {item.description}
                </p>
              </Carousel.Caption>
            </Carousel.Item>)
          })}
        </Carousel>
      </div>
    </>
  );
}

export default ImageCarousel;
