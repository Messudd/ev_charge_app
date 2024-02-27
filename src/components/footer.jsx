import social from "../data/social";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="home-footer">
      <p
        style={{
          background: "#130a3e",
          color: "whitesmoke",
          opacity: "0.8",
          fontSize: "0.9rem",
        }}
      >
        Copyright &copy; 2024 by ev charge finder
      </p>
      <div className="social-link">
        {social.map((item, idx) => (
          <Link key={idx} to={item.link}>
            <FontAwesomeIcon icon={item.img} color="white" />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Footer;
