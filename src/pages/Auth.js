import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { createAccount, loginAccount } from "../store/thunks/auth-thunk";
import classes from "./Auth.module.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(loginAccount({ email, password }));
    } else {
      if (email.trim().length < 5 || !email.includes("@")) {
        setError("Invalid Email!");
        return;
      } else if (password.trim().length < 6) {
        setError("Password needs to be at least 6 characters!");
        return;
      }
      setError("");
      dispatch(createAccount({ email, password }));
      setIsLogin(true);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Fragment>
      <Toaster />
      <div className={classes.layout}>
      <div className={classes.auth}>
        <form onSubmit={submitFormHandler}>
          <h2>CarGuys</h2>
          <label>Email:</label>
          <input type="email" onChange={emailChangeHandler} value={email} />
          <label>Password:</label>
          <input
            type="password"
            onChange={passwordChangeHandler}
            value={password}
          />
          <button>{isLogin ? "Login" : "Sign up"}</button>
          <button
            type="button"
            className={classes.auth__btn_changer}
            onClick={switchModeHandler}
          >
            {isLogin ? "Create an account" : "Login"}
          </button>
        </form>
      </div>
      <div className={classes.error}>{error}</div>
      </div>
    </Fragment>
  );
};

export default Auth;
