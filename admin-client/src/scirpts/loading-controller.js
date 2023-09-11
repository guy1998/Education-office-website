import Loading from "../components/Loading";
import React from 'react';
import ReactDOM from 'react-dom';

export let loading = false;
const overlay = document.createElement('div');
const loadingElement = document.createElement('div');
ReactDOM.render(<Loading />, loadingElement);
overlay.appendChild(loadingElement);
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
overlay.style.display = 'flex';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';

export const startLoading = ()=>{
    loading = true;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

export const  stopLoading = ()=>{
    loading = false;
    document.body.removeChild(overlay);
    document.body.style.overflow = 'auto';
}