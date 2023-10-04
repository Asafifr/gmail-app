import { Link } from "react-router-dom";

export function ComposeBtn({ className }) {
  return (
    <Link to={`/email/compose`} className={`${className} compose-btn`}>
      <span className="compose-img--span">
        <img className="compose-img" src="../../public/Pencil.png" />
      </span>
      <p className="compose-text">Compose</p>
    </Link>
  );
}
