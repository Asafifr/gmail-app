import { Link, Route, HashRouter as Router, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { EmailIndex } from "./pages/EmailIndex";
import { EmailDetails } from "./cmps/EmailDetails";
import { EmailCompose } from "./cmps/EmailCompose";

export function App() {
  return (
    <Router>
      <section className="app--container">
        <header className="header">
          {/* <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/email/inbox">Email</Link>
          </nav> */}
        </header>
        <main className="item2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email" element={<EmailIndex />}>
              <Route
                ///email/drafts/edit/e112
                path="/email/:folder/:emailId"
                element={<EmailCompose />}
              />
              <Route path="/email/:folder" element={<EmailDetails />}>
                <Route
                  path="/email/:folder/details/:emailId"
                  element={<EmailDetails />}
                />
              </Route>
            </Route>
          </Routes>
        </main>
        {/* <footer className="item3">
          <section>robotRights 2023 &copy;</section>
        </footer> */}
      </section>
    </Router>
  );
}
