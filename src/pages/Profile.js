import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authActions } from "../store/slices/auth-slice";
import { changePassword, deleteAccount, getUserData } from "../store/thunks/auth-thunk";
import classes from "./Profile.module.scss";

const Profile = () => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleChange, setToggleChange] = useState(false);
  const [password, setEnteredPassword] = useState("");
  const [error, setError] = useState("");

  const email = useSelector(state => state.auth.email);

  const token = localStorage.getItem("Token");
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(token));
  }, []);

  const deleteToggleHandler = () => {
    setToggleDelete((prevState) => !prevState);
  };

  const passwordToggleHandler = () => {
    setToggleChange((prevState) => !prevState);
    setError("");
  };

  const getPasswordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordChangeHandler = () => {
    if (password.trim().length < 6) {
      setError("Password needs to be at least 6 characters!");
      return;
    }
    setError("");
    dispatch(changePassword({ token, password }));
    dispatch(authActions.logout());
    localStorage.removeItem("isLogged");
    localStorage.removeItem("Token");
    history.replace("/");
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccount(token));
    dispatch(authActions.logout());
    localStorage.removeItem("isLogged");
    localStorage.removeItem("Token");
    history.replace("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h2>Profile Settings</h2>
        <div className={classes.profile__photo}></div>
        {!toggleChange && <p className={classes.profile__email}>{email}</p>}
        {!toggleDelete && (
          <button
            className={classes.profile__password}
            onClick={passwordToggleHandler}
          >
            {!toggleChange ? "Change Password" : "Go Back"}
          </button>
        )}
        {toggleChange && <label>New password:</label>}
        {toggleChange && (
          <input type="password" onChange={getPasswordHandler} />
        )}
        {toggleChange && (
          <button onClick={passwordChangeHandler} className={classes.pswbtn}>
            Change Password
          </button>
        )}
        {error && <div className={classes.error}>{error}</div>}
        {!toggleChange && (
          <button
            className={classes.profile__delete}
            onClick={deleteToggleHandler}
          >
            {toggleDelete ? "Go back" : "delete account"}
          </button>
        )}
        {toggleDelete && (
          <p className={classes.toggle}>
            Are you sure you want to delete your account?{" "}
            <button
              className={classes.toggleBtn}
              onClick={deleteAccountHandler}
            >
              Confirm
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
