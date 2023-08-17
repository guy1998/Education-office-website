import "../styles/institutions.css";

const images = require.context("../images");

function InstitutionCard({ institution, handleClick, isSelected }){

    return(
        <div className={isSelected ? "institutionCard selectedInstitution" : "institutionCard"} onClick={(event)=>{
            let current = document.getElementsByClassName('selectedInstitution');
            if(current.length > 0){
                current[0].classList.toggle('selectedInstitution');
            }
            event.currentTarget.classList.toggle('selectedInstitution');
            handleClick(institution)
        }}>
            <img src={images(institution.logo)} className="institutionImage"></img>
            <div className="institutionShortInfo">
                <h4>{ institution.name }</h4>
                <p>{ institution.type }</p>
            </div>
        </div>
    );

}

export default InstitutionCard;