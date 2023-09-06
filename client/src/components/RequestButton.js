import "../styles/requestButton.css";

function RequestButton() {
  return (
    <>
      <div className="scene" onClick={()=>{
        document.getElementById('layout').style.display = 'block';
      }}>
        <div className="cube">
          <span className="side top">Jemi një "click" larg!</span>
          <span className="side front">Kërkesë apo ankesë?</span>
        </div>
      </div>
    </>
  );
}

export default RequestButton;
