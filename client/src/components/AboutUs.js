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
          Zyra Vendore e Arsimit Parauniversitar (ZVAP), ka për detyrë të menaxhojë, të monitorojë, të këshillojë dhe të informojë të gjitha institucionet arsimore për zbatimin e strategjisë kombëtare duke garantuar një shërbim arsimor sa më cilësor dhe gjithpërfshirës.
Burimet njerëzore profesionale dhe administrim i tyre, ka ndikim të drejtpërdrejtë për të përmirësuar dhe për të vijuar më tej me rritjen e cilësisë së shërbimit arsimor dhe respektimin e akteve ligjore e nënligjore në fuqi.
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
