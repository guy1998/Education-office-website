import { React, useState } from "react";
import Footer from "./components/Footer";
import BottomLine from "./components/BottomLine";
import { Helmet } from 'react-helmet';
import { getNews } from "./scripts/news-scripts";
import { useEffect } from "react";

function App() {

  const [institutions, setInstitutions] = useState([]);

  useEffect(()=>{
    getNews((data)=>setInstitutions(data));
  }, [])

  return (
    <>
      <Helmet>
        <meta http-equiv="X-Frame-Options" content="deny" />
      </Helmet>
      {institutions.map((institution)=>{
        return <p>{institution.title}</p>
      })}
      <Footer />
      <BottomLine />
    </>
  );
}

export default App;
