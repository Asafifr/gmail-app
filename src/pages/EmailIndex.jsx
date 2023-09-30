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

  async function onMailRead(emailId) {
    try {
      const mailToUpdate = await emailService.getById(emailId);
      const updatedMail = {
        ...mailToUpdate,
        isRead: !mailToUpdate.isRead,
      };
      await emailService.save(updatedMail);
      loadEmails();
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function onStarred(emailId) {
    try {
      const mailToUpdate = await emailService.getById(emailId);
      const updatedMail = {
        ...mailToUpdate,
        isStarred: !mailToUpdate.isStarred,
      };
      await emailService.save(updatedMail);
      loadEmails();
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function onEnterEmail(emailId) {
    try {
      const mailToUpdate = await emailService.getById(emailId);
      const updatedMail = {
        ...mailToUpdate,
        isRead: true,
      };
      await emailService.save(updatedMail);
      loadEmails();
    } catch (err) {
      console.log("Error", err);
    }
  }

  async function onDelete(emailId) {
    const updatedMailList = emails.filter((email) => email.id !== emailId);
    try {
      await emailService.remove(emailId);
      setEmails(updatedMailList);
    } catch (err) {
      console.log("Erorr", err);
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
              onMailRead={onMailRead}
              onStarred={onStarred}
              onDelete={onDelete}
              onEnterEmail={onEnterEmail}
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
