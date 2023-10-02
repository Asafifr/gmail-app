import { Link } from "react-router-dom";

import star from "../../public/star_baseline.png";
import fillStar from "../../public/star_fil.png";
import trash from "../../public/trash.png";
import mailRead from "../../public/mail-read.svg";
import mailUnread from "../../public/mail-unread.svg";
import snooze from "../../public/snooze.png";

const date = new Date();
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function EmailPreview({ email, onDelete, folder, onUpdateEmail }) {
  function onStarred() {
    const updatedEmail = {
      ...email,
      isStarred: !email.isStarred,
    };
    onUpdateEmail(updatedEmail);
  }

  function onEmailEnter() {
    const updatedEmail = {
      ...email,
      isRead: true,
    };

    onUpdateEmail(updatedEmail);
  }

  function onMailReadToggle() {
    const updatedEmail = {
      ...email,
      isRead: !email.isRead,
    };

    onUpdateEmail(updatedEmail);
  }

  return (
    <>
      <div className={`main-email-container ${email.isRead ? "" : "unread"} `}>
        <input type="checkbox" name="1" className="mail-checkbox"></input>
        <span class="checkmark"></span>
        <div className={`star block--item--20 ${email.isRead ? "" : "bold"}`}>
          <span onClick={onStarred}>
            {email.isStarred ? (
              <img src={fillStar} />
            ) : (
              <img className="star-img" src={star} />
            )}
          </span>
        </div>

        <div
          className={`email-from-container block--item--40 ${
            email.sentAt ? "" : "draft"
          }`}
        >
          <p className={email.isRead || !email.sentAt ? "" : "bold"}>
            {email.sentAt ? email.from : "Draft"}
          </p>
        </div>

        <Link
          style={{ textDecoration: "none" }}
          to={`/email/${folder}/${email.id}`}
          className={`block--item--300 email-preview--link-container`}
          onClick={onEmailEnter}
        >
          {
            <div className="from-subject-container">
              <div>
                <p
                  className={`email-subject--container ${
                    email.isRead || !email.sentAt ? "" : "bold"
                  }`}
                >
                  {email.subject || "(no subject) - "}
                </p>
              </div>
              <div>
                <p className="email-body--container">{email.body}</p>
              </div>
            </div>
          }
        </Link>

        <div className="email-prev-action--btns">
          <span onClick={() => onDelete(email)}>
            <img src={trash} />{" "}
          </span>
          <span onClick={onMailReadToggle}>
            <img
              className="mail-icons"
              src={email.isRead ? mailRead : mailUnread}
            />
          </span>
          <span>
            <img className="mail-icons" src={snooze} />
          </span>
        </div>
        <div className="email-prev--date">
          <p>{month[date.getMonth(email.sentAt)]}</p>
          <p>{date.getDate(email.sentAt)}</p>
        </div>
      </div>
    </>
  );
}
