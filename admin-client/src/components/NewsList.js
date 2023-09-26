import React, { useState } from "react";
import NewsCard from "./NewsCard";
import MyModal from "./MyModal";
import AddNewsForm from "./AddNewsForm";

function NewsList({ news, selectNews, onChange }) {

    const [adding, setAdding] = useState(false);

  return (
    <div className="newsList">
      <div className="newsContainer">
        {news.length
          ? news.map(eachNews => {
              return <NewsCard news={eachNews} selectNews={selectNews} />;
            })
          : <p style={{ margin: "auto auto" }}>Nuk ka lajme</p>}
      </div>
      <button className="addingButton" onClick={()=>{
        setAdding(true)
      }}>Shto</button>
      <MyModal show={adding} onHide={()=>setAdding(false)} heading="Shto nje lajm">
        <AddNewsForm onAdd={onChange}/>
      </MyModal>
    </div>
  );
}

export default NewsList;
