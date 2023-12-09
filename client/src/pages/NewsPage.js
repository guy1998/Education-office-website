import React, { useEffect, useState } from "react";
import "../styles/pageFormatting.css";
import PageTitle from "../components/PageTitle";
import NewsPlaceholder from "../components/NewsPlaceholder";
import {Route, Routes} from "react-router-dom";
import NewsReader from "../components/NewsReader";
import NewsList from "../components/NewsList";
import { getNews } from "../scripts/news-scripts";

function NewsPage(){

    const [news, setNews] = useState([])

    useEffect(()=>{
        getNews((data)=>setNews(data));
    }, [])

    return (
        <div className="pageContainer">
           <PageTitle title={"Lajmet"} />
           <div className="horizontalMain">
            <Routes>
                <Route path="" element={<NewsPlaceholder news={news}/>}/>
                <Route path=":id" element={<NewsReader />}/>
            </Routes>
            <NewsList news={news}/>
           </div>
        </div>
    )
}

export default NewsPage;