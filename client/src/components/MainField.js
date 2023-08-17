import "../styles/mainfield.css";
import ImageCarousel from "./ImageCarousel";
import SideMenu from "./SideMenu";
import RequestButton from "./RequestButton";

function MainField() {
  return (
    <div className="sectionContainer">
      <div className="headingContainer">
        <h1 className="sectionTitle">KREU</h1>
        <div className="headingLine"></div>
      </div>
      <section id="mainField">
        <div id="contentDisplay">
          <h3>Miresevini ne faqen zyrtare te zyres arsimore Berat</h3>
          <ImageCarousel />
        </div>
        <div className="sideOptions">
          <h3 id="menuTitle">Menu</h3>
          <SideMenu />
          {/* <MPSHButton /> */}
          <RequestButton />
        </div>
      </section>
    </div>
  );
}

export default MainField;
