import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const buttons = [
  { id: 1, name: "Inbox", img: "../../public/inbox.png" },
  { id: 2, name: "Starred", img: "../../public/star_baseline.png" },
  { id: 3, name: "Sent", img: "../../public/sent.png" },
  { id: 4, name: "Drafts", img: "../../public/draft.png" },
  { id: 5, name: "Trash", img: "../../public/trash.png" },
];

export function Folders({ emails }) {
  const [active, setActive] = useState(1);
  const params = useParams();

  const unreadEmailsCount = emails.filter(
    (email) =>
      email.isRead !== true && email.sentAt && email.to === "user@appsus.com"
  ).length;

  function setActiveButton(id) {
    setActive(id);
  }

  useEffect(() => {
    if (!params.folder && !params.emailId) setActive(1);
  }, [params]);

  return (
    <div>
      <Link to={`/email/compose`} className="compose-btn">
        <span className="compose-img--span">
          <img className="compose-img" src="../../public/Pencil.png" />
        </span>
        Compose
      </Link>
      {buttons.map((button) => (
        <Link
          to={`/email/${button.name.toLowerCase()}`}
          key={button.id}
          className={`side-panel-btn ${active === button.id ? "active" : ""}`}
          onClick={() => setActiveButton(button.id)}
        >
          <img src={button.img} alt={button.name} />
          <p className={active === button.id ? "active" : ""}>
            {button.name}
            <span className="emails-count">
              {button.name === "Inbox" && unreadEmailsCount > 0
                ? unreadEmailsCount
                : ""}
            </span>
          </p>
        </Link>
      ))}
    </div>
  );
}
