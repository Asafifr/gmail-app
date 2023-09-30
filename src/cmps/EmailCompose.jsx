import { Link, useNavigate } from "react-router-dom";
import { emailService } from "../services/email.service";
import { useEffect, useState } from "react";
import { useRef } from "react";

export function EmailCompose() {
  const navigate = useNavigate();
  const timoutRef = useRef();

  const [draft, setDraft] = useState(emailService.createDraftEmail());

  useEffect(() => {
    if (timoutRef.current) {
      clearTimeout(timoutRef.current);
    }
    timoutRef.current = setTimeout(() => {
      save();
      timoutRef.current = null;
      console.log("setTimeout", draft);
    }, 3000);
  }, [draft]);

  async function save() {
    const newDraft = await emailService.save(draft);
    if (!draft.id) {
      setDraft((prev) => ({ ...prev, ...newDraft }));
      console.log("newDraft", newDraft);
    }
  }

  function updateDraft(e) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  async function formSubmit(draft) {
    navigate("/email/inbox");
    const newMessage = {
      subject: draft.subject,
      body: draft.body,
      isRead: false,
      isStarred: false,
      sentAt: Date.now(),
      removedAt: null,
      to: draft.to,
      from: "user@appsus.com",
    };
    try {
      await emailService.save(newMessage);
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <form className="compose-main-container" onSubmit={(e) => formSubmit(e)}>
      <div className="new-message">
        <p className="new-message-title">New Message</p>

        <Link to={"/email/inbox"}>
          <h3 className="new-message-close-btn">X</h3>
        </Link>
      </div>
      <div className="new-message-recipients">
        <label>Recipients: </label>{" "}
        <input
          type="email"
          name="to"
          onChange={(e) => updateDraft(e)}
          value={draft.to}
        />{" "}
      </div>
      <div className="new-message-subject">
        <label>Subject: </label>{" "}
        <input
          type="text"
          name="subject"
          value={draft.subject}
          onChange={(e) => updateDraft(e)}
        ></input>
      </div>
      <div className="body-input-container">
        <input
          className="body-input"
          value={draft.body}
          type="text"
          name="body"
          onChange={(e) => updateDraft(e)}
        />
      </div>

      <button type="submit" className="new-message-send-btn">
        Send
      </button>
    </form>
  );
}
