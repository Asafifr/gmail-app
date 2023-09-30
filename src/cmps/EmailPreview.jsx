import { Link } from "react-router-dom";

import star from "../../public/star_baseline.png";
import fillStar from "../../public/star_fil.png";
import trash from "../../public/trash.png";

export function EmailPreview({
  email,
  onMailRead,
  onStarred,
  onDelete,
  onEnterEmail,
  folder,
}) {
  return (
    <>
      <div className={`main-email-container ${email.isRead ? "" : "unread"}`}>
        <input type="checkbox" name="1" className="mail-checkbox"></input>
        <div className={`star block--item--20 ${email.isRead ? "" : "bold"}`}>
          <span onClick={() => onStarred(email.id)}>
            {email.isStarred ? (
              <img src={fillStar} />
            ) : (
              <img className="star-img" src={star} />
            )}
          </span>
        </div>

        <div className={`email-from-container block--item--40`}>
          <p className={email.isRead ? "" : "bold"}>{email.from}</p>
        </div>

        <Link
          style={{ textDecoration: "none" }}
          to={`/email/${folder}/${email.id}`}
          className={`block--item--300 email-preview--link-container`}
          onClick={() => onEnterEmail(email.id)}
        >
          {
            <div className="from-subject-container">
              <div>
                <p
                  className={`email-subject--container ${
                    email.isRead ? "" : "bold"
                  }`}
                >
                  {email.subject}
                </p>
              </div>
              <div>
                <p className="email-body--container">{email.body}</p>
              </div>
            </div>
          }
        </Link>
        <div className="block--item--40 email-action-btns--td">
          <span onClick={() => onDelete(email.id)}>
            <img src={trash} />{" "}
          </span>
          <span onClick={() => onMailRead(email.id)}>
            {email.isRead ? " 📭" : " 📬"}
          </span>
        </div>
      </div>
    </>
  );
}
