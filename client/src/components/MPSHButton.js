import "../styles/sideMenu.css";

function MPSHButton(){

    const redirect = ()=>{
        window.open("https://mesuespershqiperine.al/", "_blank");
    }

    return(
        <>
            <div className="mButton" onClick={redirect}>Mësues për Shqipërinë</div>
        </>
    );

}

export default MPSHButton;