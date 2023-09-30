import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";

export function EmailDetails() {
  const [email, setEmail] = useState([]);
  const params = useParams();

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (err) {
      console.log("Had issues loading email", err);
    }
  }

  return (
    <div className="mail-list--container details-container">
      <div className="details-head">
        <Link to={"."}>
          <img src="../../public/back.png" className="back-btn" />
        </Link>
        head text and icons
        <br />
      </div>
      <br />

      <h1 className="subject-h1">{email.subject}</h1>
      <br />

      <div className="from-to--container">
        <img src="../../public/profile.png" className="profile-img" />
        <div>
          <p>{email.from}</p>
          <p>to me</p>
        </div>

        <br />
      </div>

      <div className="details-body--container">
        <p>{email.body}</p>
      </div>
    </div>
  );
}
