import React from "react";
import "../styles/news.css";
import NewsCard from "./NewsCard";

function NewsList({news}){
    return(
        <div className="newsList fade-in">
            {
                news.map(item=>{
                    return <NewsCard news={item} />
                })
            }
        </div>
    )
}

export default NewsList;