import { useEffect, useState } from "react";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailList } from "../cmps/EmailList";
import { emailService } from "../services/email.service";
import { Folders } from "../cmps/Folders";
import { Outlet, useParams } from "react-router-dom";
import { EmailCompose } from "../cmps/EmailCompose";

export function EmailIndex() {
  const [emails, setEmails] = useState([]);
  const [filterdBy, setFilterBy] = useState(emailService.getDefaultFilter());
  const params = useParams();

  useEffect(() => {
    loadEmails();
  }, [filterdBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prev) => ({ ...prev, ...fieldsToUpdate }));
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterdBy);
      setEmails(emails);
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }

  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === updatedEmail.id ? updatedEmail : email
        )
      );
    } catch (err) {
      console.log("Error updating email on server", err);
    }
  }

  async function onDelete(emailToDelete) {
    const updatedMailList = emails.filter(
      (email) => email.id !== emailToDelete.id
    );
    if (emailToDelete.removedAt === null) {
      const updatedEmail = {
        ...emailToDelete,
        removedAt: Date.now(),
      };
      onUpdateEmail(updatedEmail);
    } else {
      try {
        await emailService.remove(emailToDelete.id);
        setEmails(updatedMailList);
      } catch (err) {
        console.log("Erorr", err);
      }
    }
  }

  return (
    <div className="email-index--container">
      <section className="section-logo">
        <Logo />
      </section>
      <aside className="aside">
        <Folders emails={emails} />
      </aside>
      <section className="filter--container">
        <EmailFilter onSetFilter={onSetFilter} />
      </section>
      {!params.emailId && (
        <>
          <section className="mail-list--container">
            <EmailList
              emails={emails}
              onDelete={onDelete}
              onUpdateEmail={onUpdateEmail}
            />
          </section>
          {params.folder === "compose" && <EmailCompose />}
        </>
      )}
      {params.emailId && (
        <section className="mail-list--container">
          {console.log(params)}
          <Outlet />
        </section>
      )}
    </div>
  );
}

function Logo() {
  return (
    <div className="menu-logo-main--container">
      <div className="menu-container">
        <img className="menu" src="../../public/menu.png" />
      </div>
      <div className="logo-container">
        <img className="logo" src="../../public/logo2.png" />
      </div>
    </div>
  );
}
