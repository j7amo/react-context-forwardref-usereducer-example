import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      {/*  here we can clearly see that we do not use either 'isAuthenticated' or 'onLogout' BUT we pass them to
      Navigation component which is basically a "prop drilling" (which is arguably not the best practice)*/}
      <Navigation
        isLoggedIn={props.isAuthenticated}
        onLogout={props.onLogout}
      />
    </header>
  );
};

export default MainHeader;
