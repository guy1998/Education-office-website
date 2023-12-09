import React from "react";
import "../styles/news.css";
import ImageCarousel from "./ImageCarousel";

function NewsPlaceholder({news}){
        return (
        <div className="newsPlaceholder">
             <ImageCarousel news={news}/>
        </div>
        );
}

export default NewsPlaceholder;