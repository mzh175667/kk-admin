import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Rating = ({ rating }) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= parseFloat(rating).toFixed(0)) {
      stars.push(
        <li className="me-1" key={i} style={{ listStyleType: "none" }}>
          <FontAwesomeIcon icon={faStar} className="rating-color" />
        </li>
      );
    } else {
      stars.push(
        <li className="me-1" key={i} style={{ listStyleType: "none" }}>
          <FontAwesomeIcon icon={faStar} className="no-rating-color" />
        </li>
      );
    }
  }

  return <>{stars}</>;
};

export default Rating;
