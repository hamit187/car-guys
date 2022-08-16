import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "./store/slices/auth-slice";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const userIsAlreadyLoggedIn = localStorage.getItem("isLogged");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userIsAlreadyLoggedIn) {
      dispatch(authActions.autoLogin());
    }
  }, [userIsAlreadyLoggedIn]);

  return (
    <Fragment>
      {isLoggedIn && <Header />}
      <Switch>
        {!isLoggedIn && (
          <Route path="/" exact>
            <Auth />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/" exact>
            <Home />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
