import { Link } from "react-router-dom";

import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={classes.notfound}>
      <h2>Error 404 :: Page not found!</h2>
      <div className={classes.sad}></div>
      <p>
        Go back <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
