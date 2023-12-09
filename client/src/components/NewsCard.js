import React from "react";
import "../styles/news.css";
import { useNavigate } from "react-router";

function NewsCard({news}) {

    const navigator = useNavigate();

    return (
        <article className="newscard shadow curve jump-in" onClick={()=>{
            navigator("/lajme/" + news._id);
        }}>
            <div>
                <img src={"https://drive.google.com/uc?export=view&id=" + news.photo} alt="image" />
            </div>
            <div>
                <p><strong>{news.title}</strong></p>
                <span>
                    <time>{news.date}</time>
                </span>
            </div>
        </article>
    );
}

export default NewsCard;