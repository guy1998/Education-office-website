import "../styles/footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <div className="footerColumn">
        <h4>Kontakte</h4>
        <ul>
          <li id="address">Rruga Mihal Komnena, Berat</li>
          <li id="phoneNumber">+3556xxxxxxxx</li>
          <li id="email">zva@gmail.com</li>
        </ul>
      </div>
      <div className="footerColumn">
        <h4>Lidhje</h4>
        <ul>
          <li><a href="https://arsimi.gov.al/" target="_blank">Ministria e arsimit</a></li>
          <li><a href="https://arsimiparauniversitar.gov.al/" target="_blank">DPAP</a></li>
          <li><a href="http://korce.arsimiparauniversitar.gov.al/" target="_blank">DRAP Korçë</a></li>
        </ul>
      </div>
      <div className="footerColumn">
        <h4>Portale</h4>
        <ul>
          <li><a href="https://mesuespershqiperine.al/" target="_blank">Mësues për Shqipërinë</a></li>
          <li><a href="http://qsha.gov.al/" target="_blank">QSHA</a></li>
          <li><a href="https://ualbania.al/" target="_blank">U-Albania</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
