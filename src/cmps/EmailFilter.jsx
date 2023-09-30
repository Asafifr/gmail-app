// import "../../public/glass.png";

import { useEffect, useState } from "react";

export function EmailFilter({ onSetFilter }) {
  const [filter, setFilter] = useState("Search");

  useEffect(() => {
    onSetFilter(filter);
  }, [filter]);

  return (
    <div className="search-outter--box">
      <div className="search-box">
        {/* <label htmlFor="type">Search</label> */}
        <span className="img-span--container">
          <img src="../../public/glass.png" className="magnifying-glass--img" />
        </span>
        <input
          className="search-box"
          type="text"
          name="type"
          id="type"
          placeholder={filter.body || "Search mail"}
          onChange={(e) => setFilter({ body: e.target.value })}
        />
      </div>
    </div>
  );
}
