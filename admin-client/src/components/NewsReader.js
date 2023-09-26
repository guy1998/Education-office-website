import React from "react";
import { deleteNews, changePhoto } from "../scirpts/news-scripts";
import {useSnackbar} from "notistack";
import "../styles/announcementPage.css";

function NewsReader({ news, openEdit, onDelete }) {

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const deleteNotification = {
        add: (message, variant)=>{
            enqueueSnackbar(message, variant);
            onDelete();
        },
        close: closeSnackbar
    }

  return !news
    ? <div className="announcementPlaceholder newsPlaceholder" />
    : <div className="readingBox">
        <div className="readerHeader">
          <h4>
            {news.title}
          </h4>
        </div>
        <div className="readerMsgInfo">
          <p className="shortInfo">
            <b>Data: </b>
            {news.date}
          </p>
        </div>
        <div className="readerBody">
          <p>
            {news.description}
          </p>
        </div>
        <div className="footDiv">
          <div className="divButton">
            <label htmlFor="newsPhotoChanger" className="newsPhotoLabel"></label>
            <input type='file' id="newsPhotoChanger" onChange={(event)=>{
              changePhoto(news, event.target.files[0], deleteNotification);
            }}></input>
            <button className="editButton" onClick={openEdit} />
            <button
              className="deleteButton1"
              onClick={() => deleteNews(news, deleteNotification)}
            />
          </div>
        </div>
      </div>;
}

export default NewsReader;