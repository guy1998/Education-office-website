import React, { useEffect, useState, useRef } from "react";
import "../styles/aboutus.css";

function Goal() {
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
    <div className="goal" ref={ref}>
      <blockquote className={isVisible ? "zitat2 jump-in" : "zitat2"}>
        Nëse do të njohësh të ardhmen, atëhere shiko fëmijët e së tashmes.
        <cite>Konfuci</cite>
      </blockquote>
    </div>
  );
}

export default Goal;
