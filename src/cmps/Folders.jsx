import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ComposeBtn } from "./ComposeBtn";

const buttons = [
  { id: 1, name: "Inbox", img: "../../public/inbox.png" },
  { id: 2, name: "Starred", img: "../../public/star_baseline.png" },
  { id: 3, name: "Sent", img: "../../public/sent.png" },
  { id: 4, name: "Drafts", img: "../../public/draft.png" },
  { id: 5, name: "Trash", img: "../../public/trash.png" },
];

export function Folders({ emails, setModal, modal }) {
  const [active, setActive] = useState("inbox");
  const params = useParams();

  const unreadEmailsCount = emails.filter(
    (email) =>
      email.isRead !== true && email.sentAt && email.to === "user@appsus.com"
  ).length;

  const draftsEmailsCount = emails.filter(
    (email) => email.sentAt === "" || email.sentAt === null
  ).length;

  function setActiveButton(id) {
    setActive(id);
    setModal(false);
  }

  useEffect(() => {
    if (!params.folder && !params.emailId) {
      setActive("inbox");
    } else {
      setActive(params.folder);
    }
  }, [params]);

  return (
    <div className="main-folders-menu">
      <ComposeBtn className="main-folder-compose-btn" />
      {buttons.map((button) => (
        <Link
          to={`/email/${button.name.toLowerCase()}`}
          key={button.id}
          className={`side-panel-btn ${
            active === button.name.toLowerCase() ? "active" : ""
          }`}
          onClick={() => setActiveButton(button.name.toLowerCase())}
        >
          <img src={button.img} alt={button.name} className="img-side--btn" />
          <p
            className={`inbox-btn ${
              active === button.name.toLowerCase() ? "active" : ""
            }`}
          >
            {button.name}

            {button.name === "Inbox" && unreadEmailsCount > 0 && (
              <span className="emails-count">{unreadEmailsCount}</span>
            )}
            {button.name === "Drafts" && draftsEmailsCount > 0 && (
              <span className="emails-count">{draftsEmailsCount}</span>
            )}
          </p>
        </Link>
      ))}
    </div>
  );
}
