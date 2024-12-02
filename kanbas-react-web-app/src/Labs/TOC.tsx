import { useLocation } from "react-router";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a1"
          href="#/Labs/Lab1"
          className={`nav-link ${pathname.includes("Lab1") ? "active" : ""}`}
        >
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a2"
          href="#/Labs/Lab2"
          className={`nav-link ${pathname.includes("Lab2") ? "active" : ""}`}
        >
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a3"
          href="#/Labs/Lab3"
          className={`nav-link ${pathname.includes("Lab3") ? "active" : ""}`}
        >
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a4"
          href="#/Labs/Lab4"
          className={`nav-link ${pathname.includes("Lab4") ? "active" : ""}`}
        >
          Lab 4
        </a>
      </li>
      <li className="nav-item">
        <a
          id="wd-a5"
          href="#/Labs/Lab5"
          className={`nav-link ${pathname.includes("Lab5") ? "active" : ""}`}
        >
          Lab 5
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className="nav-link">
          Kanbas
        </a>
      </li>
      <li className="wd-github">
        <a
          id="wd-k"
          href="https://github.com/wongalexx/kanbas-react-web-app/tree/a4"
          className="nav-link"
        >
          React Webpage Code
        </a>
      </li>
      <li className="wd-github">
        <a
          id="wd-k"
          href="https://github.com/wongalexx/kanbas-node-server-app"
          className="nav-link"
        >
          Node Server Code
        </a>
      </li>
      <li className="wd-github">
        <a
          id="wd-k"
          href="https://kanbas-node-server-app-awong-cf59197c356d.herokuapp.com/"
          className="nav-link"
        >
          Deployed Heroku Server
        </a>
      </li>
    </ul>
  );
}
