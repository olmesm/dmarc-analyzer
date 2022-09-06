import { Icon } from "./Icon";
import { SITE_TITLE, URL_GITHUB } from "../config";
import ambulance from "../icons/ambulance.svg";

export const Header = () => (
  <div>
    <nav>
      <ul>
        <li>
          <strong>{SITE_TITLE}</strong>
        </li>
      </ul>
      <ul>
        <li>
          <a className="secondary" href={URL_GITHUB}>
            <Icon src={ambulance} alt="get help" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
);
