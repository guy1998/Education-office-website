import React, { useEffect, useState } from "react";
import "../styles/institutionPage.css";
import { filterInstitutions } from "../scirpts/institutions-scripts";

function InstitutionFilter({ institutions, setInstitutions }) {
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    area: ""
  });
  const [filtering, setFiltering] = useState(false);

  useEffect(
    () => {
      setInstitutions(filterInstitutions(filters, institutions));
      setFiltering(false);
    },
    [filtering]
  );

  return (
    <div className="filterDiv">
      <input
        type="text"
        className="searchBox"
        placeholder="Kerko sipas emrit"
        onChange={event => {
          let newFilters = { ...filters };
          newFilters.name = event.target.value;
          setFilters(newFilters);
          setFiltering(true);
        }}
      />
      <select
        className="filterSelector"
        onChange={event => {
          if (event.target.value !== "Lagjia / provinca") {
            let newFilters = { ...filters };
            newFilters.area = event.target.value;
            setFilters(newFilters);
          } else {
            setFilters({
              name: "",
              type: "",
              area: ""
            });
          }
          setFiltering(true);
        }}
      >
        <option>Lagjia / provinca</option>
        <option>Clirim</option>
        <option>30 vjetori</option>
        <option>Gorice</option>
        <option>Mangalem</option>
      </select>
      <select
        className="filterSelector"
        onChange={event => {
          if (event.target.value !== "Tipi i institucionit") {
            let newFilters = { ...filters };
            newFilters.type = event.target.value;
            setFilters(newFilters);
          } else {
            setFilters({
              name: "",
              type: "",
              area: ""
            });
          }
          setFiltering(true);
        }}
      >
        <option>Tipi i institucionit</option>
        <option>9-vjecare</option>
        <option>Gjimnaz</option>
        <option>Profesionale</option>
      </select>
    </div>
  );
}

export default InstitutionFilter;
