import "../styles/webCenter.css";
import Announcements from "./Announcements";
import MainField from "./MainField";
import NewsField from "./NewsField";
import Institutions from "./Institutions";

function WebsiteCenter({ mainfield, announcements, newsfield, institutionsField }){
    return(
        <div className="center">
            { mainfield && <MainField /> }
            { announcements && <Announcements /> }
            { newsfield && <NewsField /> }
            { institutionsField && <Institutions /> }
        </div>
    );
}

export default WebsiteCenter;