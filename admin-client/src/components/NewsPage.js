import React, { useEffect, useState } from "react";
import { retrieveNews } from "../scirpts/news-scripts";
import NewsReader from "./NewsReader";
import NewsList from "./NewsList";
import "../styles/news.css";
import EditNewsForm from "./EditNewsForm";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [changed, setChanged] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(
    () => {
      retrieveNews(data => setNews(data));
      setChanged(false);
    },
    [changed]
  );

  return (
    <div className="newsMain">
      {!editing
        ? <NewsReader
            news={selectedNews}
            openEdit={() => {
              setEditing(true);
            }}
            onDelete={() => {
              setChanged(true);
              setSelectedNews(null);
            }}
          />
        : <EditNewsForm
            news = {selectedNews}
            onEdit={newNews => {
              setChanged(true);
              setSelectedNews(newNews);
            }}
            onClose = {()=>setEditing(false)}
          />}
      <NewsList
        news={news}
        selectNews={setSelectedNews}
        onChange={() => setChanged(true)}
      />
    </div>
  );
}

export default NewsPage;
