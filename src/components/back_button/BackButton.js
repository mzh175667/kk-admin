import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="back-btn">
      <IconButton color="primary">
        <KeyboardBackspaceIcon />
      </IconButton>
    </Link>
  );
};

export default BackButton;
