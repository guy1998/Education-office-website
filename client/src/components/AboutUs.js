import React from "react";
import "../styles/aboutus.css";
import { useRef, useEffect, useState } from "react";

function AboutUs() {

  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="aboutUsContainer" ref={ref}>
      <h1 className={isVisible ? "headers jump-in" : "headers"}>Rreth nesh</h1>
      <div className={isVisible ? "stuff jump-in" : "stuff"}>
        <div className={isVisible ? "aboutText jump-in" : "aboutText"}>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,.
          </p>
        </div>
        <div className={isVisible ? "aboutStats jump-in" : "aboutStats"}>
          <div className={isVisible ? "statBlock jump-in" : "statBlock"}>
            <h2>15</h2>
            <p>Shkolla të mesme</p>
          </div>
          <div className={isVisible ? "statBlock jump-in" : "statBlock"}>
            <h2>150</h2>
            <p>Shkolla 9-vjecare</p>
          </div>
          <div className={isVisible ? "statBlock jump-in" : "statBlock"}>
            <h2>800</h2>
            <p>Mësues</p>
          </div>
          <div className={isVisible ? "statBlock jump-in" : "statBlock"}>
            <h2>10,000</h2>
            <p>Nxënës</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
