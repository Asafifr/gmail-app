import { useParams } from "react-router-dom";
import "../assets/css/cmps/email-list.css";

import { EmailPreview } from "./EmailPreview";
import { emailService } from "../services/email.service";

const loggedinUser = emailService.getLoggedinUser();
export function EmailList({
  emails,
  onMailRead,
  onStarred,
  onDelete,
  onEnterEmail,
}) {
  const params = useParams();

  const inbox = emails.filter(
    (email) => email.to === loggedinUser.email && email.sentAt > 0
  );
  const starred = emails.filter(
    (email) =>
      email.isStarred === true &&
      email.to === loggedinUser.email &&
      email.sentAt > 0
  );
  const sent = emails.filter((email) => email.from === loggedinUser.email);
  const trash = emails.filter(
    (email) => email.removedAt !== null && email.from === loggedinUser.email
  );
  const drafts = emails.filter((email) => !email.sentAt);

  let emailsToRender;

  if (params.folder === "inbox") {
    emailsToRender = inbox;
  } else if (params.folder === "starred") {
    emailsToRender = starred;
  } else if (params.folder === "sent") {
    emailsToRender = sent;
  } else if (params.folder === "trash") {
    emailsToRender = trash;
  } else if (params.folder === "drafts") {
    emailsToRender = drafts;
  } else {
    emailsToRender = inbox;
  }

  return (
    <div className="email-preview-main--container">
      <div className="head-btns">
        <h3> need to add buttons</h3>
      </div>
      <ul>
        {emailsToRender.map((email) => (
          <li key={email.id}>
            <EmailPreview
              email={email}
              onMailRead={onMailRead}
              onStarred={onStarred}
              onDelete={onDelete}
              onEnterEmail={onEnterEmail}
              folder={params.folder}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
