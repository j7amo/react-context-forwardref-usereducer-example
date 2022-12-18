import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      {/*  here we can clearly see that we do not use either 'isAuthenticated' or 'onLogout' BUT we pass them to
      Navigation component which is basically a "prop drilling" (which is arguably not the best practice especially
      when we have to drill through a large number of components) */}
      {/*<Navigation*/}
      {/*  isLoggedIn={props.isAuthenticated}*/}
      {/*  onLogout={props.onLogout}*/}
      {/*/>*/}

      <Navigation />
    </header>
  );
};

export default MainHeader;
