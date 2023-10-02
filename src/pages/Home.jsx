import { Link } from "react-router-dom";
import gmail from "../../public/gmail.svg";

import { emailService } from "../services/email.service";

export function Home() {
  return (
    <section className="home home-main-container">
      <img className="gmail-logo" src={gmail} alt="gmail-logo" />

      <h1 className="sign-in">Wellcom to Gmail</h1>
      <br />
      <br />
      <Link to={"/email/inbox"} className="log-in--btn">
        Log in
        <span>
          <br />
          <p className="logd-in-username">
            <strong>as </strong>
            {emailService.getLoggedinUser().email}{" "}
          </p>
        </span>
      </Link>
    </section>
  );
}
