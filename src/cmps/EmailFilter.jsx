import menuBtn from "../../public/menu-btn.png";
import user from "../../public/user.jpeg";
import { useEffect, useState } from "react";

export function EmailFilter({ onSetFilter, setModal, modal }) {
  const [filter, setFilter] = useState("Search");

  useEffect(() => {
    onSetFilter(filter);
  }, [filter]);

  function showModal() {
    setModal((prev) => !prev);
  }

  return (
    <>
      <img src={menuBtn} className="manu-btn" onClick={showModal} />
      <div className="search-outter--box">
        <div className="search-box">
          <span className="img-span--container">
            <img
              src="../../public/glass.png"
              className="magnifying-glass--img"
            />
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
        <img src={user} className="user-img" />
      </div>
    </>
  );
}
