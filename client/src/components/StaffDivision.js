import React, {useState, useEffect, useRef} from "react";
import "../styles/staffCarousel.css";
import StaffCarousel from "./StaffCarousel";

function StaffDivision() {

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
    <div className="divisionContainer staffDivision" id="staffDivision" ref={ref}>
      <h1 className={isVisible ? 'headers jump-in' : 'headers'}>Stafi juaj</h1>
      <blockquote className={isVisible ? 'zitat1 jump-in' : 'zitat1'}>
        Njerëzit e jashtëzakonshëm kanë dicka të përbashkët: një sens absolut misioni.
        <cite>Zig Ziglar</cite>
      </blockquote>
      <StaffCarousel isVisible={isVisible}/>
    </div>
  );
}

export default StaffDivision;
