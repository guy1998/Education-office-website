import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ironmanImage from "../images/ironman.jpg";
import "../styles/carousel.css";

function ImageCarousel({ news }) {
  return (
    <>
      <div className="carouselContainer">
        <Carousel indicators={false} indicatorLabels={false}>
          <Carousel.Item>
            <img src={ironmanImage} width="900" height="500"></img>
            <Carousel.Caption as="div" className="dynamicNews">
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={ironmanImage} width="900" height="500"></img>
            <Carousel.Caption as="div" className="dynamicNews">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={ironmanImage} width="900" height="500"></img>
            <Carousel.Caption as="div" className="dynamicNews">
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default ImageCarousel;
