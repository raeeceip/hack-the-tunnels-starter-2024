import { Divider } from "../Divider";
import "./Navigation.style.scss";
import { Tab } from "./Tab";
import { Link } from "react-router-dom";


function Navigation() {
  return (
    <div className="Navigation">
      <div className="Navigation__tabs">
        <Link to={"/personal-information"}>
        <Tab label="Personal Information" highlighted={false} />
        </Link>
        <Link to={"/student-services"}>
        <Tab label="Student Services" highlighted={false} />
        </Link>
        <Link to={"/employee-services"}>
        <Tab label="Employee Services" highlighted={false} />
        </Link>
        <Link to={"/financial-services"}>
        <Tab label="Financial Services" highlighted={false} />
        </Link>
      </div>
      <Divider />
    </div>
  );
}

export default Navigation;
